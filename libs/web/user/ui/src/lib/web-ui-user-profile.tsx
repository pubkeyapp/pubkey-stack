import { Group, Paper, PaperProps, Text, useMantineTheme } from '@mantine/core'
import { User } from '@pubkey-stack/sdk'

import { ReactNode } from 'react'
import { WebUiUserAvatar } from './web-ui-user-avatar'

export function WebUiUserProfile({
  action,
  user,
  ...props
}: PaperProps & {
  action?: ReactNode
  user?: User
}) {
  const theme = useMantineTheme()
  if (!user) return null
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      style={{
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      }}
      {...props}
    >
      <WebUiUserAvatar user={user} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {user.username}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {user.name}
      </Text>
      {action ? (
        <Group position="center" mt="sm">
          {action}
        </Group>
      ) : null}
    </Paper>
  )
}
