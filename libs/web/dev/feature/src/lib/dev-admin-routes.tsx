import { UiContainer, UiTabRoutes } from '@pubkey-ui/core'
import { DevIdentityWizard } from './dev-identity-wizard'
import { DevNew } from './dev-new'

export default function DevAdminRoutes() {
  return (
    <UiContainer>
      <UiTabRoutes
        grow={false}
        tabs={[
          { path: 'new', label: 'New', element: <DevNew /> },
          { path: 'identity-wizard', label: 'Identity Wizard', element: <DevIdentityWizard /> },
        ]}
      />
    </UiContainer>
  )
}
