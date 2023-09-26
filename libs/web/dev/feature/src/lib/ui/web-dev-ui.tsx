import { UiStack, UiTabRoutes } from '@pubkey-stack/web-ui-core'
import { WebDevUiActionIcon } from './web-dev-ui-action-icon'
import { WebDevUiAlert } from './web-dev-ui-alert'
import { WebDevUiForm } from './web-dev-ui-form'
import { WebDevUiLoader } from './web-dev-ui-loader'
import { WebDevUiNotifications } from './web-dev-ui-notifications'
import { WebDevUiTabRoutes } from './web-dev-ui-tab-routes'

export function WebDevUi() {
  return (
    <UiStack>
      <UiTabRoutes
        tabs={[
          { value: 'action-icon', label: 'UiActionIcon', component: <WebDevUiActionIcon /> },
          { value: 'alert', label: 'UiAlert', component: <WebDevUiAlert /> },
          { value: 'loader', label: 'UiLoader', component: <WebDevUiLoader /> },
          { value: 'form', label: 'UiForm', component: <WebDevUiForm /> },
          { value: 'notifications', label: 'UiNotifications', component: <WebDevUiNotifications /> },
          { value: 'tab-routes', label: 'UiTabRoutes', component: <WebDevUiTabRoutes /> },
        ]}
      />
    </UiStack>
  )
}
