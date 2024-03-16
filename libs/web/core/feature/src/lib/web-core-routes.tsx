import { useAuth } from '@pubkey-stack/web-auth-data-access'
import { AuthLoginFeature, AuthRegisterFeature } from '@pubkey-stack/web-auth-feature'
import { HOME_ROUTES } from '@pubkey-stack/web-home-feature'
import { UiNotFound } from '@pubkey-ui/core'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { useGuardedRoutes } from './use-guarded-routes'

export const AdminFeature = lazy(() => import('./web-core-routes-admin'))
export const UserFeature = lazy(() => import('./web-core-routes-user'))

export function WebCoreRoutes() {
  const { user } = useAuth()
  return useGuardedRoutes({
    index: user ? '/dashboard' : '/home',
    admin: [
      // Here you can add routes that are only accessible by admins under the /admin/* path
      // Visit /admin/custom-admin-page to see this route
      // { path: 'custom-admin-page', element: <div>CUSTOM ADMIN PAGE HERE</div> },
      { path: '*', element: <AdminFeature /> },
    ],
    layout: [
      // Here you can add routes that are part of the main layout
      { path: '*', element: <UserFeature /> },
    ],
    full: [
      // Here you can add routes that are not part of the main layout, visit /custom-full-page to see this route
      // { path: 'custom-full-page', element: <div>CUSTOM FULL PAGE</div> },
    ],
    public: [
      // Routes for the auth feature
      { path: '/login', element: <AuthLoginFeature /> },
      { path: '/register', element: <AuthRegisterFeature /> },
      // Homepage
      ...HOME_ROUTES,
      // Routes for the 404 page
      { path: '/404', element: <UiNotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  })
}
