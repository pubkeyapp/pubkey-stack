import { Button, Group } from '@mantine/core'
import { UserAdminCreateInput } from '@pubkey-stack/sdk'
import { formFieldPassword, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminUiCreateUserForm({ submit }: { submit: (res: UserAdminCreateInput) => Promise<boolean> }) {
  const model: UserAdminCreateInput = {
    username: '',
    password: '',
  }

  const fields: UiFormField<UserAdminCreateInput>[] = [
    formFieldText('username', { label: 'Username', required: true }),
    formFieldPassword('password', { label: 'Password' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserAdminCreateInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
