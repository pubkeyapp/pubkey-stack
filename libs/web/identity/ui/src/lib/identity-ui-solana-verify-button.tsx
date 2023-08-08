import { Button, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { ellipsify, Identity } from '@pubkey-stack/sdk'
import { SolanaClusterProvider } from '@pubkey-stack/web/solana/data-access'
import { IconAlertCircle } from '@tabler/icons-react'
import { IdentityUiSolanaLinkProvider } from './identity-ui-solana-link-provider'
import { IdentityUiSolanaVerifyWizard } from './identity-ui-solana-verify-wizard'

export function IdentityUiSolanaVerifyButton({ identity, refresh }: { identity: Identity; refresh: () => void }) {
  return (
    <Tooltip label={`Verify ${ellipsify(identity.providerId)} by signing a message with your wallet.`}>
      <Button
        size="xs"
        variant="light"
        color="yellow"
        leftIcon={<IconAlertCircle size={14} />}
        onClick={() => {
          modals.open({
            title: 'Verify Identity',
            children: (
              <SolanaClusterProvider autoConnect={true}>
                <IdentityUiSolanaLinkProvider identities={[]} refresh={refresh}>
                  <IdentityUiSolanaVerifyWizard identity={identity} refresh={refresh} />
                </IdentityUiSolanaLinkProvider>
              </SolanaClusterProvider>
            ),
          })
        }}
      >
        Verify Identity
      </Button>
    </Tooltip>
  )
}
