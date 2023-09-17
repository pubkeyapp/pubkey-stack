import { Button, createStyles } from '@mantine/core'
import { IdentityProvider } from '@pubkey-stack/sdk'
import { WebUiIdentityIcon } from './web-ui-identity-icon'

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colorScheme === 'dark' ? '#5865F2' : '#5865F2',
    '&:not([data-disabled]):hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.fn.lighten('#5865F2', 0.05) : theme.fn.darken('#5865F2', 0.05),
    },
  },
}))

export function WebUiIdentityDiscordLinkButton() {
  const { classes } = useStyles()
  return (
    <Button
      className={classes.button}
      variant="filled"
      size="xl"
      fullWidth
      leftIcon={<WebUiIdentityIcon provider={IdentityProvider.Discord} />}
      component={'a'}
      href="/api/auth/discord"
    >
      Link Discord Account
    </Button>
  )
}
