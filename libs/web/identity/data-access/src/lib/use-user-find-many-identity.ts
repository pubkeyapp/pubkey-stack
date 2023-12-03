import { Identity, IdentityProvider } from '@pubkey-stack/sdk'
import { useWebSdk } from '@pubkey-stack/web-shell-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useUserFindManyIdentity() {
  const sdk = useWebSdk()
  const query = useQuery({
    queryKey: ['user', 'find-many-identity'],
    queryFn: () => sdk.userFindManyIdentity().then((res) => res?.data),
  })

  const grouped: { provider: IdentityProvider; items: Identity[] }[] = useMemo(() => {
    if (!query.data) {
      return []
    }
    const items = query.data?.items ?? []
    return items.reduce((acc, item) => {
      const existing = acc.find((x) => x.provider === item.provider)
      if (existing) {
        existing.items.push(item)
      } else {
        acc.push({ provider: item.provider, items: [item] })
      }
      return acc
    }, [] as { provider: IdentityProvider; items: Identity[] }[])
  }, [query.data])

  const items = query.data?.items ?? []

  const discordIdentity = items.find((x) => x.provider === IdentityProvider.Discord)

  return {
    expiredDiscord: discordIdentity?.expired ?? false,
    grouped,
    hasDiscord: !!discordIdentity,
    hasSolana: items.some((x) => x.provider === IdentityProvider.Solana),
    items,
    query,
    deleteIdentity(identityId: string) {
      if (!window.confirm('Are you sure?')) {
        return
      }
      sdk
        .userDeleteIdentity({ identityId })
        .then((res) => {
          toastSuccess('Identity deleted')
        })
        .catch((res) => {
          toastError('Error deleting identity')
        })
        .finally(() => query.refetch())
    },
  }
}
