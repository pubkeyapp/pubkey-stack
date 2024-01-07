import { Button, Group, Title } from '@mantine/core'
import { LoginInput } from '@pubkey-stack/sdk'
import { useWebAuth } from '@pubkey-stack/web-auth-data-access'
import { WebUiAuthLoginForm, WebUiAuthPage } from '@pubkey-stack/web-auth-ui'
import { WebUiUserAvatar } from '@pubkey-stack/web-user-ui'
import { UiLoader, UiStack } from '@pubkey-ui/core'
import { IconBrandDiscord, IconBrandGithub } from '@tabler/icons-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { WebUiIdentitySolanaLoginButton } from '@pubkey-stack/web-identity-ui'

export default function WebAuthLoginFeature() {
  const { login, refresh, user, appConfig, appConfigLoading } = useWebAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  const redirect = location.state?.from?.pathname || '/dashboard'
  async function loginHandler(input: LoginInput) {
    setLoading(true)

    return login(input).then((res) => {
      if (res) {
        navigate(redirect)
      }
      setLoading(false)
      return !!res
    })
  }

  if (appConfigLoading || !appConfig) {
    return <UiLoader />
  }

  const { authDiscordEnabled, authGithubEnabled, authPasswordEnabled, authRegisterEnabled, authSolanaEnabled } =
    appConfig

  const noAuthEnabled =
    !authDiscordEnabled && !authGithubEnabled && !authRegisterEnabled && !authPasswordEnabled && !authSolanaEnabled

  return (
    <WebUiAuthPage>
      {noAuthEnabled ? (
        <Group justify="center">
          <Title>Login is disabled</Title>
        </Group>
      ) : (
        <UiStack>
          {user && (
            <Button
              radius="md"
              size="xl"
              disabled={loading}
              fullWidth
              onClick={() => navigate(redirect)}
              leftSection={<WebUiUserAvatar user={user} size={28} />}
            >
              Continue as {user.username}
            </Button>
          )}
          {authDiscordEnabled ? (
            <Button
              radius="md"
              size="xl"
              component="a"
              href="/api/auth/discord"
              variant="light"
              leftSection={<IconBrandDiscord size={28} />}
            >
              Sign in with Discord
            </Button>
          ) : null}
          {authGithubEnabled ? (
            <Button
              radius="md"
              size="xl"
              component="a"
              href="/api/auth/github"
              variant="light"
              leftSection={<IconBrandGithub size={28} />}
            >
              Sign in with GitHub
            </Button>
          ) : null}
          {authSolanaEnabled ? (
            <WebUiIdentitySolanaLoginButton
              refresh={() => {
                refresh().then((res) => {
                  if (res) {
                    navigate(redirect)
                  }
                })
              }}
            />
          ) : null}
          {authPasswordEnabled ? (
            <WebUiAuthLoginForm submit={loginHandler}>
              <Group justify="space-between">
                <Button loading={loading} type="submit">
                  Login
                </Button>
                {authRegisterEnabled ? (
                  <Button disabled={loading} component={Link} to="/register" variant="default">
                    Register
                  </Button>
                ) : null}
              </Group>
            </WebUiAuthLoginForm>
          ) : null}
        </UiStack>
      )}
    </WebUiAuthPage>
  )
}
