import { Box, Group, Paper, Text, UnstyledButton, useMantineTheme } from '@mantine/core'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import React, { ReactNode, useState } from 'react'

export function UiDebug({ data, hideButton, open }: { data: string | unknown; open?: boolean; hideButton?: boolean }) {
  const theme = useMantineTheme()
  const [show, setShow] = useState(open)
  const content: ReactNode = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
  return (
    <Box>
      <Paper
        component="pre"
        fz="xs"
        m={0}
        p={theme.spacing.xs}
        style={{ overflow: 'auto', textOverflow: 'ellipsis', maxWidth: '100%' }}
        withBorder
      >
        {hideButton ? null : (
          <UnstyledButton onClick={() => setShow(!show)}>
            <Group p="xs" spacing="xs">
              {show ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              <Text size="xs">{show ? 'Hide' : 'Show'} debug data</Text>
            </Group>
          </UnstyledButton>
        )}
        <Box display={show ? 'block' : 'none'}>{content}</Box>
      </Paper>
    </Box>
  )
}
