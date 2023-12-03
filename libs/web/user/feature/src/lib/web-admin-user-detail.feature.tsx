import { Group } from '@mantine/core'
import { useAdminFindOneUser } from '@pubkey-stack/web-user-data-access'
import { WebUiUserAvatar } from '@pubkey-stack/web-user-ui'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiStack, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { WebAdminUserDetailEmailsTab } from './web-admin-user-detail-emails.tab'
import { WebAdminUserDetailIdentitiesTab } from './web-admin-user-detail-identities.tab'
import { WebAdminUserDetailSettingsTab } from './web-admin-user-detail-settings.tab'

export function WebAdminUserDetailFeature() {
  const { userId } = useParams<{ userId: string }>() as { userId: string }
  const { query, item } = useAdminFindOneUser({ userId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="User not found" />
  }

  return (
    <UiPage
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />{' '}
        </Group>
      }
      title={
        <Group gap="xs">
          <WebUiUserAvatar size="sm" user={item} /> {item.username}
        </Group>
      }
    >
      <UiStack>
        <UiTabRoutes
          tabs={[
            {
              value: 'settings',
              label: 'Settings',
              component: <WebAdminUserDetailSettingsTab userId={userId} />,
            },
            {
              value: 'emails',
              label: 'Emails',
              component: <WebAdminUserDetailEmailsTab userId={userId} />,
            },
            {
              value: 'identities',
              label: 'Identities',
              component: <WebAdminUserDetailIdentitiesTab userId={userId} />,
            },
          ]}
        />
      </UiStack>
    </UiPage>
  )
}
