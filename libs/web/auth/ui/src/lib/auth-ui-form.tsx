import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { type LoginInput, RegisterInput } from '@pubkey-stack/sdk'
import { UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export type AuthUiFormInput = LoginInput | RegisterInput

export function AuthUiForm({
  children,
  submit,
}: {
  children?: ReactNode
  submit: (res: AuthUiFormInput) => Promise<boolean>
}) {
  const form = useForm<AuthUiFormInput>({
    initialValues: {
      username: '',
      password: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput required name="username" label="Username" {...form.getInputProps('username')} />
        <TextInput required name="password" label="Password" type="password" {...form.getInputProps('password')} />
        {children}
      </UiStack>
    </form>
  )
}
