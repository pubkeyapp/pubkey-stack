import { UiDashboard, UiStack } from '@pubkey-stack/web/ui/core'
import { IconServer } from '@tabler/icons-react'

export function AppDashboard() {
  return (
    <UiStack>
      <UiDashboard links={[{ link: '/servers', icon: IconServer, color: 'violet', label: 'Servers' }]} />
    </UiStack>
  )
}
