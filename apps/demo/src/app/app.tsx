import { UiThemeProvider } from '@pubkey-stack/web/ui/core'
import { UiLayout } from '@pubkey-stack/web/ui/layout'
import { AppRoutes } from './app-routes'

export function App() {
  return (
    <UiThemeProvider>
      <UiLayout>
        <AppRoutes />
      </UiLayout>
    </UiThemeProvider>
  )
}
