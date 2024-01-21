import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { User } from '@pubkey-stack/sdk'
import { IdentityUiAvatarGroup } from '@pubkey-stack/web-identity-ui'
import { IconPencil, IconTrash, IconUser } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { UserUiItem } from './user-ui-item'
import { UserUiRoleBadge } from './user-ui-role-badge'
import { UserUiStatusBadge } from './user-ui-status-badge'

interface AdminUserTableProps {
  users: User[]
  deleteUser: (user: User) => void
  page: DataTableProps['page']
  totalRecords: DataTableProps['totalRecords']
  recordsPerPage: DataTableProps['recordsPerPage']
  onPageChange: (page: number) => void
}

export function AdminUserUiTable({
  deleteUser,
  users = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: AdminUserTableProps) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        onPageChange={onPageChange}
        page={page ?? 1}
        recordsPerPage={recordsPerPage ?? 10}
        totalRecords={totalRecords ?? 1}
        columns={[
          {
            accessor: 'username',
            render: (item) => <UserUiItem user={item} to={`/admin/users/${item.id}`} />,
          },
          {
            accessor: 'identities',
            textAlign: 'right',
            width: '20%',
            render: (item) => (
              <Group justify="right">
                <IdentityUiAvatarGroup identities={item.identities ?? []} />
              </Group>
            ),
          },
          {
            accessor: 'role',
            textAlign: 'center',
            width: '10%',
            render: (item) => (item.role ? <UserUiRoleBadge role={item.role} /> : null),
          },
          {
            accessor: 'status',
            textAlign: 'center',
            width: '10%',
            render: (item) => (item.status ? <UserUiStatusBadge status={item.status} /> : null),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            width: '10%',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon size="sm" variant="light" color="brand" component={Link} to={item.profileUrl}>
                  <IconUser size={16} />
                </ActionIcon>
                <ActionIcon
                  size="sm"
                  variant="light"
                  color="brand"
                  component={Link}
                  to={`/admin/users/${item.id}/settings`}
                >
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon size="sm" variant="light" color="red" onClick={() => deleteUser(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={users}
      />
    </ScrollArea>
  )
}
