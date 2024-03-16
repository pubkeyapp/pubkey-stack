import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const LazyHome = lazy(() => import('./pages/home-page'))
const LazyAbout = lazy(() => import('./pages/about-page'))

export const HOME_ROUTES: RouteObject[] = [
  { path: '/home', element: <LazyHome /> },
  { path: '/about', element: <LazyAbout /> },
]
