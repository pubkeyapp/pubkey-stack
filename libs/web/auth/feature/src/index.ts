import { lazy } from 'react'

export const WebAuthLoginFeature = lazy(() => import('./lib/web-auth-login.feature'))
export const WebAuthRegisterFeature = lazy(() => import('./lib/web-auth-register.feature'))
