import { Group, Text } from '@mantine/core'
import { UiCard, UiInfo, UiStack, UiTabRoutes } from '@pubkey-stack/web-ui-core'

export function WebDevUiTabRoutes() {
  return (
    <UiCard title="UiTabRoutes">
      <UiStack>
        <UiInfo
          message={
            <UiStack spacing={0}>
              <Text>With this component you can create tabbed routes.</Text>
              <Text>
                The tabs will be rendered as links, so you can link to them and the correct tab will be active.
              </Text>
            </UiStack>
          }
        />
        <UiTabRoutes
          tabs={[
            { label: 'Tab 1', value: 'tab-1', component: <Group>This is Tab 1</Group> },
            { label: 'Tab 2', value: 'tab-2', component: <Group>This is Tab 2</Group> },
            { label: 'Tab 3', value: 'tab-3', component: <Group>This is Tab 3</Group> },
            {
              label: 'Nested Tabs',
              value: 'nested-tabs',
              component: (
                <UiStack>
                  <UiInfo
                    message={
                      <UiStack spacing={0}>
                        <Text>You can nest tabs inside tabs, etc.</Text>
                        <Text>Active tabs will be correct as long as all the 'value's are unique.</Text>
                      </UiStack>
                    }
                  />
                  <UiTabRoutes
                    tabs={[
                      { label: 'Nested Tab 1', value: 'nested-tab-1', component: <Group>This is Nested Tab 1</Group> },
                      { label: 'Nested Tab 2', value: 'nested-tab-2', component: <Group>This is Nested Tab 2</Group> },
                      { label: 'Nested Tab 3', value: 'nested-tab-3', component: <Group>This is Nested Tab 3</Group> },
                    ]}
                  />
                </UiStack>
              ),
            },
          ]}
        />
      </UiStack>
    </UiCard>
  )
}
