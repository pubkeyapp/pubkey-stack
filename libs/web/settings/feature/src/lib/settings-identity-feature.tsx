import { useUserFindManyIdentity } from '@pubkey-stack/web-identity-data-access'
import { IdentityUiGroupList } from '@pubkey-stack/web-identity-ui'
import { UiLoader, UiStack } from '@pubkey-ui/core'

export function SettingsIdentityFeature() {
  const { deleteIdentity, grouped, query } = useUserFindManyIdentity()

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <IdentityUiGroupList grouped={grouped} deleteIdentity={deleteIdentity} refresh={() => query.refetch()} />
      )}
    </UiStack>
  )
}
