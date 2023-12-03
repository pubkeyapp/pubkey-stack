import { Button, Group } from '@mantine/core'
import { AdminCreateUserInput } from '@pubkey-stack/sdk'
import { useAdminFindManyUser } from '@pubkey-stack/web-user-data-access'
import { AdminUiCreateUserForm } from '@pubkey-stack/web-user-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function WebAdminUserCreateFeature() {
  const navigate = useNavigate()
  const { createUser } = useAdminFindManyUser()

  async function submit(input: AdminCreateUserInput) {
    return createUser(input)
      .then((res) => navigate(`/admin/users/${res?.id}`))
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create User">
      <UiCard>
        <AdminUiCreateUserForm submit={submit}>
          <Group justify="right">
            <Button type="submit">Create</Button>
          </Group>
        </AdminUiCreateUserForm>
      </UiCard>
    </UiPage>
  )
}
