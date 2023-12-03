import { Box, Group } from '@mantine/core'
import { UiFull } from '@pubkey-stack/web-ui-core'
import { UiLogoType, UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function WebUiAuthPage({ children }: { children: ReactNode }) {
  return (
    <UiFull>
      <Box miw={400} p="lg">
        <UiStack gap={48}>
          <Group justify="center">
            <UiLogoType height={48} />
          </Group>
          {children}
        </UiStack>
      </Box>
    </UiFull>
  )
}
