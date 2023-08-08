import { UserRole } from '@pubkey-stack/sdk'
import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import { useWebAuth } from './web-auth.provider'

export function UserRoleGuard({ denied, role }: { denied: ReactElement; role: UserRole }) {
  const { user } = useWebAuth()

  return user?.role === role ? <Outlet /> : denied
}
