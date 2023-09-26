import { ActionIcon, Anchor, Group, ScrollArea, Stack, Text } from '@mantine/core'
import { User } from '@pubkey-stack/sdk'
import { UiGroup } from '@pubkey-stack/web-ui-core'
import { IconPencil, IconTrash, IconUser } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { WebUiUserAvatar } from './web-ui-user-avatar'
import { WebUiUserRoleBadge } from './web-ui-user-role-badge'
import { WebUiUserStatusBadge } from './web-ui-user-status-badge'

interface AdminUserTableProps {
  users: User[]
  deleteUser: (user: User) => void
}

export function AdminUiUserTable({ deleteUser, users = [] }: AdminUserTableProps) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'username',
            render: (item) => {
              const link = `/admin/users/${item.id}`
              return (
                <Group spacing="sm" p={4}>
                  <WebUiUserAvatar size={40} user={item} radius={50} />
                  <Stack spacing={1}>
                    <UiGroup position="left" spacing={4} align="baseline">
                      <Anchor component={Link} to={link} size="sm" weight={500}>
                        {item.username}
                      </Anchor>
                    </UiGroup>
                    {item.name ? (
                      <Text component={Link} to={link} size="sm" color="dimmed">
                        {item.name}
                      </Text>
                    ) : null}
                  </Stack>
                </Group>
              )
            },
          },
          {
            accessor: 'role',
            textAlignment: 'center',
            render: (item) => (item.role ? <WebUiUserRoleBadge role={item.role} /> : null),
          },
          {
            accessor: 'status',
            textAlignment: 'center',
            render: (item) => (item.status ? <WebUiUserStatusBadge status={item.status} /> : null),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <ActionIcon color="brand" component={Link} to={`/profile/${item.username}`}>
                  <IconUser size={16} />
                </ActionIcon>
                <ActionIcon color="brand" component={Link} to={`/admin/users/${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => deleteUser(item)}>
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
