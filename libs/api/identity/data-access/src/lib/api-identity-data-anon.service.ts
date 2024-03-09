import { Injectable, Logger } from '@nestjs/common'
import { IdentityProvider, UserRole, UserStatus } from '@prisma/client'
import { ApiAuthService } from '@pubkey-stack/api-auth-data-access'
import {
  ApiCoreService,
  BaseContext,
  ellipsify,
  getRequestDetails,
  slugifyId,
} from '@pubkey-stack/api-core-data-access'
import { ApiIdentitySolanaService } from './api-identity-solana.service'
import { RequestIdentityChallengeInput } from './dto/request-identity-challenge.input'
import { VerifyIdentityChallengeInput } from './dto/verify-identity-challenge-input'
import { sha256 } from './helpers/sha256'

@Injectable()
export class ApiIdentityDataAnonService {
  private readonly logger = new Logger(ApiIdentityDataAnonService.name)
  constructor(
    private readonly auth: ApiAuthService,
    private readonly core: ApiCoreService,
    private readonly solana: ApiIdentitySolanaService,
  ) {}

  async requestIdentityChallenge(ctx: BaseContext, { provider, providerId }: RequestIdentityChallengeInput) {
    // Make sure we can link the given provider
    this.solana.ensureLinkProvider(provider)
    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)

    // Check if we already have an identity for this provider
    const found = await this.solana.findIdentity(provider, providerId)

    // Get the IP and user agent from the request
    const { ip, userAgent } = getRequestDetails(ctx)

    // Generate a random challenge
    const challenge = sha256(`${Math.random()}-${ip}-${userAgent}-${provider}-${providerId}-${Math.random()}`)
    const admin = this.core.config.isAdminId(IdentityProvider.Solana, providerId)
    // Store the challenge
    return this.core.data.identityChallenge.create({
      data: {
        identity: {
          connectOrCreate: {
            where: { provider_providerId: { provider, providerId } },
            create: {
              provider,
              providerId,
              verified: false,
              owner: {
                create: {
                  username: slugifyId(`${ellipsify(providerId)}-${provider}`),
                  role: admin ? UserRole.Admin : UserRole.User,
                  status: UserStatus.Active,
                  developer: admin,
                },
              },
            },
          },
        },
        ip,
        userAgent,
        challenge: `Approve this message ${
          found ? `sign in as ${found.owner.username}` : 'sign up for a new account'
        }. #REF-${challenge}`,
      },
    })
  }

  async verifyIdentityChallenge(
    ctx: BaseContext,
    { provider, providerId, challenge, signature, useLedger }: VerifyIdentityChallengeInput,
  ) {
    // Make sure we can link the given provider
    this.solana.ensureLinkProvider(provider)
    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)

    // Ensure the signature is valid
    const { found, verified } = await this.solana.ensureValidSignature(
      ctx,
      provider,
      providerId,
      challenge,
      signature,
      useLedger,
    )

    if (!found.identity.verified) {
      // Update the identity
      await this.core.data.identity.update({
        where: { id: found.identity.id },
        data: { verified: true },
      })
      this.logger.log(`Identity ${found.identity.id} verified`)
    }

    // Update the identity
    const updated = await this.core.data.identityChallenge.update({
      where: {
        id: found.id,
      },
      data: {
        verified,
        signature,
      },
      include: { identity: { include: { owner: true } } },
    })

    if (updated.identity.owner.status !== UserStatus.Active) {
      await this.core.data.user.update({
        where: { id: updated.identity.owner.id },
        data: { status: UserStatus.Active },
      })
      this.logger.log(`User ${updated.identity.owner.id} activated`)
    }

    if (updated.verified) {
      this.logger.verbose(
        `Identity challenge ${updated.id} verified, signing in user ${updated.identity.owner.username} (${updated.identity.owner.id})`,
      )
      this.auth.signAndSetCookie(ctx, { username: updated.identity.owner.username, id: updated.identity.owner.id })
    }
    return updated
  }
}
