import { Button, Group, Select } from '@mantine/core'
import { User, UserRole, UserStatus } from '@pubkey-stack/sdk'
import { UiBack, UiAdminPage, UiAlert, UiLoader, UiPagination, UiSearchField } from '@pubkey-stack/web/ui/core'
import { useAdminUsers } from '@pubkey-stack/web/user/data-access'
import { AdminUiUserTable, userRoleOptions, userStatusOptions } from '@pubkey-stack/web/user/ui'
import { Link } from 'react-router-dom'

export function WebAdminUserListFeature() {
  const { deleteUser, pagination, query, role, setRole, setSearch, setStatus, status } = useAdminUsers()

  return (
    <UiAdminPage
      title="Users"
      leftAction={<UiBack />}
      rightAction={
        <Button component={Link} to="create">
          Create
        </Button>
      }
    >
      <Group>
        <UiSearchField placeholder="Search user" setSearch={setSearch} />
        <Select
          value={role?.toString() ?? ''}
          onChange={(role) => {
            pagination.setSkip(0)
            setRole(role === '' ? undefined : (role as UserRole))
          }}
          data={[{ value: '', label: 'Filter by role' }, ...userRoleOptions()]}
        />
        <Select
          value={status?.toString() ?? ''}
          onChange={(status) => {
            pagination.setSkip(0)
            setStatus(status === '' ? undefined : (status as UserStatus))
          }}
          data={[{ value: '', label: 'Filter by status' }, ...userStatusOptions()]}
        />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : query?.data?.items?.length ? (
        <AdminUiUserTable
          deleteUser={(user) => {
            if (!window.confirm('Are you sure?')) return
            return deleteUser(user.id)
          }}
          users={query?.data?.items as User[]}
        />
      ) : (
        <UiAlert message="User not found" />
      )}

      <UiPagination pagination={pagination} />
    </UiAdminPage>
  )
}
