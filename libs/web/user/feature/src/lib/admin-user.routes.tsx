import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./admin-user-create-feature'))
const Detail = lazy(() => import('./admin-user-detail-feature'))
const List = lazy(() => import('./admin-user-list-feature'))

export default function AdminUserRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: 'create', element: <Create /> },
    { path: ':userId/*', element: <Detail /> },
  ])
}
