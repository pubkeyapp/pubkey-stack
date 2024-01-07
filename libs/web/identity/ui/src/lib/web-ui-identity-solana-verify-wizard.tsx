import { Identity, IdentityProvider } from '@pubkey-stack/sdk'
import { useIdentitySolana } from '@pubkey-stack/web-identity-data-access'
import { toastError } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useMemo, useState } from 'react'
import { WebUiIdentitySolanaWizard, WebUiIdentitySolanaWizardProps } from './web-ui-identity-solana-wizard'

export function WebUiIdentitySolanaVerifyWizard({
  refresh,
  identity,
  ...props
}: Omit<WebUiIdentitySolanaWizardProps, 'sign'> & { refresh: () => void; identity: Identity }) {
  const { connected, publicKey } = useWallet()
  const { verifyAndSign } = useIdentitySolana()
  const [active, setActive] = useState(0)

  const canVerify = useMemo(
    () => identity.provider === IdentityProvider.Solana && connected && publicKey?.toBase58() === identity.providerId,
    [identity, connected, publicKey],
  )

  useEffect(() => {
    if (connected && active === 0) {
      setActive(1)
    }
  }, [active, connected])
  async function request(useLedger: boolean) {
    return verifyAndSign({ publicKey: publicKey!.toString(), useLedger })
      .catch((err) => {
        console.log('Error verifying identity', err)
        toastError('Error verifying identity')
        return false
      })
      .finally(() => {
        refresh()
      })
  }

  return canVerify ? <WebUiIdentitySolanaWizard sign={request} {...props} /> : null
}
