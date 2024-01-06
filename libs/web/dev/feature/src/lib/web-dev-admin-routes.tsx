import { UiContainer, UiTabRoutes } from '@pubkey-ui/core'
import { WebDevNew } from './web-dev-new'
import { WebDevIdentityWizard } from './web-dev-identity-wizard'

export default function WebDevAdminRoutes() {
  return (
    <UiContainer>
      <UiTabRoutes
        grow={false}
        tabs={[
          { value: 'new', label: 'New', component: <WebDevNew /> },
          { value: 'identity-wizard', label: 'Identity Wizard', component: <WebDevIdentityWizard /> },
        ]}
      />
    </UiContainer>
  )
}
