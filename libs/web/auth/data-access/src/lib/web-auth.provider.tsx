import { AppConfig, LoginInput, RegisterInput, User } from '@pubkey-stack/sdk'
import { useMeQuery, useWebSdk } from '@pubkey-stack/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-stack/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'

import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react'

type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading' | 'error'

export interface WebAuthState {
  status: AuthStatus
  error?: unknown | undefined
  user?: User | undefined
}

export interface WebAuthProviderContext extends WebAuthState {
  appConfig?: AppConfig | undefined
  appConfigLoading: boolean
  authenticated: boolean
  developer: boolean
  error?: unknown | undefined
  loading: boolean
  login: (input: LoginInput) => Promise<User | undefined>
  logout: () => Promise<boolean | undefined>
  register: (input: RegisterInput) => Promise<User | undefined>
}

const Context = createContext<WebAuthProviderContext>({} as WebAuthProviderContext)

export type WebAuthAction =
  | { type: 'login'; payload: User }
  | { type: 'logout'; payload?: unknown }
  | { type: 'error'; payload: unknown }
  | { type: 'loading'; payload?: unknown }

function authReducer(state: WebAuthState, { type, payload }: WebAuthAction): WebAuthState {
  switch (type) {
    case 'login':
      return {
        ...state,
        status: 'authenticated',
        user: payload,
      }
    case 'logout':
      return {
        ...state,
        status: 'unauthenticated',
        user: undefined,
      }
    case 'error':
      return {
        ...state,
        status: 'error',
        error: payload,
      }
    case 'loading':
      return {
        ...state,
        status: 'loading',
      }
    default:
      return state
  }
}

export function useAppConfig() {
  const sdk = useWebSdk()

  return useQuery({
    queryKey: ['app-config'],
    queryFn: () => sdk.appConfig().then((res) => res.data),
  })
}

export function WebAuthProvider({ children }: { children: ReactNode }) {
  const sdk = useWebSdk()
  const query = useMeQuery(sdk)
  const configQuery = useAppConfig()

  const [state, dispatch] = useReducer(authReducer, { status: 'loading' })

  useEffect(() => {
    if (query.isLoading) return
    dispatch(
      query.data?.me
        ? // We are authenticated
          { type: 'login', payload: query.data.me }
        : // We are not authenticated
          { type: 'logout' },
    )
  }, [query.isLoading, query.data?.me])

  const value: WebAuthProviderContext = {
    appConfig: configQuery.data?.config,
    appConfigLoading: configQuery.isLoading,
    authenticated: state.status === 'authenticated',
    developer: state.user?.developer ?? false,
    error: state.error,
    user: state.user,
    status: state.status,
    loading: state.status === 'loading',
    login: (input: LoginInput) =>
      sdk
        .login({ input })
        .then((res) => {
          if (res.data.login) {
            showNotificationSuccess('Login successful')
            dispatch({ type: 'login', payload: res.data.login })
            return res.data.login
          }
          showNotificationError('Login failed')
        })
        .catch((err) => {
          showNotificationError(err.message)
          dispatch({ type: 'error', payload: err })
          return undefined
        }),
    logout: () =>
      sdk
        .logout()
        .then((res) => {
          if (res.data.logout) {
            showNotificationSuccess('Logout successful')
            dispatch({ type: 'logout' })
            return res.data.logout
          }
          showNotificationError('Logout failed')
        })
        .catch((err) => {
          showNotificationError(err.message)
          dispatch({ type: 'error', payload: err })
          return undefined
        }),
    register: (input: RegisterInput) =>
      sdk
        .register({ input })
        .then((res) => {
          if (res.data.register) {
            showNotificationSuccess('Register successful')
            dispatch({ type: 'login', payload: res.data.register })
            return res.data.register
          }
          showNotificationError('Register failed')
        })
        .catch((err) => {
          showNotificationError(err.message)
          dispatch({ type: 'error', payload: err })
          return undefined
        }),
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useWebAuth() {
  return useContext(Context)
}
