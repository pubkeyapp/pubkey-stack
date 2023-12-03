import { Button, Group, Select } from '@mantine/core'
import { getEnumOptions, UserRole, UserStatus } from '@pubkey-stack/sdk'
import { UiPage, UiBack, UiDebugModal, UiInfo, UiLoader, UiPagination, UiSearchField } from '@pubkey-stack/web-ui-core'
import { useAdminFindManyUser } from '@pubkey-stack/web-user-data-access'
import { AdminUiUserTable } from '@pubkey-stack/web-user-ui'
import { Link } from 'react-router-dom'

export function WebAdminUserListFeature() {
  const { deleteUser, items, pagination, query, role, setRole, setSearch, setStatus, status } = useAdminFindManyUser()

  return (
    <UiPage
      title="Users"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search user" setSearch={setSearch} />
        <Select
          value={role?.toString() ?? ''}
          onChange={(role) => {
            pagination.setPage(1)
            setRole(role === '' ? undefined : (role as UserRole))
          }}
          data={[{ value: '', label: 'Filter by role' }, ...getEnumOptions(UserRole)]}
        />
        <Select
          value={status?.toString() ?? ''}
          onChange={(status) => {
            pagination.setPage(1)
            setStatus(status === '' ? undefined : (status as UserStatus))
          }}
          data={[{ value: '', label: 'Filter by status' }, ...getEnumOptions(UserStatus)]}
        />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminUiUserTable
          deleteUser={(user) => {
            if (!window.confirm('Are you sure?')) return
            return deleteUser(user.id)
          }}
          users={items}
        />
      ) : (
        <UiInfo message="User not found" />
      )}

      <UiPagination pagination={pagination} />
    </UiPage>
  )
}
