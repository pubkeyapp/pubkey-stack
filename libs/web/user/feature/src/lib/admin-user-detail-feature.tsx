import { useAdminFindOneUser } from '@pubkey-stack/web-user-data-access'
import { UserUiItem } from '@pubkey-stack/web-user-ui'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminUserDetailFeatureIdentities } from './admin-user-detail-feature-identities'
import { AdminUserDetailFeatureSettings } from './admin-user-detail-feature-settings'

export default function AdminUserDetailFeature() {
  const { userId } = useParams<{ userId: string }>() as { userId: string }
  const { query, item } = useAdminFindOneUser({ userId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="User not found" />
  }

  const tabs: UiTabRoute[] = [
    {
      path: 'settings',
      label: 'Settings',
      element: <AdminUserDetailFeatureSettings userId={userId} />,
    },
    {
      path: 'identities',
      label: 'Identities',
      element: <AdminUserDetailFeatureIdentities userId={userId} />,
    },
  ]
  return (
    <UiPage leftAction={<UiBack />} rightAction={<UiDebugModal data={item} />} title={<UserUiItem user={item} />}>
      <UiTabRoutes tabs={tabs} />
    </UiPage>
  )
}
