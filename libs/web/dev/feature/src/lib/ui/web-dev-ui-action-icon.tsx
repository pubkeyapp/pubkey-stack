import { Group } from '@mantine/core'
import { UiActionIcon, UiCard } from '@pubkey-stack/web-ui-core'
import { notifyInfo } from '@pubkey-stack/web-ui-notifications'
import { IconAt, IconBug, IconTrash } from '@tabler/icons-react'

export function WebDevUiActionIcon() {
  function click() {
    notifyInfo('Clicked')
  }

  return (
    <UiCard title="UiActionIcon">
      <Group>
        <UiActionIcon icon={IconBug} onClick={click} />
        <UiActionIcon icon={IconAt} onClick={click} size="lg" />
        <UiActionIcon icon={IconTrash} onClick={click} size="xl" color="red" variant="light" />
      </Group>
    </UiCard>
  )
}
