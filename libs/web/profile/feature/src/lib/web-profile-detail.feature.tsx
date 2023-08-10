import { Alert, Button } from '@mantine/core'
import { useWebAuth } from '@pubkey-stack/web/auth/data-access'
import { WebProfileUiUser } from '@pubkey-stack/web/profile/ui'
import { UiContainer, UiLoader, UiStack, UiWarn } from '@pubkey-stack/web/ui/core'
import { useUserFineOneUser } from '@pubkey-stack/web/user/data-access'
import { IconMoodSmile } from '@tabler/icons-react'
import { Link, useParams } from 'react-router-dom'

export function WebProfileDetailFeature() {
  const { user: authUser } = useWebAuth()
  const { username } = useParams<{ username: string }>() as { username: string }
  const { user, query } = useUserFineOneUser(username)

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarn message="User not found" />
  }

  const isAuthUser = authUser?.id === user.id

  return (
    <UiContainer size="xs">
      <UiStack>
        <WebProfileUiUser
          user={user}
          action={
            isAuthUser ? (
              <Button size="xs" variant="light" component={Link} to={`/settings`}>
                Edit profile
              </Button>
            ) : null
          }
        />
        <Alert icon={<IconMoodSmile size="2rem" />} title="Hello there!" color="brand" variant="outline">
          It's quite empty here. At some point you'll be able to see the content of this user. Or maybe not.
        </Alert>
      </UiStack>
    </UiContainer>
  )
}
