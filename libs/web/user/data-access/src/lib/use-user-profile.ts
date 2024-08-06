import { sdk, UserUserUpdateInput } from '@pubkey-stack/sdk'
import { useAuth, useMe } from '@pubkey-stack/web-auth-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useUserFineOneUser } from './use-user-fine-one-user'

export function useUserProfile() {
  const me = useMe()
  const { user } = useAuth()
  const { query } = useUserFineOneUser({ username: user?.username as string })

  return {
    user: query.data?.item,
    query,
    updateUser: async (input: UserUserUpdateInput) => {
      return sdk
        .userUpdateUser({
          input,
        })
        .then(async (res) => {
          await Promise.all([query.refetch(), me.refetch()])
          toastSuccess('Profile updated')
          return !!res.data
        })
        .catch((err) => {
          toastError(err.message)
          return false
        })
    },
  }
}
