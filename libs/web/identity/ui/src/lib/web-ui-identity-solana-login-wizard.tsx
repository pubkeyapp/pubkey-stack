import { useIdentitySolanaLogin } from '@pubkey-stack/web-identity-data-access'
import { toastError } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { WebUiIdentitySolanaWizard, WebUiIdentitySolanaWizardProps } from './web-ui-identity-solana-wizard'

export function WebUiIdentitySolanaLoginWizard({
  refresh,
  ...props
}: Omit<WebUiIdentitySolanaWizardProps, 'sign'> & { refresh: () => void }) {
  const { connected, publicKey } = useWallet()
  const { verifyAndSign } = useIdentitySolanaLogin()
  const [active, setActive] = useState(0)

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

  return <WebUiIdentitySolanaWizard sign={request} {...props} />
}
