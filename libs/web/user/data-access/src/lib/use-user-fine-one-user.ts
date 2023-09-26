import { useWebSdk } from '@pubkey-stack/web-shell-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFineOneUser(username: string) {
  const sdk = useWebSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-user', username],
    queryFn: () => sdk.userFindOneUser({ username }).then((res) => res.data),
    retry: 0,
  })

  return {
    user: query.data?.item,
    query,
  }
}
