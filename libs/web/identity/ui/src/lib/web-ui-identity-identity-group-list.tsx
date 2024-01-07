import { Group, Text } from '@mantine/core'
import { Identity, IdentityProvider } from '@pubkey-stack/sdk'
import { UiStack } from '@pubkey-ui/core'
import { WebUiIdentityIcon } from './web-ui-identity-icon'
import { WebUiIdentityIdentityList } from './web-ui-identity-identity-list'
import { WebUiIdentitySolanaLinkButton } from './web-ui-identity-solana-link-button'

export function WebUiIdentityIdentityGroupList({
  deleteIdentity,
  refresh,
  grouped,
}: {
  deleteIdentity?: (id: string) => void
  refresh?: () => void
  grouped: { provider: IdentityProvider; items: Identity[] }[]
}) {
  return (
    <UiStack>
      {grouped.map((group) => (
        <UiStack key={group.provider}>
          <Group justify="space-between">
            <Group pl="lg">
              <WebUiIdentityIcon provider={group.provider} />
              <Text size="xl">{group.provider}</Text>
            </Group>
            {refresh && group.provider === IdentityProvider.Solana && (
              <WebUiIdentitySolanaLinkButton size="sm" identities={group.items ?? []} refresh={refresh} />
            )}
          </Group>
          {<WebUiIdentityIdentityList items={group.items} refresh={refresh} deleteIdentity={deleteIdentity} />}
        </UiStack>
      ))}
    </UiStack>
  )
}
