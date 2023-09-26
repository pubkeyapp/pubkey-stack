import { Button, Group } from '@mantine/core'
import { UiCard } from '@pubkey-stack/web-ui-core'
import { notifyError, notifyInfo, notifySuccess, notifyWarn } from '@pubkey-stack/web-ui-notifications'
import { IconAlertCircle, IconCheck, IconCircleX, IconInfoCircle } from '@tabler/icons-react'

export function WebDevUiNotifications() {
  return (
    <UiCard title="UiActionIcon">
      <Group>
        <Button
          leftIcon={<IconInfoCircle />}
          onClick={() => notifyInfo('Info Notification')}
          size="xl"
          color="blue"
          variant="light"
        >
          Info
        </Button>
        <Button
          leftIcon={<IconCheck />}
          onClick={() => notifySuccess('Success Notification')}
          size="xl"
          color="green"
          variant="light"
        >
          Success
        </Button>
        <Button
          leftIcon={<IconAlertCircle />}
          onClick={() => notifyWarn('Warn Notification')}
          size="xl"
          color="yellow"
          variant="light"
        >
          Warn
        </Button>
        <Button
          leftIcon={<IconCircleX />}
          onClick={() => notifyError('Error Notification')}
          size="xl"
          color="red"
          variant="light"
        >
          Error
        </Button>
      </Group>
    </UiCard>
  )
}
