import { Button, Modal, Tooltip } from '@mantine/core'
import { IdentityProviderSolanaLogin } from '@pubkey-stack/web-identity-data-access'
import { SolanaClusterProvider } from '@pubkey-stack/web-solana-data-access'
import { IconCurrencySolana } from '@tabler/icons-react'
import { WebUiIdentitySolanaLoginWizard } from './web-ui-identity-solana-login-wizard'
import { useDisclosure } from '@mantine/hooks'

export function WebUiIdentitySolanaLoginButton({ refresh }: { refresh: () => void }) {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <Modal opened={opened} onClose={close} size="xl" zIndex={1} title="Sign in with Solana">
        <SolanaClusterProvider autoConnect={true}>
          <IdentityProviderSolanaLogin refresh={refresh}>
            <WebUiIdentitySolanaLoginWizard
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
        <Button radius="md" size="xl" variant="light" leftSection={<IconCurrencySolana size={28} />} onClick={open}>
          Sign in with Solana
        </Button>
      </Tooltip>
    </>
  )
}
