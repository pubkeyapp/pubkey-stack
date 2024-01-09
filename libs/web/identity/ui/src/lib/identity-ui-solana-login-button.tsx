import { Button, type ButtonProps, Modal, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IdentityProvider } from '@pubkey-stack/sdk'
import { IdentityProviderSolanaLogin } from '@pubkey-stack/web-identity-data-access'
import { SolanaClusterProvider } from '@pubkey-stack/web-solana-data-access'
import { IconCurrencySolana } from '@tabler/icons-react'
import { getIdentityProviderColor } from './get-identity-provider-color'
import { IdentityUiSolanaLoginWizard } from './identity-ui-solana-login-wizard'

export function IdentityUiSolanaLoginButton({ refresh, ...props }: ButtonProps & { refresh: () => void }) {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <Modal opened={opened} onClose={close} size="xl" zIndex={1} title="Sign in with Solana">
        <SolanaClusterProvider autoConnect={true}>
          <IdentityProviderSolanaLogin refresh={refresh}>
            <IdentityUiSolanaLoginWizard
              py="xl"
              px="md"
              refresh={() => {
                refresh()
                close()
              }}
            />
          </IdentityProviderSolanaLogin>
        </SolanaClusterProvider>
      </Modal>

      <Tooltip label={`Login by signing a message with your wallet.`}>
        <Button
          bg={getIdentityProviderColor(IdentityProvider.Solana)}
          size="xl"
          leftSection={<IconCurrencySolana size={28} />}
          onClick={open}
          {...props}
        >
          Sign in with Solana
        </Button>
      </Tooltip>
    </>
  )
}
