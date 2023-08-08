import { UserStatus } from '@pubkey-stack/sdk'
import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import { useWebAuth } from './web-auth.provider'

export function UserStatusGuard({ denied, status }: { denied: ReactElement; status: UserStatus }) {
  const { user } = useWebAuth()

  return user?.status === status ? <Outlet /> : denied
}
