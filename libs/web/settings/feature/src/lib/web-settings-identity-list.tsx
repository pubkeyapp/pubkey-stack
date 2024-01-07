import { useUserFindManyIdentity } from '@pubkey-stack/web-identity-data-access'
import { WebUiIdentityConnect, WebUiIdentityIdentityGroupList } from '@pubkey-stack/web-identity-ui'
import { UiLoader, UiStack } from '@pubkey-ui/core'

export function WebSettingsIdentityList() {
  const { deleteIdentity, grouped, items, query } = useUserFindManyIdentity()

  return (
    <UiStack>
      <WebUiIdentityConnect />
      {query.isLoading ? (
        <UiLoader />
      ) : items.length ? (
        <WebUiIdentityIdentityGroupList
          grouped={grouped}
          deleteIdentity={deleteIdentity}
          refresh={() => query.refetch()}
        />
      ) : null}
    </UiStack>
  )
}
