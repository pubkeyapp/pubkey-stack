import { Button, Group } from '@mantine/core'
import { AdminCreateUserInput } from '@pubkey-stack/sdk'
import { UiAdminPage, UiBack, UiCard } from '@pubkey-stack/web-ui-core'
import { notifyError } from '@pubkey-stack/web-ui-notifications'
import { useAdminFindManyUser } from '@pubkey-stack/web-user-data-access'
import { AdminUiCreateUserForm } from '@pubkey-stack/web-user-ui'
import { useNavigate } from 'react-router-dom'

export function WebAdminUserCreateFeature() {
  const navigate = useNavigate()
  const { createUser } = useAdminFindManyUser()

  async function submit(input: AdminCreateUserInput) {
    return createUser(input)
      .then((res) => navigate(`/admin/users/${res?.id}`))
      .then(() => true)
      .catch((err) => {
        notifyError(err.message)
        return false
      })
  }

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
