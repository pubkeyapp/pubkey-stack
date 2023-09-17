import { AdminCreateUserInput, AdminFindManyUserInput, UserRole, UserStatus } from '@pubkey-stack/sdk'
import { useWebSdk } from '@pubkey-stack/web/shell/data-access'

import { useUiPagination } from '@pubkey-stack/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-stack/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyUser() {
  const sdk = useWebSdk()
  const [role, setRole] = useState<UserRole | undefined>(undefined)
  const [status, setStatus] = useState<UserStatus | undefined>(undefined)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>('')

  const input: AdminFindManyUserInput = { limit, page, role, search, status }
  const query = useQuery({
    queryKey: ['admin', 'find-many-user', input],
    queryFn: () => sdk.adminFindManyUser({ input }).then((res) => res.data),
  })
  const total = query.data?.paging.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    role,
    status,
    pagination: useUiPagination({
      limit,
      page,
      total,
      setLimit,
      setPage,
    }),
    setRole,
    setSearch,
    setStatus,
    createUser: (input: AdminCreateUserInput) =>
      sdk
        .adminCreateUser({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            showNotificationSuccess(`User  created`)
          } else {
            showNotificationError(`User not created`)
          }
          return res.created
        })
        .catch((err) => {
          showNotificationError(err.message)
          return undefined
        }),
    deleteUser: (userId: string) =>
      sdk.adminDeleteUser({ userId }).then(() => {
        showNotificationSuccess('User deleted')
        return query.refetch()
      }),
  }
}
