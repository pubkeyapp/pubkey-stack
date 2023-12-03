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
        withTableBorder
        shadow="xs"
        columns={[
          {
            accessor: 'email',
            render: (item) => {
              return (
                <Group gap="sm" p={4}>
                  <Stack gap={1}>
                    <Text size="sm" fw={500}>
                      {item.email}
                    </Text>
                  </Stack>
                </Group>
              )
            },
          },
          {
            accessor: 'private',
            textAlign: 'center',
            render: (item) => (item.private ? 'Yes' : 'No'),
          },
          {
            accessor: 'default',
            textAlign: 'center',
            render: (item) => (item.default ? 'Yes' : 'No'),
          },
          {
            accessor: 'verified',
            textAlign: 'center',
            render: (item) => (item.verified ? 'Yes' : 'No'),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon variant="light" size="sm" color="brand" onClick={() => editEmail(item)}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon variant="light" size="sm" color="red" onClick={() => deleteEmail(item)}>
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
