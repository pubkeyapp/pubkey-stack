import { UiDashboard } from '@pubkey-stack/web-core-ui'
import { SettingsFeature } from '@pubkey-stack/web-settings-feature'
import { SolanaFeature } from '@pubkey-stack/web-solana-feature'
import { UserFeature } from '@pubkey-stack/web-user-feature'
import { UiDashboardItem, UiNotFound } from '@pubkey-ui/core'
import { IconCurrencySolana, IconSettings, IconUsers } from '@tabler/icons-react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // User Dashboard Links are added by the web-crud generator
  { label: 'Settings', icon: IconSettings, to: '/settings' },
  { label: 'Solana', icon: IconCurrencySolana, to: '/solana' },
  { label: 'Users', icon: IconUsers, to: '/u' },
]

const routes: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/settings/*', element: <SettingsFeature /> },
  { path: '/solana/*', element: <SolanaFeature /> },
  { path: '/u/*', element: <UserFeature /> },
]

export default function WebCoreRoutesUser() {
  return useRoutes([
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: '/dashboard', element: <UiDashboard links={links} /> },
    ...routes,
    { path: '*', element: <UiNotFound to="/dashboard" /> },
  ])
}
