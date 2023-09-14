import { Box, Flex, Group, Text } from '@mantine/core'
import { UiBack, UiPageHeader, UiStack } from '@pubkey-stack/web/ui/core'

export function ServerFeatureCreate() {
  return (
    <Box sx={{ height: '100%' }}>
      <UiStack spacing="xl" h="100%">
        <UiPageHeader
          withBorder={false}
          title={
            <Group>
              <UiBack />
              Create Server
            </Group>
          }
        />
        <Flex h="100%" align="center" justify="center">
          <Text size="xl">Create Server</Text>
        </Flex>
      </UiStack>
    </Box>
  )
}
