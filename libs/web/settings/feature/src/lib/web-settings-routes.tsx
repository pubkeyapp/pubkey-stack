import { Button } from '@mantine/core'
import { WebProfileUiUser } from '@pubkey-stack/web/profile/ui'
import { useUserSettings } from '@pubkey-stack/web/settings/data-access'
import { WebSettingsUiProfileForm } from '@pubkey-stack/web/settings/ui'
import { UiCard, UiContainer, UiLoader, UiStack, UiTabRoutes, UiWarn } from '@pubkey-stack/web/ui/core'
import { Link } from 'react-router-dom'
import { WebSettingsIdentityList } from './web-settings-identity-list'

export default function WebSettingsRoutes() {
  const { updateUser, user, query } = useUserSettings()

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarn message="User not found" />
  }

  return (
    <UiContainer size="xs">
      <UiStack>
        <WebProfileUiUser
          user={user}
          action={
            <Button size="xs" variant="light" component={Link} to={`/profile`}>
              View profile
            </Button>
          }
        />
        <UiTabRoutes
          tabs={[
            {
              label: 'Edit Profile',
              value: 'profile',
              component: (
                <UiCard>
                  <WebSettingsUiProfileForm user={user} submit={updateUser} />
                </UiCard>
              ),
            },
            {
              label: 'Manage Identities',
              value: 'identities',
              component: <WebSettingsIdentityList />,
            },
          ]}
        />
      </UiStack>
    </UiContainer>
  )
}
