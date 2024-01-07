import { Identity } from '@pubkey-stack/sdk'
import { useIdentitySolana } from '@pubkey-stack/web-identity-data-access'
import { toastError } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { WebUiIdentitySolanaWizard, WebUiIdentitySolanaWizardProps } from './web-ui-identity-solana-wizard'

export function WebUiIdentitySolanaLinkWizard({
  refresh,
  identities,
  ...props
}: Omit<WebUiIdentitySolanaWizardProps, 'sign'> & { refresh: () => void; identities: Identity[] }) {
  const { connected, publicKey } = useWallet()
  const { linkAndSign } = useIdentitySolana()
  const [active, setActive] = useState(0)
  const exists = identities?.some((item) => item.providerId === publicKey?.toBase58())

  useEffect(() => {
    if (connected && active === 0) {
      setActive(1)
    }
  }, [active, connected])

  async function request(useLedger: boolean) {
    return linkAndSign({ publicKey: publicKey!.toString(), useLedger })
      .catch((err) => {
        console.log('Error linking identity', err)
        toastError('Error linking identity')
        return false
      })
      .finally(() => {
        refresh()
      })
  }

  return <WebUiIdentitySolanaWizard exists={exists} sign={request} {...props} />
}
