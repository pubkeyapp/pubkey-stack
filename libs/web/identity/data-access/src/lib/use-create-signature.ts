import { useSolana } from '@pubkey-stack/web-solana-data-access'
import { CreateSignature, createSignature } from '@pubkeyapp/solana-verify-wallet'
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react'

export function useCreateSignature() {
  const wallet = useAnchorWallet()
  const { connection } = useSolana()
  const { signMessage } = useWallet()

  return async function ({
    challenge,
    publicKey,
    useLedger,
  }: Omit<CreateSignature, 'connection' | 'signMessage' | 'wallet'>) {
    return createSignature({
      challenge,
      connection,
      publicKey,
      signMessage,
      signTransaction: wallet?.signTransaction,
      useLedger,
    })
  }
}
