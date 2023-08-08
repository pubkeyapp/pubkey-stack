import { modals } from '@mantine/modals'
import { AdminCreateIdentityInput, AdminFindIdentitiesInput, Identity, IdentityProvider } from '@pubkey-stack/sdk'
import { useWebSdk } from '@pubkey-stack/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-stack/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminIdentities({ ownerId, provider }: { ownerId?: string; provider?: IdentityProvider }) {
  const sdk = useWebSdk()

  const [input] = useState<AdminFindIdentitiesInput>({
    ownerId: ownerId,
    provider: provider,
  })

  const query = useQuery(['admin', 'identities', 'find', input], () =>
    sdk.adminFindIdentities({ input }).then((res) => res.data),
  )

  return {
    createIdentity: async (input: AdminCreateIdentityInput) => {
      if (!ownerId) {
        showNotificationError('No owner ID')
        return false
      }
      try {
        const res = await sdk.adminCreateIdentity({ input: { ...input, ownerId } })

        if (res) {
          showNotificationSuccess('Identity created')
          modals.closeAll()
          await query.refetch()
          return true
        }
        showNotificationError('Error creating identity')
        return false
      } catch (err) {
        showNotificationError(`${err}`)
        return false
      }
    },
    deleteIdentity: (identity: Identity) => {
      return sdk.adminDeleteIdentity({ identityId: identity.id }).then(async (res) => {
        if (res) {
          showNotificationSuccess('Identity deleted')
          await query.refetch()
          return true
        }
        showNotificationError('Error deleting identity')
        return false
      })
    },
    identities: query.data?.items ?? [],
    query,
  }
}
