import { Box, Group, Title } from '@mantine/core'
import { ReactNode } from 'react'
import { UiContainer } from './ui-container'
import { UiGroup } from './ui-group'
import { UiStack } from './ui-stack'

export function UiAdminPage({
  children,
  leftAction,
  rightAction,
  title,
}: {
  children: ReactNode
  leftAction?: ReactNode
  rightAction?: ReactNode
  title?: ReactNode
}) {
  return (
    <UiContainer>
      <UiStack>
        <Box>
          <UiGroup>
            <Group>
              {leftAction ? leftAction : null}
              <Title order={2}>{title ?? ''}</Title>
            </Group>
            {rightAction ? <Group>{rightAction}</Group> : null}
          </UiGroup>
        </Box>
        <UiStack my="xs" spacing="xl">
          {children}
        </UiStack>
      </UiStack>
    </UiContainer>
  )
}
