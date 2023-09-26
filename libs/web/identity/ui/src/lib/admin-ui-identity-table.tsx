import { ActionIcon, Anchor, Group, ScrollArea, Stack, Text } from '@mantine/core'
import { ellipsify, Identity } from '@pubkey-stack/sdk'
import { UiCopy, UiDebugModal } from '@pubkey-stack/web-ui-core'
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
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'identity',
            render: (item) => {
              return (
                <Group spacing="sm" p={4}>
                  <WebUiIdentityIcon provider={item.provider} />
                  <Stack spacing={1}>
                    <Anchor size="lg" weight={500} component="a" href={item.url ?? ''} target="_blank" rel="noreferrer">
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
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <UiDebugModal data={item} />
                <UiCopy
                  styles={{ tooltip: { position: 'right' } }}
                  text={item.providerId}
                  tooltip="Copy the providerId"
                />
                <ActionIcon color="red" onClick={() => deleteIdentity(item)}>
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
