import { UiCard, UiError, UiLoader } from '@pubkey-stack/web/ui/core'
import { useAdminFindOneUser } from '@pubkey-stack/web/user/data-access'
import { AdminUiUpdateUserForm } from '@pubkey-stack/web/user/ui'

export function WebAdminUserDetailSettingsTab({ userId }: { userId: string }) {
  const { item, query, updateUser } = useAdminFindOneUser({ userId })
  if (query.isLoading) {
    return <UiLoader />
  }

  if (!item) {
    return <UiError message="User not found" />
  }

  return (
    <UiCard>
      <AdminUiUpdateUserForm user={item} submit={updateUser} />
    </UiCard>
  )
}
