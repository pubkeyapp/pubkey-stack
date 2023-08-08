import { Button, ButtonProps } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Identity } from '@pubkey-stack/sdk'
import { SolanaClusterProvider } from '@pubkey-stack/web/solana/data-access'
import { IdentityUiSolanaLinkWizard } from './identity-ui-solana-link-wizard'
import { IdentityUiSolanaLinkProvider } from './identity-ui-solana-link-provider'

export interface IdentityUiSolanaLinkButtonProps extends ButtonProps {
  items?: Identity[]
  refresh: () => void
  label?: string
}

export function IdentityUiSolanaLinkButton({ items, label, refresh, ...props }: IdentityUiSolanaLinkButtonProps) {
  return (
    <Button
      variant="light"
      {...props}
      onClick={() => {
        modals.open({
          title: 'Link Wallet',
          children: (
            <SolanaClusterProvider autoConnect={false}>
              <IdentityUiSolanaLinkProvider identities={items ?? []} refresh={refresh}>
                <IdentityUiSolanaLinkWizard />
              </IdentityUiSolanaLinkProvider>
            </SolanaClusterProvider>
          ),
        })
      }}
    >
      {label ?? 'Link Wallet'}
    </Button>
  )
}
