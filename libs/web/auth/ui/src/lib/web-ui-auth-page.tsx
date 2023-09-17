import { Box, Group } from '@mantine/core'
import { UiFull, UiLogoMark, UiStack } from '@pubkey-stack/web/ui/core'
import { ReactNode } from 'react'

export function WebUiAuthPage({ children }: { children: ReactNode }) {
  return (
    <UiFull>
      <Box miw={400} p="lg">
        <UiStack spacing={48}>
          <Group position="center">
            <UiLogoMark size={48} />
          </Group>
          {children}
        </UiStack>
      </Box>
    </UiFull>
  )
}
