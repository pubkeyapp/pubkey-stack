import { Button, Group } from '@mantine/core'
import { User, UserUserUpdateInput } from '@pubkey-stack/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserUiUpdateForm({
  submit,
  user,
}: {
  submit: (res: UserUserUpdateInput) => Promise<boolean>
  user: User
}) {
  const model: UserUserUpdateInput = {
    avatarUrl: user.avatarUrl ?? user.avatarUrl ?? '',
    developer: user.developer ?? false,
    name: user.name ?? '',
  }

  const fields: UiFormField<UserUserUpdateInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar URL' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUserUpdateInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
