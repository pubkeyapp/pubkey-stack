import { showNotificationError } from '@pubkey-stack/web/ui/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './app/app'

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: () => {
        showNotificationError(`Something went wrong`, { title: 'Error' })
      },
    },
    queries: {
      networkMode: 'offlineFirst',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
