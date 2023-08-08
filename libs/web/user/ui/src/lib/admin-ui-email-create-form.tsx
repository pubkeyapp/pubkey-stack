import { AdminCreateEmailInput } from '@pubkey-stack/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-stack/web/ui/core'
import { Button, Group } from '@mantine/core'

export interface AuthUiEmailCreateFormProps {
  submit: (res: AdminCreateEmailInput) => Promise<boolean>
}

export function AuthUiEmailCreateForm({ submit }: AuthUiEmailCreateFormProps) {
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
      <Group position="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
