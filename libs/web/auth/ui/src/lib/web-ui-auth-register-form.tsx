import { RegisterInput } from '@pubkey-stack/sdk'
import { formFieldPassword, formFieldText, UiForm, UiFormField } from '@pubkey-stack/web-ui-core'
import { ReactNode, useState } from 'react'

export function WebUiAuthRegisterForm({
  children,
  submit,
}: {
  children?: ReactNode
  submit: (res: RegisterInput) => Promise<boolean>
}) {
  const [model] = useState<RegisterInput>({
    username: '',
    password: '',
  })
  const fields: UiFormField<RegisterInput>[] = [
    formFieldText('username', {
      placeholder: 'Username',
      required: true,
    }),
    formFieldPassword('password', {
      placeholder: 'Password',
      required: true,
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as RegisterInput)}>
      {children}
    </UiForm>
  )
}
