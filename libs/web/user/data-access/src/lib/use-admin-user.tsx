import { AdminUpdateUserInput } from '@pubkey-stack/sdk'
import { useWebSdk } from '@pubkey-stack/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-stack/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'

export function useAdminUser(userId: string) {
  const sdk = useWebSdk()
  const query = useQuery(
    ['admin', 'users', 'get', userId],
    () => sdk.adminGetUser({ userId }).then((res) => res.data),
    { retry: 0 },
  )
  const user = query.data?.item ?? undefined

  return {
    user,
    query,
    updateUser: async (input: AdminUpdateUserInput) =>
      sdk
        .adminUpdateUser({ userId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            showNotificationSuccess('User updated')
            await query.refetch()
            return true
          }
          showNotificationError('User not updated')
          return false
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        }),
  }
}
