import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-stack/web-core-ui'
import { useAdminFindManyUser } from '@pubkey-stack/web-user-data-access'
import { AdminUserUiTable, UserUiSelectRole, UserUiSelectStatus } from '@pubkey-stack/web-user-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export default function AdminUserListFeature() {
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
        <UserUiSelectRole value={role} setValue={setRole} />
        <UserUiSelectStatus value={status} setValue={setStatus} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminUserUiTable
          deleteUser={(user) => {
            if (!window.confirm('Are you sure?')) return
            return deleteUser(user.id)
          }}
          users={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="User not found" />
      )}
    </UiPage>
  )
}
