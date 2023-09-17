import { useRoutes } from 'react-router-dom'
import { WebAdminUserCreateFeature } from './web-admin-user-create.feature'
import { WebAdminUserDetailFeature } from './web-admin-user-detail.feature'
import { WebAdminUserListFeature } from './web-admin-user-list.feature'

export default function WebAdminUserRoutes() {
  return useRoutes([
    { path: '', element: <WebAdminUserListFeature /> },
    {
      path: 'create',
      element: <WebAdminUserCreateFeature />,
    },
    { path: ':userId/*', element: <WebAdminUserDetailFeature /> },
  ])
}
