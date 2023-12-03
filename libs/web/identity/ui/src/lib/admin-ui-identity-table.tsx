import { ActionIcon, Anchor, Group, ScrollArea, Stack, Text } from '@mantine/core'
import { ellipsify, Identity } from '@pubkey-stack/sdk'
import { UiCopy, UiDebugModal } from '@pubkey-ui/core'
import { IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { WebUiIdentityIcon } from './web-ui-identity-icon'

interface AdminIdentityTableProps {
  identities: Identity[]
  deleteIdentity: (identity: Identity) => void
}

export function AdminUiIdentityTable({ deleteIdentity, identities = [] }: AdminIdentityTableProps) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        columns={[
          {
            accessor: 'identity',
            render: (item) => {
              return (
                <Group gap="sm" p={4}>
                  <WebUiIdentityIcon provider={item.provider} />
                  <Stack gap={1}>
                    <Anchor size="lg" fw={500} component="a" href={item.url ?? ''} target="_blank" rel="noreferrer">
                      {ellipsify(item.name ?? item.providerId)}
                    </Anchor>
                    <Text size="sm" color="dimmed">
                      {item.provider}
                    </Text>
                  </Stack>
                </Group>
              )
            },
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <UiDebugModal data={item} />
                <UiCopy text={item.providerId} tooltip="Copy the providerId" />
                <ActionIcon variant="light" size="sm" color="red" onClick={() => deleteIdentity(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={identities}
      />
    </ScrollArea>
  )
}
