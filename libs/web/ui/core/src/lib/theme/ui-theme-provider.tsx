import { ColorScheme, ColorSchemeProvider, MantineProvider, useMantineTheme } from '@mantine/core'
import { useHotkeys, useLocalStorage, useMediaQuery } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import React, { createContext, ReactNode, Suspense, useContext } from 'react'
import { UiLoader } from '../ui-loader'
import { DefaultUiTheme } from './default-ui-theme'

export interface UiProviderContext {
  colorScheme: ColorScheme
  toggleColorScheme: (colorScheme?: ColorScheme) => void
  isSmall: boolean
}

const Context = createContext<UiProviderContext>({} as UiProviderContext)

export function UiThemeProvider({ children }: { children: ReactNode }) {
  const theme = useMantineTheme()
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.md})`)
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })

  function toggleColorScheme(value?: ColorScheme) {
    return setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  const value: UiProviderContext = {
    colorScheme,
    toggleColorScheme,
    isSmall,
  }
  return (
    <Context.Provider value={value}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            colorScheme,
            ...DefaultUiTheme,
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <ModalsProvider>
            <Notifications zIndex={1000} />
            <Suspense fallback={<UiLoader type="full" />}>{children}</Suspense>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </Context.Provider>
  )
}

export function useUiTheme() {
  return useContext(Context)
}
