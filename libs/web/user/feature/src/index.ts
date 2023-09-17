import { lazy } from 'react'

export const WebAdminUserRoutes = lazy(() => import('./lib/web-admin-user.routes'))
export const WebUserRoutes = lazy(() => import('./lib/web-user.routes'))
