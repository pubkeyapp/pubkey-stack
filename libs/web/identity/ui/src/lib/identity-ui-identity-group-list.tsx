import { Group, Text } from '@mantine/core'
import { Identity, IdentityProvider } from '@pubkey-stack/sdk'
import { UiStack } from '@pubkey-stack/web/ui/core'
import { IdentityUiIcon } from './identity-ui-icon'
import { IdentityUiIdentityList } from './identity-ui-identity-list'
import { IdentityUiSolanaLinkButton } from './identity-ui-solana-link-button'

export function IdentityUiIdentityGroupList({
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
          <Group mx="xl" position="apart">
            <Group>
              <IdentityUiIcon provider={group.provider} />
              <Text size="xl">{group.provider}</Text>
            </Group>
            {refresh && group.provider === IdentityProvider.Solana && (
              <IdentityUiSolanaLinkButton items={group.items ?? []} refresh={refresh} />
            )}
          </Group>
          {<IdentityUiIdentityList items={group.items} refresh={refresh} deleteIdentity={deleteIdentity} />}
        </UiStack>
      ))}
    </UiStack>
  )
}
