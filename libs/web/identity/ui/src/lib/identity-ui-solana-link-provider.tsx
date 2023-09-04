import { Identity, IdentityProvider } from '@pubkey-stack/sdk'
import { useWebSdk } from '@pubkey-stack/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-stack/web/ui/notifications'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import * as bs58 from 'bs58'
import { createContext, ReactNode, useContext } from 'react'

export interface LinkSolanaProviderContext {
  connected: boolean
  publicKey: PublicKey | null
  refresh: () => void
  identities: Identity[]
  linkAndSign: (providerId: string) => Promise<void>
  verifyAndSign: (providerId: string) => Promise<void>
}

const LinkSolanaContext = createContext<LinkSolanaProviderContext>({} as LinkSolanaProviderContext)

export function IdentityUiSolanaLinkProvider({
  children,
  identities,
  refresh,
}: {
  children: ReactNode
  identities: Identity[]
  refresh: () => void
}) {
  const sdk = useWebSdk()
  const { connected, publicKey, signMessage } = useWallet()
  async function linkIdentity(providerId: string) {
    return sdk
      .userLinkIdentity({ input: { provider: IdentityProvider.Solana, providerId } })
      .then((res) => {
        showNotificationSuccess('Identity linked')
        refresh()
      })
      .catch((err) => {
        console.log('error linking identity', err)
        showNotificationError('Error linking identity')
      })
  }

  async function requestChallenge(providerId: string) {
    return sdk
      .userRequestIdentityChallenge({ input: { provider: IdentityProvider.Solana, providerId } })
      .then((res) => {
        if (!res.data.challenge) {
          showNotificationError('Error linking identity')
          return
        }
        return res.data.challenge
      })
      .catch((err) => {
        console.log('error linking identity', err)
        showNotificationError('Error linking identity')
      })
  }

  async function signChallenge(providerId: string, challenge: string) {
    if (!challenge || signMessage === undefined) {
      return
    }

    const challengeBuffer = Buffer.from(challenge, 'utf-8')
    const challengeBufferArray = Uint8Array.from(challengeBuffer)
    const signature = await signMessage(challengeBufferArray)

    return sdk
      .userVerifyIdentityChallenge({
        input: {
          provider: IdentityProvider.Solana,
          providerId,
          challenge: challenge,
          signature: bs58.encode(signature),
        },
      })
      .then((res) => {
        showNotificationSuccess('Identity verified')
        refresh()
      })
      .catch((err) => {
        console.log('error verifying identity', err)
        showNotificationError('Error verifying identity')
      })
  }

  async function verifyAndSign(providerId: string) {
    // Request challenge
    const request = await requestChallenge(providerId)
    if (!request) {
      return
    }
    // Sign challenge
    await signChallenge(providerId, request.challenge)
    // Profit 🤑
  }

  async function linkAndSign(providerId: string) {
    // Link identity
    await linkIdentity(providerId)
    // Verify and sign
    await verifyAndSign(providerId)
  }

  const value: LinkSolanaProviderContext = {
    connected,
    publicKey,
    identities: identities ?? [],
    refresh,
    linkAndSign,
    verifyAndSign,
  }
  return <LinkSolanaContext.Provider value={value}>{children}</LinkSolanaContext.Provider>
}

export function useLinkSolana() {
  return useContext(LinkSolanaContext)
}
