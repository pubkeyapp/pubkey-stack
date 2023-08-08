import { Button } from '@mantine/core'
import { IdentityProvider } from '@pubkey-stack/sdk'
import { IdentityUiIcon } from './identity-ui-icon'

export function IdentityUiDiscordLinkButton() {
  return (
    <Button
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? '#5865F2' : '#5865F2',
        '&:not([data-disabled]):hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.fn.lighten('#5865F2', 0.05) : theme.fn.darken('#5865F2', 0.05),
        },
      })}
      variant="filled"
      size="xl"
      fullWidth
      leftIcon={<IdentityUiIcon provider={IdentityProvider.Discord} />}
      component={'a'}
      href="/api/auth/discord"
    >
      Link Discord Account
    </Button>
  )
}
