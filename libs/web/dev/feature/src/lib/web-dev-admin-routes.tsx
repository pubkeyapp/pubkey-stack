import { Code, Group } from '@mantine/core'
import { UiCard, UiContainer, UiInfo, UiTabRoutes } from '@pubkey-ui/core'

export default function WebDevAdminRoutes() {
  return (
    <UiContainer>
      <UiTabRoutes
        grow={false}
        tabs={[
          {
            value: 'new',
            label: 'New',
            component: (
              <UiCard title="New">
                <UiInfo
                  title="A place for your new stuff"
                  message={
                    <Group gap={0} align="baseline">
                      Open <Code mx={4}>libs/web/dev/feature/src/lib/web-dev-admin-routes.tsx</Code> to get started.
                    </Group>
                  }
                />
              </UiCard>
            ),
          },
        ]}
      />
    </UiContainer>
  )
}
