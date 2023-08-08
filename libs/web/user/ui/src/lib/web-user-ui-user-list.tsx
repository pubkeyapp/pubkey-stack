import { User } from '@pubkey-stack/sdk'
import { UiGroup, UiStack } from '@pubkey-stack/web/ui/core'
import { WebUserUiUser } from './web-user-ui-user'

export function WebUserUiUserList({ users = [], title }: { users?: User[]; title?: string }) {
  return (
    <UiStack>
      {users?.map((user) => (
        <UiGroup key={user.id}>
          <WebUserUiUser user={user} />
        </UiGroup>
      ))}
    </UiStack>
  )
}
