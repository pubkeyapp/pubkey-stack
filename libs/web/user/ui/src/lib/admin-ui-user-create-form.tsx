import { AdminCreateUserInput } from '@pubkey-stack/sdk'
import { formFieldPassword, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function AdminUiCreateUserForm({
  children,
  submit,
}: {
  children?: ReactNode
  submit: (res: AdminCreateUserInput) => Promise<boolean>
}) {
  const model: AdminCreateUserInput = {
    username: '',
    password: '',
  }

  const fields: UiFormField<AdminCreateUserInput>[] = [
    formFieldText('username', {
      label: 'Username',
    }),
    formFieldPassword('password', {
      label: 'Password',
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateUserInput)}>
      {children}
    </UiForm>
  )
}
