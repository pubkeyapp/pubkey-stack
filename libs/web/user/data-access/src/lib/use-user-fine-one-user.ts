import { sdk } from '@pubkey-stack/sdk'
import { useQuery } from '@tanstack/react-query'

export function useUserFineOneUser({ username }: { username: string }) {
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
