import { UserFindUsersInput } from '@pubkey-stack/sdk'
import { useWebSdk } from '@pubkey-stack/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserProfiles(input: UserFindUsersInput) {
  const sdk = useWebSdk()
  const query = useQuery(['user', 'users', 'get', input], () => sdk.userFindUsers({ input }).then((res) => res.data), {
    retry: 0,
  })

  return {
    items: query.data?.items,
    query,
  }
}
