import { Code, Group } from '@mantine/core'
import { UiCard, UiContainer, UiInfo, UiTabRoutes } from '@pubkey-stack/web-ui-core'
import { WebDevUi } from './ui/web-dev-ui'

export default function WebDevAdminRoutes() {
  return (
    <UiContainer>
      <UiTabRoutes
        grow={false}
        tabs={[
          { value: 'ui', label: 'UI', component: <WebDevUi /> },
          {
            value: 'new',
            label: 'New',
            component: (
              <UiCard title="New">
                <UiInfo
                  title="A place for your new stuff"
                  message={
                    <Group spacing={0} align="baseline">
                      Open{' '}
                      <Code mx={4} color="brand">
                        libs/web/dev/feature/src/lib/web-dev-admin-routes.tsx
                      </Code>{' '}
                      to get started.
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
