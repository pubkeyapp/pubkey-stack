import { Button, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { ellipsify, Identity } from '@pubkey-stack/sdk'
import { IdentityProviderSolana } from '@pubkey-stack/web/identity/data-access'
import { SolanaClusterProvider } from '@pubkey-stack/web/solana/data-access'
import { IconAlertCircle } from '@tabler/icons-react'
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
            zIndex: 1,
            children: (
              <SolanaClusterProvider autoConnect={true}>
                <IdentityProviderSolana refresh={refresh}>
                  <IdentityUiSolanaVerifyWizard identity={identity} refresh={refresh} />
                </IdentityProviderSolana>
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
