import { Stack, StackProps } from '@mantine/core'
import { IdentityProvider } from '@pubkey-stack/sdk'
import { IdentityUiLoginButton } from './identity-ui-login-button'

export function IdentityUiLoginButtons({
  enabledProviders,
  refresh,
  ...props
}: StackProps & { enabledProviders: IdentityProvider[]; refresh: () => void }) {
  return (
    <Stack {...props}>
      {enabledProviders.map((provider) => (
        <IdentityUiLoginButton key={provider} provider={provider} refresh={refresh} />
      ))}
    </Stack>
  )
}
