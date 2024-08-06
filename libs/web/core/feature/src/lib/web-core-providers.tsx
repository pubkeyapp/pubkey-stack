import '@pubkey-ui/core'
import '@pubkey-ui/core/index.esm.css'
import 'mantine-datatable/styles.layer.css'
import { AuthProvider } from '@pubkey-stack/web-auth-data-access'
import { AppConfigProvider } from '@pubkey-stack/web-core-data-access'
import { SolanaClusterProvider } from '@pubkey-stack/web-solana-data-access'
import { toastError, UiTheme, UiThemeProvider } from '@pubkey-ui/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: () => {
        toastError(`Something went wrong`)
      },
    },
  },
})

export function WebCoreProviders({ children, theme }: { children: ReactNode; theme: UiTheme['theme'] }) {
  return (
    <UiThemeProvider link={({ children, ...props }) => <Link {...props}>{children}</Link>} theme={theme}>
      <QueryClientProvider client={client}>
        <AppConfigProvider>
          <AuthProvider>
            <SolanaClusterProvider>{children}</SolanaClusterProvider>
          </AuthProvider>
        </AppConfigProvider>
      </QueryClientProvider>
    </UiThemeProvider>
  )
}
