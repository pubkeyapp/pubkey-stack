import { WalletModalProvider } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { clusterApiUrl, Connection } from '@solana/web3.js'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { ClusterProvider, useCluster } from './web-cluster-provider'

export interface SolanaProviderContext {
  connection: Connection
  endpoint: string
}

const SolanaContext = createContext<SolanaProviderContext>({} as SolanaProviderContext)

export function SolanaProvider({
  autoConnect = true,
  children,
}: {
  autoConnect?: boolean
  children: ReactNode | WalletAdapterNetwork
}) {
  const { cluster } = useCluster()
  const endpoint = useMemo(() => {
    const value = cluster

    if (!value?.startsWith('http')) {
      return clusterApiUrl(cluster.toLowerCase() as WalletAdapterNetwork)
    }

    return value
  }, [cluster])

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      // Add more wallets here
    ],
    [],
  )

  const value: SolanaProviderContext = {
    connection: new Connection(endpoint),
    endpoint,
  }

  return (
    <SolanaContext.Provider value={value}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect={autoConnect}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </SolanaContext.Provider>
  )
}

export function useSolana() {
  return useContext(SolanaContext)
}

export function SolanaClusterProvider({ autoConnect, children }: { autoConnect?: boolean; children: ReactNode }) {
  return (
    <ClusterProvider>
      <SolanaProvider autoConnect={autoConnect}>{children}</SolanaProvider>
    </ClusterProvider>
  )
}
