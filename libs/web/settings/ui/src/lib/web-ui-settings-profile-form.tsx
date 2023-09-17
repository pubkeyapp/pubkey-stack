import { Button, Group } from '@mantine/core'
import { User, UserUpdateUserInput } from '@pubkey-stack/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-stack/web/ui/core'

export function WebUiSettingsProfileForm({
  submit,
  user,
}: {
  submit: (res: UserUpdateUserInput) => Promise<boolean>
  user: User
}) {
  const model: UserUpdateUserInput = {
    avatarUrl: user.avatarUrl ?? user.avatarUrl ?? '',
    developer: user.developer ?? false,
    name: user.name ?? '',
  }

  const fields: UiFormField<UserUpdateUserInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar URL' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateUserInput)}>
      <Group position="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
