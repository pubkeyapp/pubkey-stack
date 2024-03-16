import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Detail = lazy(() => import('./user-user-detail-feature'))
const List = lazy(() => import('./user-user-list-feature'))

export default function UserUserRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: ':username/*', element: <Detail /> },
  ])
}
