import { ActionIcon, Group, ScrollArea, Stack, Text } from '@mantine/core'
import { Email } from '@pubkey-stack/sdk'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'

interface AdminEmailTableProps {
  emails: Email[]
  editEmail: (email: Email) => void
  deleteEmail: (email: Email) => void
}

export function AdminUiEmailTable({ editEmail, deleteEmail, emails = [] }: AdminEmailTableProps) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'email',
            render: (item) => {
              return (
                <Group spacing="sm" p={4}>
                  <Stack spacing={1}>
                    <Text size="sm" weight={500}>
                      {item.email}
                    </Text>
                  </Stack>
                </Group>
              )
            },
          },
          {
            accessor: 'private',
            textAlignment: 'center',
            render: (item) => <Text>{item.private ? 'Yes' : 'No'}</Text>,
          },
          {
            accessor: 'default',
            textAlignment: 'center',
            render: (item) => <Text>{item.default ? 'Yes' : 'No'}</Text>,
          },
          {
            accessor: 'verified',
            textAlignment: 'center',
            render: (item) => <Text>{item.verified ? 'Yes' : 'No'}</Text>,
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <ActionIcon color="brand" onClick={() => editEmail(item)}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => deleteEmail(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={emails}
      />
    </ScrollArea>
  )
}
