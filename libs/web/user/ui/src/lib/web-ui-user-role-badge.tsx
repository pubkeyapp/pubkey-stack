import { Badge, useMantineTheme } from '@mantine/core'
import { UserRole } from '@pubkey-stack/sdk'

export const USER_ROLE_COLORS: Record<UserRole, string> = {
  [UserRole.Admin]: 'pink',
  [UserRole.User]: 'blue',
}

export function WebUiUserRoleBadge({ role }: { role: UserRole }) {
  const theme = useMantineTheme()
  return (
    <Badge color={USER_ROLE_COLORS[role]} variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>
      {role}
    </Badge>
  )
}
