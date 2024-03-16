import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('./pages/home-page'))
const About = lazy(() => import('./pages/about-page'))

export const HOME_ROUTES: RouteObject[] = [
  { path: '/home', element: <Home /> },
  { path: '/about', element: <About /> },
]
