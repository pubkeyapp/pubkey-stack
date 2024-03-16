import { UiContainer, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { DevIdentityWizard } from './dev-identity-wizard'
import { DevNew } from './dev-new'
import { DevUserAutocomplete } from './dev-user-autocomplete'

export default function DevAdminRoutes() {
  const tabs: UiTabRoute[] = [
    { path: 'new', label: 'New', element: <DevNew /> },
    { path: 'identity-wizard', label: 'Identity Wizard', element: <DevIdentityWizard /> },
    { path: 'user-autocomplete', label: 'User Autocomplete', element: <DevUserAutocomplete /> },
  ]
  return (
    <UiContainer>
      <UiTabRoutes tabs={tabs} />
    </UiContainer>
  )
}
