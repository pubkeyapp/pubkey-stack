import { UiAlert, UiContainer, UiTabRoutes } from '@pubkey-stack/web/ui/core'

export default function WebDevAdminRoutes() {
  return (
    <UiContainer>
      <UiTabRoutes
        tabs={[
          { value: 'tab-1', label: 'Tab 1', component: <UiAlert message={'This is Tab 1'} /> },
          { value: 'tab-2', label: 'Tab 2', component: <UiAlert message={'This is Tab 2'} /> },
        ]}
      />
    </UiContainer>
  )
}
