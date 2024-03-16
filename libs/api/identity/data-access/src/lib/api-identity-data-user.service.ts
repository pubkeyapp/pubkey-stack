import { Injectable, Logger } from '@nestjs/common'
import { Identity as PrismaIdentity } from '@prisma/client'
import { ApiCoreService, BaseContext, getRequestDetails } from '@pubkey-stack/api-core-data-access'
import { verifySignature } from '@pubkeyapp/solana-verify-wallet'
import { ApiIdentitySolanaService } from './api-identity-solana.service'
import { IdentityRequestChallengeInput } from './dto/identity-request-challenge-input'
import { IdentityUserFindManyInput } from './dto/identity-user-find-many.input'
import { IdentityUserLinkInput } from './dto/identity-user-link-input'
import { IdentityVerifyChallengeInput } from './dto/identity-verify-challenge-input'
import { sha256 } from './helpers/sha256'

@Injectable()
export class ApiIdentityDataUserService {
  private readonly logger = new Logger(ApiIdentityDataUserService.name)
  constructor(private readonly core: ApiCoreService, private readonly solana: ApiIdentitySolanaService) {}

  async deleteIdentity(userId: string, identityId: string): Promise<boolean> {
    const found = await this.core.data.identity.findFirst({
      where: { id: identityId, ownerId: userId },
      include: { owner: { include: { identities: true } } },
    })
    if (!found) {
      throw new Error(`Identity ${identityId} not found`)
    }
    if (found.owner.identities.length === 1 && !found.owner.password) {
      throw new Error(`Cannot delete last identity`)
    }
    const deleted = await this.core.data.identity.delete({ where: { id: identityId } })
    if (!deleted) {
      throw new Error(`Identity ${identityId} not deleted`)
    }
    return true
  }

  async findManyIdentity(input: IdentityUserFindManyInput): Promise<PrismaIdentity[]> {
    const items = await this.core.data.identity.findMany({
      where: { owner: { username: input.username } },
      orderBy: [{ provider: 'asc' }, { providerId: 'asc' }],
    })

    return items ?? []
  }

  async requestIdentityChallenge(
    ctx: BaseContext,
    userId: string,
    { provider, providerId }: IdentityRequestChallengeInput,
  ) {
    // Make sure we can link the given provider
    this.solana.ensureLinkProvider(provider)
    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)
    // Make sure the identity is owned by the user
    await this.solana.ensureIdentityOwner(userId, provider, providerId)

    // Get the IP and user agent from the request
    const { ip, userAgent } = getRequestDetails(ctx)

    // Generate a random challenge
    const challenge = sha256(`${Math.random()}-${ip}-${userAgent}-${userId}-${provider}-${providerId}-${Math.random()}`)

    // Store the challenge
    return this.core.data.identityChallenge.create({
      data: {
        identity: { connect: { provider_providerId: { provider, providerId } } },
        ip,
        userAgent,
        challenge: `Approve this message to verify your wallet. #REF-${challenge}`,
      },
    })
  }

  async verifyIdentityChallenge(
    ctx: BaseContext,
    userId: string,
    { provider, providerId, challenge, signature, useLedger }: IdentityVerifyChallengeInput,
  ) {
    // Make sure we can link the given provider
    this.solana.ensureLinkProvider(provider)
    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)
    // Make sure the identity is owned by the user
    await this.solana.ensureIdentityOwner(userId, provider, providerId)

    // Make sure we find the challenge
    const found = await this.solana.ensureIdentityChallenge(provider, providerId, challenge)

    const { ip, userAgent } = getRequestDetails(ctx)

    if (found.ip !== ip || found.userAgent !== userAgent) {
      throw new Error(`Identity challenge not found.`)
    }

    const verified = verifySignature({
      challenge: found.challenge,
      publicKey: found.identity.providerId,
      signature,
      useLedger,
    })

    if (!verified) {
      throw new Error(`Identity challenge verification failed.`)
    }

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
    })
    return updated
  }

  async linkIdentity(userId: string, { provider, providerId }: IdentityUserLinkInput) {
    // Make sure we can link the given provider
    this.solana.ensureLinkProvider(provider)
    // Make sure the identity does not exist
    const found = await this.core.data.identity.findFirst({
      where: {
        provider,
        providerId,
      },
    })
    if (found) {
      throw new Error(`Identity ${provider} ${providerId} already linked`)
    }

    // Create the identity
    const created = await this.core.data.identity.create({
      data: {
        provider,
        providerId,
        ownerId: userId,
      },
    })
    return created
  }
}
