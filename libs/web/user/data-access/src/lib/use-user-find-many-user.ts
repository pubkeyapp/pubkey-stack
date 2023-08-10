import { UserFindManyUserInput } from '@pubkey-stack/sdk'
import { useWebSdk } from '@pubkey-stack/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFindManyUser(input: UserFindManyUserInput) {
  const sdk = useWebSdk()
  const query = useQuery(
    ['user', 'users', 'get', input],
    () => sdk.userFindManyUser({ input }).then((res) => res.data),
    {
      retry: 0,
    },
  )

  return {
    items: query.data?.items,
    query,
  }
}
