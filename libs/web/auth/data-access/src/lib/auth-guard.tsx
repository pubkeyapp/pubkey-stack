import { Alert } from '@mantine/core'
import { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useWebAuth } from './web-auth.provider'

export function AuthGuard({
  children,
  redirectTo,
  loader,
}: {
  children: ReactElement
  redirectTo: string
  loader: ReactElement
}) {
  const { authenticated, error, loading } = useWebAuth()
  const location = useLocation()

  if (loading) {
    return loader
  }

  if (error) {
    return <Alert title={'An error occurred'}>{error instanceof Error ? error.message : `${error}`}</Alert>
  }

  return authenticated ? children : <Navigate replace to={redirectTo} state={{ from: location }} />
}
