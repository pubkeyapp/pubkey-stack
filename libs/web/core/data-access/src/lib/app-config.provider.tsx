import { AppConfig, IdentityProvider } from '@pubkey-stack/sdk'
import { toastError } from '@pubkey-ui/core'
import { createContext, ReactNode, useContext, useMemo } from 'react'

// This is provided by /api/__/env.js included in index.html
const appConfig: AppConfig = (window as unknown as { __env: AppConfig }).__env

if (!appConfig) {
  toastError('App config not found')
}

export interface AuthProviderContext {
  appConfig?: AppConfig | undefined
  authEnabled: boolean
  enabledProviders: IdentityProvider[]
}

const Context = createContext<AuthProviderContext>({} as AuthProviderContext)

export function AppConfigProvider({ children }: { children: ReactNode }) {
  const authEnabled = useMemo(() => {
    if (!appConfig) return false
    const {
      authDiscordEnabled,
      authGithubEnabled,
      authGoogleEnabled,
      authPasswordEnabled,
      authRegisterEnabled,
      authSolanaEnabled,
      authTwitterEnabled,
    } = appConfig as AppConfig
    return (
      authDiscordEnabled ||
      authGithubEnabled ||
      authGoogleEnabled ||
      authRegisterEnabled ||
      authPasswordEnabled ||
      authSolanaEnabled ||
      authTwitterEnabled
    )
  }, [appConfig])

  const enabledProviders: IdentityProvider[] = useMemo(
    () =>
      appConfig
        ? ([
            appConfig.authDiscordEnabled && IdentityProvider.Discord,
            appConfig.authGithubEnabled && IdentityProvider.GitHub,
            appConfig.authGoogleEnabled && IdentityProvider.Google,
            appConfig.authSolanaEnabled && IdentityProvider.Solana,
            appConfig.authTwitterEnabled && IdentityProvider.Twitter,
          ].filter(Boolean) as IdentityProvider[])
        : [],
    [appConfig],
  )

  const value: AuthProviderContext = {
    appConfig,
    authEnabled,
    enabledProviders,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useAppConfig() {
  return useContext(Context)
}
