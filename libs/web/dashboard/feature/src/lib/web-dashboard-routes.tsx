import { Button, Grid, Group, Text } from '@mantine/core'
import { useWebAuth } from '@pubkey-stack/web-auth-data-access'
import { useUserFindManyIdentity } from '@pubkey-stack/web-identity-data-access'
import {
  WebUiIdentityConnect,
  WebUiIdentityDiscordLinkButton,
  WebUiIdentityIdentityGroupList,
} from '@pubkey-stack/web-identity-ui'
import { UiDashboardContainer } from '@pubkey-stack/web-ui-core'
import { UiContainer, UiGroup, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'
import { WebUiUserProfile } from '@pubkey-stack/web-user-ui'

export default function WebDashboardRoutes() {
  const { user } = useWebAuth()
  const { expiredDiscord, grouped } = useUserFindManyIdentity()

  if (!user) return null

  return (
    <UiContainer h="100%">
      <Grid>
        <Grid.Col span={8}>
          <UiStack gap={64} pb={128}>
            {expiredDiscord ? (
              <UiDashboardContainer>
                <WebUiIdentityDiscordLinkButton />
              </UiDashboardContainer>
            ) : null}
            <UiStack>
              <UiGroup>
                <Text size="xl" fw={700}>
                  Linked Identities
                </Text>
                <Group></Group>
              </UiGroup>
              <WebUiIdentityIdentityGroupList grouped={grouped} />
              <WebUiIdentityConnect />
            </UiStack>
          </UiStack>
        </Grid.Col>
        <Grid.Col span={4}>
          <UiStack>
            <WebUiUserProfile
              user={user}
              action={
                <Group gap="xs">
                  <Button size="xs" variant="light" component={Link} to="/profile">
                    Your Profile
                  </Button>
                  <Button size="xs" variant="light" component={Link} to="/settings">
                    Settings
                  </Button>
                </Group>
              }
            />
          </UiStack>
        </Grid.Col>
      </Grid>
    </UiContainer>
  )
}
