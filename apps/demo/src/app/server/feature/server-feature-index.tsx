import { Box, Flex, Grid, Group, ScrollArea, Text, useMantineTheme } from '@mantine/core'
import {
  UiAlert,
  UiBack,
  UiLoader,
  UiPageHeader,
  UiSidebar,
  UiSidebarLink,
  UiStack,
  useUiTheme,
} from '@pubkey-stack/web/ui/core'
import { IconPlus, IconServer } from '@tabler/icons-react'
import { ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useServerFindMany } from '../data-access'
import { ServerFeatureCreate } from './server-feature-create'
import { ServerFeatureDetail } from './server-feature-detail'

export function ServerFeatureIndex() {
  const query = useServerFindMany()
  if (query.isLoading) {
    return <UiLoader />
  }
  if (!query.data) {
    return <UiAlert message="No servers found" />
  }
  const items = query.data
  const baseLink = '/servers'
  return (
    <UiSplitScreen
      sidebar={
        <ScrollArea h="100%">
          <UiSidebarLink icon={IconPlus} label="Create" to={`${baseLink}/create`} />
          <UiSidebar
            links={items.map((item) => ({
              to: `${baseLink}/${item.id}`,
              color: item.color,
              label: item.name,
              icon: IconServer,
            }))}
          />
        </ScrollArea>
      }
    >
      <Routes>
        <Route
          index
          element={
            <Flex h="100%" align="center" justify="center">
              <Text size="xl">Select Server</Text>
            </Flex>
          }
        />
        <Route path="create" element={<ServerFeatureCreate />} />
        <Route path=":serverId/*" element={<ServerFeatureDetail />} />
      </Routes>
    </UiSplitScreen>
  )
}

export function UiSplitScreen({ sidebar, children }: { sidebar: ReactNode; children: ReactNode }) {
  const { maxXs } = useUiTheme()
  const theme = useMantineTheme()

  return (
    <Box h="100%" p={0}>
      <Grid gutter={0} h="100%">
        <Grid.Col
          span={maxXs ? 12 : 3}
          h={maxXs ? '25%' : '100%'}
          sx={{
            background: theme.colorScheme === 'dark' ? 'black' : theme.colors.gray[1],
          }}
        >
          {sidebar}
        </Grid.Col>
        <Grid.Col p={0} span={maxXs ? 12 : 9} h={maxXs ? '75%' : '100%'}>
          {children}
        </Grid.Col>
      </Grid>
    </Box>
  )
}
