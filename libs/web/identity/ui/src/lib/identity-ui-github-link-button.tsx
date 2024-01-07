import { Button, ButtonProps } from '@mantine/core'
import { IdentityProvider } from '@pubkey-stack/sdk'
import { IdentityUiIcon } from './identity-ui-icon'

export function IdentityUiGithubLinkButton({ ...props }: ButtonProps) {
  return (
    <Button
      bg="#333333"
      variant="filled"
      size="xl"
      leftSection={<IdentityUiIcon provider={IdentityProvider.GitHub} />}
      component={'a'}
      href="/api/auth/github"
      {...props}
    >
      Link GitHub Account
    </Button>
  )
}
