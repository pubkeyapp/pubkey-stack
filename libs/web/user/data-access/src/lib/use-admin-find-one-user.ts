import { AdminUpdateUserInput } from '@pubkey-stack/sdk'
import { useWebSdk } from '@pubkey-stack/web-shell-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneUser({ userId }: { userId: string }) {
  const sdk = useWebSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-user', userId],
    queryFn: () => sdk.adminFindOneUser({ userId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateUser: async (input: AdminUpdateUserInput) =>
      sdk
        .adminUpdateUser({ userId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('User updated')
            await query.refetch()
            return true
          }
          toastError('User not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
