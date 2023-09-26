import { UiAlert, UiCard, UiError, UiInfo, UiStack, UiSuccess, UiWarn } from '@pubkey-stack/web-ui-core'

export function WebDevUiAlert() {
  return (
    <UiCard title="UiAlert">
      <UiStack>
        <UiAlert message={'This is the UiAlert component'} />
        <UiError message={'This is the UiError component'} title="Error" />
        <UiInfo message={'This is the UiInfo component'} title="Info" />
        <UiSuccess message={'This is the UiSuccess component'} title="Success" />
        <UiWarn message={'This is the UiWarn component'} title="Warning" />
      </UiStack>
    </UiCard>
  )
}
