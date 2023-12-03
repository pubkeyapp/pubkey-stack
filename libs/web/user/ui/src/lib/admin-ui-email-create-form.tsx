import { Button, Group } from '@mantine/core'
import { AdminCreateEmailInput } from '@pubkey-stack/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AuthUiEmailCreateForm({ submit }: { submit: (res: AdminCreateEmailInput) => Promise<boolean> }) {
  const model: AdminCreateEmailInput = {
    email: '',
    ownerId: '',
  }

  const fields: UiFormField<AdminCreateEmailInput>[] = [
    formFieldText('email', {
      label: 'Email',
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateEmailInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
