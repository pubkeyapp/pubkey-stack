import { sdk } from '@pubkey-stack/sdk'
import { useQuery } from '@tanstack/react-query'

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const res = await sdk.me().then((res) => res?.data)
        console.log(`useMeQuery: logged in as ${res.me?.username}`)
        return res
      } catch (error) {
        console.log(`useMeQuery: Not authenticated.`)
        return null
      }
    },
    retry: 0,
  })
}
