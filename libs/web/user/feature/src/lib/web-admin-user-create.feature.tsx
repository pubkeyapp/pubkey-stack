import { Button, Group } from '@mantine/core'
import { AdminCreateUserInput } from '@pubkey-stack/sdk'
import { UiBack, UiAdminPage, UiCard } from '@pubkey-stack/web/ui/core'
import { showNotificationError } from '@pubkey-stack/web/ui/notifications'
import { useAdminUsers } from '@pubkey-stack/web/user/data-access'
import { AdminUiCreateUserForm } from '@pubkey-stack/web/user/ui'
import { useNavigate } from 'react-router-dom'

export function WebAdminUserCreateFeature() {
  const navigate = useNavigate()
  const { createUser } = useAdminUsers()

  const submit = async (input: AdminCreateUserInput) =>
    createUser(input)
      .then((res) => navigate(`/admin/users/${res?.id}`))
      .then(() => true)
      .catch((err) => {
        showNotificationError(err.message)
        return false
      })

  return (
    <UiAdminPage leftAction={<UiBack />} title="Create User">
      <UiCard>
        <AdminUiCreateUserForm submit={submit}>
          <Group position="right">
            <Button type="submit">Create</Button>
          </Group>
        </AdminUiCreateUserForm>
      </UiCard>
    </UiAdminPage>
  )
}
