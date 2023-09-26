import { WebAuthLoginFeature, WebAuthRegisterFeature } from '@pubkey-stack/web-auth-feature'
import { WebDashboardRoutes } from '@pubkey-stack/web-dashboard-feature'
import { WebHomeRoutes } from '@pubkey-stack/web-home-feature'
import { WebSettingsRoutes } from '@pubkey-stack/web-settings-feature'
import { UiNotFound } from '@pubkey-stack/web-ui-core'
import { WebUserRoutes } from '@pubkey-stack/web-user-feature'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { useGuardedRoutes } from './use-guarded-routes'

export const LazyAdminFeature = lazy(() => import('./web-admin.routes'))

export function WebShellRoutes() {
  return useGuardedRoutes({
    index: '/dashboard',
    admin: [
      // Here you can add routes that are only accessible by admins under the /admin/* path
      // Visit /admin/custom-admin-page to see this route
      { path: 'custom-admin-page', element: <div>CUSTOM ADMIN PAGE HERE</div> },
      { path: '*', element: <LazyAdminFeature /> },
    ],
    layout: [
      // Here you can add routes that are part of the main layout
      { path: '/dashboard', element: <WebDashboardRoutes /> },
      { path: '/profile/*', element: <WebUserRoutes /> },
      { path: '/settings/*', element: <WebSettingsRoutes /> },
    ],
    full: [
      // Here you can add routes that are not part of the main layout, visit /custom-full-page to see this route
      { path: 'custom-full-page', element: <div>CUSTOM FULL PAGE</div> },
    ],
    root: [
      // Routes for the auth feature
      { path: '/login', element: <WebAuthLoginFeature /> },
      { path: '/register', element: <WebAuthRegisterFeature /> },
      // Homepage
      { path: '/*', element: <WebHomeRoutes /> },
      // Routes for the 404 page
      { path: '/404', element: <UiNotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  })
}
