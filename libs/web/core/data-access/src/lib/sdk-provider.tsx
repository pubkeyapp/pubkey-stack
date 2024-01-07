import { getGraphQLSdk, Sdk } from '@pubkey-stack/sdk'
import { createContext, ReactNode, useContext } from 'react'

const WebSdkContext = createContext<Sdk>({} as Sdk)

export function SdkProvider({ children }: { children: ReactNode }) {
  const sdk: Sdk = getGraphQLSdk('/graphql')

  return <WebSdkContext.Provider value={sdk}>{children}</WebSdkContext.Provider>
}

export function useSdk() {
  return useContext(WebSdkContext)
}
