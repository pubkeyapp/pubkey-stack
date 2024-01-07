import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { IdentityProvider, Prisma, User, UserRole, UserStatus } from '@prisma/client'
import {
  ApiCoreService,
  AppContext,
  hashPassword,
  slugifyId,
  validatePassword,
} from '@pubkey-stack/api-core-data-access'
import { Request } from 'express-serve-static-core'
import { LoginInput } from './dto/login.input'
import { RegisterInput } from './dto/register.input'

export interface AuthRequest extends Request {
  user?: User
}

@Injectable()
export class ApiAuthService {
  private readonly logger = new Logger(ApiAuthService.name)
  constructor(readonly core: ApiCoreService, private readonly jwt: JwtService) {}

  async login(context: AppContext, input: LoginInput) {
    if (!this.core.config.authPasswordEnabled) {
      throw new Error(`Login with username and password is not allowed.`)
    }
    if (input?.password.length < 8) {
      throw new Error('Password is too short.')
    }
    const user = await this.validateUser(input)
    this.signAndSetCookie(context, { username: user.username, id: user.id })

    return user
  }

  logout(context: AppContext) {
    this.resetCookie(context)
    return Promise.resolve(true)
  }

  async register(context: AppContext, input: RegisterInput) {
    if (!this.core.config.authRegisterEnabled) {
      throw new Error(`Registration is disabled.`)
    }
    if (input?.password.length < 8) {
      throw new Error('Password is too short.')
    }
    const username = slugifyId(input.username)
    const exists = await this.core.data.user.findUnique({ where: { username } })
    if (exists) {
      throw new Error('User already exists.')
    }
    const user = await this.core.data.user.create({
      data: {
        username,
        password: hashPassword(input.password),
        status: UserStatus.Created,
      },
    })

    this.signAndSetCookie(context, { username: user.username, id: user.id })

    return user
  }

  async findUsername(username: string): Promise<string> {
    username = slugifyId(username)
    const exists = await this.core.data.user.findUnique({ where: { username } })
    if (!exists) {
      return username
    }
    const newUsername = `${username}-${Math.floor(Math.random() * 1000)}`
    return this.findUsername(newUsername)
  }

  async validateRequest({
    req,
    providerId,
    provider,
    profile,
    accessToken,
    refreshToken,
  }: {
    providerId: string
    provider: IdentityProvider
    accessToken: string
    refreshToken: string
    profile: Prisma.InputJsonValue
    req: AuthRequest
  }) {
    const found = await this.findUserByIdentity({
      provider,
      providerId,
    })

    if (found && req.user?.id && found.ownerId !== req.user?.id) {
      throw new Error(`This ${provider} account is already linked to another user.`)
    }

    if (found) {
      await this.core.data.identity.update({
        where: { id: found.id },
        data: { accessToken, refreshToken, verified: true, profile },
      })
      return found.owner
    }

    const identity: Prisma.IdentityCreateWithoutOwnerInput = {
      provider,
      providerId,
      accessToken,
      refreshToken,
      verified: true,
      profile,
    }

    if (req.user?.id) {
      return await this.updateUserWithIdentity(req.user.id, identity)
    }

    return await this.createUserWithIdentity(identity)
  }

  async createUserWithIdentity(identity: Prisma.IdentityCreateWithoutOwnerInput) {
    const username = await this.findUsername((identity.profile as { username: string }).username ?? identity.providerId)
    const admin = this.core.config.isAdminId(identity.provider, identity.providerId)
    this.logger.verbose(
      `Creating user ${username} with identity ${identity.providerId} (${identity.provider}) (admin: ${admin})`,
    )

    const user = await this.core.data.user.create({
      data: {
        avatarUrl: (identity.profile as { avatarUrl?: string })?.avatarUrl,
        developer: admin,
        role: admin ? UserRole.Admin : UserRole.User,
        status: UserStatus.Active,
        username,
        name: (identity.profile as { name?: string })?.name,
        identities: {
          create: {
            ...identity,
          },
        },
      },
    })
    this.logger.verbose(
      `Created user ${username} (${user.id}) with identity ${identity.providerId} (${identity.provider})`,
    )

    return user
  }

  async updateUserWithIdentity(userId: string, identity: Prisma.IdentityCreateWithoutOwnerInput) {
    const updated = await this.core.data.user.update({
      where: { id: userId },
      data: { identities: { create: { ...identity } } },
    })
    this.logger.verbose(
      `Updated user ${updated.username} (${updated.id}), added identity ${identity.providerId} (${identity.provider})`,
    )

    return updated
  }

  private async validateUser({ username, password }: LoginInput) {
    const user = await this.core.data.user.findUnique({ where: { username } })
    if (!user) {
      throw new Error('User not found.')
    }
    if (!user.password) {
      throw new Error('Password login not allowed.')
    }
    if (user.status === UserStatus.Inactive) {
      throw new Error('User is inactive.')
    }
    if (!validatePassword(password, user.password)) {
      throw new Error('Password is incorrect.')
    }
    user.password = null
    return user
  }

  signAndSetCookie(context: AppContext, { id, username }: { username: string; id: string }) {
    const token = this.sign({ id, username })
    this.setCookie(context, token)
    return token
  }

  private resetCookie(context: AppContext) {
    return context.res.clearCookie(this.core.config.cookieName, this.core.config.cookieOptions(context.req.hostname))
  }

  private setCookie(context: AppContext, token: string) {
    return context.res?.cookie(this.core.config.cookieName, token, this.core.config.cookieOptions(context.req.hostname))
  }

  async setUserCookie(context: AppContext) {
    if (!context.req.user) {
      throw new Error('No user found.')
    }
    const { username, id } = context.req.user as User
    const token = this.signAndSetCookie(context, { username, id })
    return context.res?.cookie(this.core.config.cookieName, token, this.core.config.cookieOptions(context.req.hostname))
  }

  private sign(payload: { id: string; username: string }): string {
    return this.jwt.sign(payload)
  }

  async findUserByIdentity({ provider, providerId }: { provider: IdentityProvider; providerId: string }) {
    return this.core.data.identity.findUnique({
      where: { provider_providerId: { provider, providerId } },
      include: { owner: true },
    })
  }
}
