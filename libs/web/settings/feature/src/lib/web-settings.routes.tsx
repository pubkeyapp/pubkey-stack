import { Button } from '@mantine/core'
import { UiCard, UiContainer, UiLoader, UiStack, UiTabRoutes, UiWarn } from '@pubkey-stack/web/ui/core'
import { useUserProfile } from '@pubkey-stack/web/user/data-access'
import { WebUiUserProfile, WebUiUserUpdateForm } from '@pubkey-stack/web/user/ui'
import { Link } from 'react-router-dom'
import { WebSettingsIdentityList } from './web-settings-identity-list'

export default function WebSettingsRoutes() {
  const { updateUser, user, query } = useUserProfile()

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarn message="User not found" />
  }

  return (
    <UiContainer size="xs">
      <UiStack>
        <WebUiUserProfile
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
                  <WebUiUserUpdateForm user={user} submit={updateUser} />
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
