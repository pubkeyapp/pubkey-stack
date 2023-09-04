import { useLocalStorage } from '@mantine/hooks'
import { createContext, ReactNode, useContext } from 'react'

export interface ClusterProviderContext {
  cluster: string
  isDefault: boolean
  reset: () => void
  setCluster: (cluster: string) => void
}

const ClusterContext = createContext<ClusterProviderContext>({} as ClusterProviderContext)

export function ClusterProvider({ children }: { children: ReactNode }) {
  const defaultValue = 'https://rpc-devnet.helius.xyz/?api-key=YOUR_HELIUS_KEY'
  const [cluster, setCluster] = useLocalStorage<string>({
    defaultValue,
    getInitialValueInEffect: true,
    key: 'solana-cluster',
  })
  const value: ClusterProviderContext = {
    cluster: cluster,
    isDefault: cluster === defaultValue,
    reset: () => setCluster(defaultValue),
    setCluster,
  }
  return <ClusterContext.Provider value={value}>{children}</ClusterContext.Provider>
}

export function useCluster() {
  return useContext(ClusterContext)
}
