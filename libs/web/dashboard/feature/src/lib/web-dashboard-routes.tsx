import { Button, Group, Text } from '@mantine/core'
import { useWebAuth } from '@pubkey-stack/web-auth-data-access'
import { useUserFindManyIdentity } from '@pubkey-stack/web-identity-data-access'
import {
  WebUiIdentityConnect,
  WebUiIdentityDiscordLinkButton,
  WebUiIdentityIdentityGroupList,
} from '@pubkey-stack/web-identity-ui'
import { UiContainer, UiDashboardContainer, UiGroup, UiStack } from '@pubkey-stack/web-ui-core'
import { Link } from 'react-router-dom'

export default function WebDashboardRoutes() {
  const { user } = useWebAuth()
  const { expiredDiscord, hasDiscord, hasSolana, grouped } = useUserFindManyIdentity()

  const connectIdentities = !hasDiscord || !hasSolana

  if (!user) return null

  return (
    <UiContainer h="100%">
      {connectIdentities ? (
        <WebUiIdentityConnect />
      ) : expiredDiscord ? (
        <UiDashboardContainer>
          <WebUiIdentityDiscordLinkButton />
        </UiDashboardContainer>
      ) : (
        <UiStack spacing={64} pb={128}>
          <UiStack>
            <UiGroup>
              <Text size="xl" weight={700}>
                Linked Identities
              </Text>
              <Group>
                <Button component={Link} to="/settings/identities" size="sm">
                  Manage Identities
                </Button>
              </Group>
            </UiGroup>
            <WebUiIdentityIdentityGroupList grouped={grouped} />
          </UiStack>
        </UiStack>
      )}
    </UiContainer>
  )
}
