import { useUserFindManyIdentity } from '@pubkey-stack/web-identity-data-access'
import { WebUiIdentityIdentityGroupList, WebUiIdentitySolanaLinkButton } from '@pubkey-stack/web-identity-ui'
import { UiLoader, UiStack, UiWarn } from '@pubkey-stack/web-ui-core'

export function WebSettingsIdentityList() {
  const { deleteIdentity, hasSolana, grouped, items, query } = useUserFindManyIdentity()

  return (
    <UiStack>
      {!hasSolana && <WebUiIdentitySolanaLinkButton refresh={() => query.refetch()} />}
      {query.isLoading ? (
        <UiLoader />
      ) : items.length === 0 ? (
        <UiWarn message="No identities found" />
      ) : (
        <WebUiIdentityIdentityGroupList
          grouped={grouped}
          deleteIdentity={deleteIdentity}
          refresh={() => query.refetch()}
        />
      )}
    </UiStack>
  )
}
