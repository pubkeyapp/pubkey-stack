import { Button, ButtonProps } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Identity } from '@pubkey-stack/sdk'
import { IdentityProviderSolana } from '@pubkey-stack/web/identity/data-access'
import { SolanaClusterProvider } from '@pubkey-stack/web/solana/data-access'
import { WebUiIdentitySolanaLinkWizard } from './web-ui-identity-solana-link-wizard'

export function WebUiIdentitySolanaLinkButton({
  items = [],
  label,
  refresh,
  ...props
}: ButtonProps & {
  items?: Identity[]
  refresh: () => void
  label?: string
}) {
  return (
    <Button
      variant="light"
      {...props}
      onClick={() => {
        modals.open({
          title: 'Link Wallet',
          zIndex: 1,
          children: (
            <SolanaClusterProvider autoConnect={false}>
              <IdentityProviderSolana refresh={refresh}>
                <WebUiIdentitySolanaLinkWizard identities={items ?? []} />
              </IdentityProviderSolana>
            </SolanaClusterProvider>
          ),
        })
      }}
    >
      {label ?? 'Link Wallet'}
    </Button>
  )
}
