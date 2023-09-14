import { getColorByIndex } from '@pubkey-stack/web/ui/core'
import { useQuery } from '@tanstack/react-query'

export interface Server {
  id: string
  name: string
  color: string
}

function createServer(index: number): Server {
  return {
    id: `s-${index}`,
    name: `Server ${index}`,
    color: getColorByIndex(index),
  }
}

export const servers: Server[] = Array(40)
  .fill(0)
  .map((_, index) => createServer(index))

export function useServerFindMany() {
  console.log('useServerFindMany')
  return useQuery({
    queryKey: ['server-find-many'],
    queryFn: () => Promise.resolve(servers),
  })
}

export function useServerFindOne({ serverId }: { serverId: string }) {
  return useQuery({
    queryKey: ['server-find-one', { serverId }],
    queryFn: () => Promise.resolve(servers.find(({ id }) => id === serverId)),
  })
}
