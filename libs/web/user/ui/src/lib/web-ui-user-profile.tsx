import { Group, Paper, PaperProps, Text, useMantineTheme } from '@mantine/core'
import { User } from '@pubkey-stack/sdk'
import { useUiColorScheme } from '@pubkey-ui/core'

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
  const { colorScheme } = useUiColorScheme()
  const theme = useMantineTheme()
  if (!user) return null
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      style={{
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      }}
      {...props}
    >
      <WebUiUserAvatar user={user} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {user.username}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {user.name}
      </Text>
      {action ? (
        <Group justify="center" mt="sm">
          {action}
        </Group>
      ) : null}
    </Paper>
  )
}
