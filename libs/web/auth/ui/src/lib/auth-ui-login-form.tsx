import { LoginInput } from '@pubkey-stack/sdk'
import { formFieldPassword, formFieldText, UiForm, UiFormField } from '@pubkey-stack/web/ui/core'
import { ReactNode, useState } from 'react'

export interface AuthUiLoginFormProps {
  children?: ReactNode
  submit: (res: LoginInput) => Promise<boolean>
}

export function AuthUiLoginForm({ children, submit }: AuthUiLoginFormProps) {
  const [model] = useState<LoginInput>({
    username: '',
    password: '',
  })
  const fields: UiFormField<LoginInput>[] = [
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
    <UiForm model={model} fields={fields} submit={(res) => submit(res as LoginInput)}>
      {children}
    </UiForm>
  )
}
