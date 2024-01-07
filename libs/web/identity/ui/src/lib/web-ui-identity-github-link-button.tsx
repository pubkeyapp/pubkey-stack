import { Button, ButtonProps } from '@mantine/core'
import { WebUiIdentityIcon } from './web-ui-identity-icon'
import { IdentityProvider } from '@pubkey-stack/sdk'

export function WebUiIdentityGithubLinkButton({ ...props }: ButtonProps) {
  return (
    <Button
      bg="#333333"
      variant="filled"
      size="xl"
      leftSection={<WebUiIdentityIcon provider={IdentityProvider.GitHub} />}
      component={'a'}
      href="/api/auth/github"
      {...props}
    >
      Link GitHub Account
    </Button>
  )
}
