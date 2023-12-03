import { WebAuthProvider } from '@pubkey-stack/web-auth-data-access'
import { WebSdkProvider } from '@pubkey-stack/web-shell-data-access'
import { toastError, UiThemeLink, UiThemeProvider } from '@pubkey-ui/core'
import '@pubkey-ui/core/index.esm.css'
import 'mantine-datatable/styles.layer.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Link } from 'react-router-dom'
import { WebShellRoutes } from './web-shell.routes'

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: () => {
        toastError(`Something went wrong`)
      },
    },
  },
})

// eslint-disable-next-line func-style
export const ThemeLink: UiThemeLink = ({ children, ...props }) => <Link {...props}>{children}</Link>

export function WebShellFeature() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <WebSdkProvider>
          <WebAuthProvider>
            <UiThemeProvider link={ThemeLink}>{<WebShellRoutes />}</UiThemeProvider>
          </WebAuthProvider>
        </WebSdkProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
