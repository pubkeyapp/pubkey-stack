import { Button, Group, Stack, Title } from '@mantine/core'
import { PubKeyLogoRounded } from '@pubkeyapp/logo'
import { RegisterInput } from '@pubkey-stack/sdk'
import { useWebAuth } from '@pubkey-stack/web/auth/data-access'
import { AuthUiRegisterForm } from '@pubkey-stack/web/auth/ui'
import { UiCard, UiFull, UiLoader, UiStack } from '@pubkey-stack/web/ui/core'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function WebAuthRegisterFeature() {
  const { register, user, appConfig, appConfigLoading } = useWebAuth()

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  function registerHandler(input: RegisterInput) {
    setLoading(true)
    return register(input).then((res) => {
      if (res) {
        navigate('/dashboard')
      }
      setLoading(false)
      return !!res
    })
  }

  if (appConfigLoading || !appConfig) {
    return <UiLoader />
  }

  const { authPasswordEnabled, authRegisterEnabled } = appConfig

  if (!authRegisterEnabled && !authPasswordEnabled) {
    return (
      <UiFull>
        <UiStack spacing="xl">
          <Group position="center">
            <PubKeyLogoRounded size={48} />
            <Title>PubKey</Title>
          </Group>
          <Group position="center">
            <Title>Registration is disabled</Title>
          </Group>
        </UiStack>
      </UiFull>
    )
  }

  return (
    <UiFull>
      <UiCard miw={400} p="lg">
        <Stack>
          <Group position="center">
            <Title>Register</Title>
          </Group>
          {authRegisterEnabled ? (
            <AuthUiRegisterForm submit={registerHandler}>
              <Group position="apart">
                <Button loading={loading} type="submit">
                  Register
                </Button>
                <Button disabled={loading} component={Link} to="/login" variant="default">
                  Login
                </Button>
              </Group>
            </AuthUiRegisterForm>
          ) : authPasswordEnabled ? (
            <Button disabled={loading} component={Link} to="/login" variant="default">
              Login
            </Button>
          ) : null}
        </Stack>
      </UiCard>
    </UiFull>
  )
}
