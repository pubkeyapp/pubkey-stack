import { Button } from '@mantine/core'
import { IdentityProvider } from '@pubkey-stack/sdk'
import { WebUiIdentityIcon } from './web-ui-identity-icon'

export function WebUiIdentityDiscordLinkButton() {
  return (
    <Button
      className={'classes.button'}
      bg="#5865F2"
      variant="filled"
      size="xl"
      fullWidth
      leftSection={<WebUiIdentityIcon provider={IdentityProvider.Discord} />}
      component={'a'}
      href="/api/auth/discord"
    >
      Link Discord Account
    </Button>
  )
}
