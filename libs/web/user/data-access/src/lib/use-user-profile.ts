import { UserUpdateUserInput } from '@pubkey-stack/sdk'
import { useWebAuth } from '@pubkey-stack/web-auth-data-access'
import { useMeQuery, useWebSdk } from '@pubkey-stack/web-shell-data-access'
import { toastError } from '@pubkey-ui/core'
import { useUserFineOneUser } from './use-user-fine-one-user'

export function useUserProfile() {
  const sdk = useWebSdk()
  const meQuery = useMeQuery(sdk)
  const { user } = useWebAuth()
  const { query } = useUserFineOneUser(user?.username as string)

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
          toastError(err.message)
          return false
        })
    },
  }
}
