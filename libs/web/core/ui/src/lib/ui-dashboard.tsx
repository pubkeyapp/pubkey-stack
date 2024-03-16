import { UiContainer, UiDashboardGrid, UiDashboardItem } from '@pubkey-ui/core'

export function UiDashboard({ links }: { links: UiDashboardItem[] }) {
  return (
    <UiContainer>
      <UiDashboardGrid links={links} />
    </UiContainer>
  )
}
