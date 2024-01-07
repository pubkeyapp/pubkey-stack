import { Button, ButtonProps } from '@mantine/core'
import { IdentityProvider } from '@pubkey-stack/sdk'
import { WebUiIdentityIcon } from './web-ui-identity-icon'

export function WebUiIdentityDiscordLinkButton({ ...props }: ButtonProps) {
  return (
    <Button
      bg="#5865F2"
      variant="filled"
      size="xl"
      leftSection={<WebUiIdentityIcon provider={IdentityProvider.Discord} />}
      component={'a'}
      href="/api/auth/discord"
      {...props}
    >
      Link Discord Account
    </Button>
  )
}
