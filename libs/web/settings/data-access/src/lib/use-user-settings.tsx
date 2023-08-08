import { UserUpdateUserInput } from '@pubkey-stack/sdk'
import { useWebAuth } from '@pubkey-stack/web/auth/data-access'
import { useUserProfile } from '@pubkey-stack/web/profile/data-access'
import { useMeQuery, useWebSdk } from '@pubkey-stack/web/shell/data-access'
import { showNotificationError } from '@pubkey-stack/web/ui/notifications'

export function useUserSettings() {
  const sdk = useWebSdk()
  const meQuery = useMeQuery(sdk)
  const { user } = useWebAuth()
  const { query } = useUserProfile(user?.username as string)

  return {
    user: query.data?.item,
    query,
    updateUser: async (input: UserUpdateUserInput) => {
      return sdk
        .userUpdateUser({
          input,
        })
        .then(async (res) => {
          await Promise.all([query.refetch(), meQuery.refetch()])
          return !!res.data
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        })
    },
  }
}
