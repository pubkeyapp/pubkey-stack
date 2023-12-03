import { ActionIcon, Badge, Code, Group, Menu, Text } from '@mantine/core'
import { ellipsify, Identity, IdentityProvider } from '@pubkey-stack/sdk'
import { UiExplorerIcon } from '@pubkey-stack/web-ui-core'
import { UiCard, UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { IconCheck, IconDotsVertical, IconTrash } from '@tabler/icons-react'
import { WebUiIdentityAvatar } from './web-ui-identity-avatar'
import { WebUiIdentitySolanaVerifyButton } from './web-ui-identity-solana-verify-button'

export function WebUiIdentityIdentityList({
  deleteIdentity,
  refresh,
  items,
}: {
  refresh?: () => void
  deleteIdentity?: (id: string) => void
  items: Identity[]
}) {
  return (
    <UiStack>
      {items?.map((item) => (
        <UiCard key={item.id}>
          <Group justify="space-between">
            <Group>
              <WebUiIdentityAvatar item={item} />
              <UiGroup>
                {item.profile?.username ? (
                  <Text size="xl">{item.profile?.username}</Text>
                ) : (
                  <Code>{ellipsify(item.providerId)}</Code>
                )}
                {item.verified ? (
                  <Badge
                    leftSection={
                      <Text display="flex">
                        <IconCheck size={16} />
                      </Text>
                    }
                  >
                    Verified
                  </Badge>
                ) : refresh ? (
                  <WebUiIdentitySolanaVerifyButton identity={item} refresh={refresh} />
                ) : (
                  <Badge variant="light" color="yellow">
                    Not verified
                  </Badge>
                )}
              </UiGroup>
            </Group>
            <Group gap="xs">
              <UiDebugModal data={item} />
              {item.provider === IdentityProvider.Solana && <UiExplorerIcon path={`address/${item.providerId}`} />}
              {deleteIdentity && (
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon variant="light" size="sm">
                      <IconDotsVertical size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item
                      color="red"
                      leftSection={<IconTrash size={14} />}
                      onClick={() => deleteIdentity(item.id)}
                    >
                      Remove this identity
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>
          </Group>
        </UiCard>
      ))}
    </UiStack>
  )
}
