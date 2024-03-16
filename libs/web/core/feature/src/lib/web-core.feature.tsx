import { createTheme, DEFAULT_THEME } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { WebCoreProviders } from './web-core-providers'
import { WebCoreRoutes } from './web-core-routes'

const theme = createTheme({
  colors: {
    brand: DEFAULT_THEME.colors.blue,
  },
  primaryColor: 'brand',
})

export function WebCoreFeature() {
  return (
    <BrowserRouter>
      <WebCoreProviders theme={theme}>
        <WebCoreRoutes />
      </WebCoreProviders>
    </BrowserRouter>
  )
}
