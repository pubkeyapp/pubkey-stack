import { useWebSdk } from '@pubkey-stack/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserProfile(username: string) {
  const sdk = useWebSdk()
  const query = useQuery(
    ['user', 'users', 'get', username],
    () => sdk.userGetUserByUsername({ username }).then((res) => res.data),
    {
      retry: 0,
    },
  )

  return {
    user: query.data?.item,
    query,
  }
}
