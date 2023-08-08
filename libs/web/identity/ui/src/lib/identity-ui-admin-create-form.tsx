import { Button, Group } from '@mantine/core'
import { AdminCreateIdentityInput, IdentityProvider } from '@pubkey-stack/sdk'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkey-stack/web/ui/core'

export interface AuthUiIdentityCreateFormProps {
  submit: (res: AdminCreateIdentityInput) => Promise<boolean>
}

export function identityProviderOptions(): { label: string; value: IdentityProvider }[] {
  return Object.keys(IdentityProvider).map((key: string) => ({
    label: key,
    value: IdentityProvider[key as IdentityProvider],
  }))
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
      options: identityProviderOptions(),
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
