import { WalletButton } from '@pubkey-stack/web-solana-data-access'
import { useWallet } from '@solana/wallet-adapter-react'
import { Navigate } from 'react-router-dom'

export default function AccountListFeature() {
  const { publicKey } = useWallet()

  if (publicKey) {
    return <Navigate to={publicKey.toString()} replace />
  }

  return <WalletButton />
}
