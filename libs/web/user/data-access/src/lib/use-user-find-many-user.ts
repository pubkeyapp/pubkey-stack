import { UserFindManyUserInput } from '@pubkey-stack/sdk'
import { useWebSdk } from '@pubkey-stack/web-shell-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFindManyUser(input: UserFindManyUserInput) {
  const sdk = useWebSdk()
  const query = useQuery({
    queryKey: ['user', 'find-many-user', input],
    queryFn: () => sdk.userFindManyUser({ input }).then((res) => res.data),
    retry: 0,
  })

  return {
    data: query.data?.paging.data ?? [],
    meta: query.data?.paging.meta,
    query,
  }
}
