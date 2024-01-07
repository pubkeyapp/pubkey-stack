import { Button, ButtonProps } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Identity, IdentityProvider } from '@pubkey-stack/sdk'
import { IdentityProviderSolana } from '@pubkey-stack/web-identity-data-access'
import { SolanaClusterProvider } from '@pubkey-stack/web-solana-data-access'
import { WebUiIdentitySolanaLinkWizard } from './web-ui-identity-solana-link-wizard'
import { WebUiIdentityIcon } from './web-ui-identity-icon'

const solanaPurple = '#9945FF'
const solanaGreen = '#14F195'
export function WebUiIdentitySolanaLinkButton({
  identities = [],
  label,
  refresh,
  ...props
}: ButtonProps & {
  identities?: Identity[]
  refresh: () => void
  label?: string
}) {
  return (
    <Button
      size="xl"
      variant="gradient"
      gradient={{ from: solanaPurple, to: solanaGreen, deg: 90 }}
      leftSection={<WebUiIdentityIcon provider={IdentityProvider.Solana} />}
      {...props}
      onClick={() => {
        modals.open({
          size: 'xl',
          title: 'Link Solana Wallet',
          zIndex: 1,
          children: (
            <SolanaClusterProvider autoConnect={false}>
              <IdentityProviderSolana refresh={refresh}>
                <WebUiIdentitySolanaLinkWizard
                  identities={identities ?? []}
                  refresh={() => {
                    refresh()
                    modals.closeAll()
                  }}
                />
              </IdentityProviderSolana>
            </SolanaClusterProvider>
          ),
        })
      }}
    >
      {label ?? 'Link Solana Wallet'}
    </Button>
  )
}
