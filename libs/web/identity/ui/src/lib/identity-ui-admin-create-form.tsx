import { Button, Group } from '@mantine/core'
import { AdminCreateIdentityInput, getEnumOptions, IdentityProvider } from '@pubkey-stack/sdk'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkey-stack/web/ui/core'

export interface AuthUiIdentityCreateFormProps {
  submit: (res: AdminCreateIdentityInput) => Promise<boolean>
}

export function AuthUiIdentityCreateForm({ submit }: AuthUiIdentityCreateFormProps) {
  const model: AdminCreateIdentityInput = {
    provider: IdentityProvider.Solana,
    providerId: '',
    ownerId: '',
  }

  const fields: UiFormField<AdminCreateIdentityInput>[] = [
    formFieldText('providerId', {
      label: 'Provider ID',
    }),
    formFieldSelect('provider', {
      label: 'Provider',
      options: getEnumOptions(IdentityProvider),
    }),
  ]

  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateIdentityInput)}>
      <Group position="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
