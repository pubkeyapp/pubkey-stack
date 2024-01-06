import { toastSuccess, UiCard, UiDebug, UiStack } from '@pubkey-ui/core'
import { useUserFindManyIdentity } from '@pubkey-stack/web-identity-data-access'
import { IdentityProvider } from '@pubkey-stack/sdk'
import { Button, Grid, Modal } from '@mantine/core'
import { VerifyUiWizard } from './verify-ui-wizard'
import { useDisclosure } from '@mantine/hooks'

export function WebDevIdentityWizard() {
  const { items } = useUserFindManyIdentity()

  return (
    <Grid>
      <Grid.Col span={8}>
        <UiStack>
          <UiCard title="Identity Wizard">
            <VerifyUiWizard />
          </UiCard>
          <UiCard title="Identity Wizard Modal">
            <VerifyUiWizardModal />
          </UiCard>
        </UiStack>
      </Grid.Col>
      <Grid.Col span={4}>
        <UiDebug
          data={{
            providers: Object.keys(IdentityProvider),
            identities: items.map((i) => [i.provider, i.providerId]),
          }}
          open
          hideButton
        />
      </Grid.Col>
    </Grid>
  )
}

export function VerifyUiWizardModal() {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <Modal opened={opened} onClose={close} size="xl" zIndex={1} title="Verify your wallet" centered>
        <VerifyUiWizard
          p="lg"
          onConnected={(publicKey) => toastSuccess(`connected to ${publicKey}`)}
          onVerified={close}
        />
      </Modal>
      <Button onClick={open}>Verify</Button>
    </>
  )
}
