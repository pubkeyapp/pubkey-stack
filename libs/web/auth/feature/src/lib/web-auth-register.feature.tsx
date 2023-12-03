import { Button, Group, Title } from '@mantine/core'
import { RegisterInput } from '@pubkey-stack/sdk'
import { useWebAuth } from '@pubkey-stack/web-auth-data-access'
import { WebUiAuthPage, WebUiAuthRegisterForm } from '@pubkey-stack/web-auth-ui'
import { UiLoader } from '@pubkey-ui/core'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function WebAuthRegisterFeature() {
  const { register, appConfig, appConfigLoading } = useWebAuth()

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function registerHandler(input: RegisterInput) {
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
  const noAuthEnabled = !authRegisterEnabled && !authPasswordEnabled

  return (
    <WebUiAuthPage>
      {noAuthEnabled ? (
        <Group justify="center">
          <Title>Registration is disabled</Title>
        </Group>
      ) : authRegisterEnabled ? (
        <WebUiAuthRegisterForm submit={registerHandler}>
          <Group justify="space-between">
            <Button loading={loading} type="submit">
              Register
            </Button>
            <Button disabled={loading} component={Link} to="/login" variant="default">
              Login
            </Button>
          </Group>
        </WebUiAuthRegisterForm>
      ) : authPasswordEnabled ? (
        <Button disabled={loading} component={Link} to="/login" variant="default">
          Login
        </Button>
      ) : null}
    </WebUiAuthPage>
  )
}
