import { SettingsFeature } from '@pubkey-stack/web-settings-feature'
import { SolanaFeature } from '@pubkey-stack/web-solana-feature'
import { UserFeature } from '@pubkey-stack/web-user-feature'
import { UiContainer, UiDashboardGrid, UiDashboardItem } from '@pubkey-ui/core'
import { IconCurrencySolana, IconSettings, IconUsers } from '@tabler/icons-react'
import { RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // User Dashboard Links are added by the web-crud generator
  { label: 'Settings', icon: IconSettings, to: '/settings' },
  { label: 'Solana', icon: IconCurrencySolana, to: '/solana' },
  { label: 'Users', icon: IconUsers, to: '/u' },
]

const routes: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/settings/*', element: <SettingsFeature /> },
  { path: '/solana/*', element: <SolanaFeature /> },
  { path: '/u/*', element: <UserFeature /> },
]

export default function WebCoreRoutesUser() {
  return useRoutes(routes)
}

function Dashboard() {
  return (
    <UiContainer>
      <UiDashboardGrid links={links} />
    </UiContainer>
  )
}
