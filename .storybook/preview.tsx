import type { Preview } from '@storybook/react-vite'
import '../src/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from '../src/contexts/app.context'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from '../src/components/ErrorBoundary'
import { BrowserRouter } from 'react-router-dom'
import { initialize, mswLoader } from 'msw-storybook-addon'
import authRequests from '../src/msw/auth.msw'
import productRequests from '../src/msw/product.msw'
import userRequests from '../src/msw/user.msw'

// Initialize MSW
initialize()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color|bc)$/i,
        date: /Date$/i
      }
    },
    msw: {
      handlers: [...authRequests, ...productRequests, ...userRequests]
    }
  },
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <HelmetProvider>
              <ErrorBoundary>
                <Story />
              </ErrorBoundary>
            </HelmetProvider>
          </AppProvider>
        </QueryClientProvider>
      </BrowserRouter>
    )
  ]
}

export default preview
