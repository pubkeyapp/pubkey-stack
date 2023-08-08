import { useUserIdentities } from '@pubkey-stack/web/identity/data-access'
import { IdentityUiIdentityGroupList, IdentityUiSolanaLinkButton } from '@pubkey-stack/web/identity/ui'
import { UiLoader, UiStack, UiWarn } from '@pubkey-stack/web/ui/core'

export function WebSettingsIdentityList() {
  const { deleteIdentity, hasSolana, grouped, items, query } = useUserIdentities()

  return (
    <UiStack>
      {!hasSolana && <IdentityUiSolanaLinkButton items={items ?? []} refresh={() => query.refetch()} />}
      {query.isLoading ? (
        <UiLoader />
      ) : items.length === 0 ? (
        <UiWarn message="No identities found" />
      ) : (
        <IdentityUiIdentityGroupList
          grouped={grouped}
          deleteIdentity={deleteIdentity}
          refresh={() => query.refetch()}
        />
      )}
    </UiStack>
  )
}
