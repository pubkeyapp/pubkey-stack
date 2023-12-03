import { Button, Group } from '@mantine/core'
import { AdminUpdateEmailInput, Email } from '@pubkey-stack/sdk'
import { formFieldCheckbox, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AuthUiEmailUpdateForm({
  email,
  submit,
}: {
  email: Email
  submit: (emailId: string, input: AdminUpdateEmailInput) => Promise<boolean>
}) {
  const model: AdminUpdateEmailInput = {
    email: email.email ?? '',
    verified: email.verified ?? false,
    default: email.default ?? false,
    private: email.private ?? false,
  }

  const fields: UiFormField<AdminUpdateEmailInput>[] = [
    formFieldText('email', {
      label: 'Email',
    }),
    formFieldCheckbox('verified', {
      label: 'Verified',
    }),
    formFieldCheckbox('default', {
      label: 'Default',
    }),
    formFieldCheckbox('private', {
      label: 'Private',
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(email.id, res as AdminUpdateEmailInput)}>
      <Group justify="right">
        <Button type="submit">Update</Button>
      </Group>
    </UiForm>
  )
}
