import { WebDevAdminRoutes } from '@pubkey-stack/web/dev/feature'
import { UiContainer, UiDashboard, UiDashboardItem, UiNotFound } from '@pubkey-stack/web/ui/core'
import { WebAdminUserRoutes } from '@pubkey-stack/web/user/feature'
import { IconUsers } from '@tabler/icons-react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // Admin Dashboard Links
  { label: 'Users', icon: IconUsers, link: '/admin/users' },
]

const routes: RouteObject[] = [
  // Admin Dashboard Routes
  { path: 'development/*', element: <WebDevAdminRoutes /> },
  { path: 'users/*', element: <WebAdminUserRoutes /> },
]

export default function WebAdminRoutes() {
  return useRoutes([
    { index: true, element: <Navigate to="dashboard" replace /> },
    {
      path: 'dashboard/*',
      element: (
        <UiContainer>
          <UiDashboard links={links} />
        </UiContainer>
      ),
    },
    ...routes,
    { path: '*', element: <UiNotFound to="/admin" /> },
  ])
}
