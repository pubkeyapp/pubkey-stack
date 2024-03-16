import { UserAdminCreateInput, UserAdminFindManyInput, UserRole, UserStatus } from '@pubkey-stack/sdk'
import { useSdk } from '@pubkey-stack/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyUser(props?: UserAdminFindManyInput) {
  const sdk = useSdk()
  const [role, setRole] = useState<UserRole | undefined>(undefined)
  const [status, setStatus] = useState<UserStatus | undefined>(undefined)
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>('')

  const input: UserAdminFindManyInput = { limit, page, role, search, status }
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
    pagination: {
      limit,
      page,
      total,
      setLimit,
      setPage,
    },
    setRole: (role: UserRole | undefined) => {
      setPage(1)
      setRole(role)
    },
    setSearch: (search: string) => {
      setPage(1)
      setSearch(search)
    },
    setStatus: (status: UserStatus | undefined) => {
      setPage(1)
      setStatus(status)
    },
    createUser: (input: UserAdminCreateInput) =>
      sdk
        .adminCreateUser({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`User  created`)
          } else {
            toastError(`User not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteUser: (userId: string) =>
      sdk.adminDeleteUser({ userId }).then(() => {
        toastSuccess('User deleted')
        return query.refetch()
      }),
  }
}
