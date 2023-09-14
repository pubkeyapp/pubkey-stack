import { Box, Flex, Group, ScrollArea } from '@mantine/core'
import { UiAlert, UiBack, UiDebug, UiLoader, UiPageHeader, UiStack } from '@pubkey-stack/web/ui/core'
import { useParams } from 'react-router-dom'
import { useServerFindOne } from '../data-access'

export function ServerFeatureDetail() {
  const { serverId } = useParams() as { serverId: string }
  const query = useServerFindOne({ serverId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!query.data) {
    return <UiAlert message={`Servers ${serverId} not found`} />
  }
  const item = query.data
  return (
    <Flex
      direction="column"
      h="100%"
      justify="space-between"
      sx={{
        // border: '1px solid red',
        overflow: 'auto',
      }}
    >
      <Box sx={{ flexGrow: 0 }}>
        <UiPageHeader
          withBorder={false}
          title={
            <Group>
              <UiBack />
              {item.name}
            </Group>
          }
        />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: 'inherit' }} pt="md" px="md">
        <ScrollArea h="100%">
          <UiStack>
            <UiDebug data={item} open />
            <UiDebug data={item} open />
            <UiDebug data={item} open />
            <UiDebug data={item} open />
            <UiDebug data={item} open />
            <UiDebug data={item} open />
            <UiDebug data={item} open />
            <UiDebug data={item} open />
          </UiStack>
        </ScrollArea>
      </Box>
    </Flex>
  )
}
