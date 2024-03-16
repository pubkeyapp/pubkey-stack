import { Button, Group } from '@mantine/core'
import { IdentityAdminCreateInput, IdentityProvider } from '@pubkey-stack/sdk'
import { formFieldSelect, formFieldText, getEnumOptions, UiForm, UiFormField } from '@pubkey-ui/core'

export function AuthUiIdentityCreateForm({ submit }: { submit: (res: IdentityAdminCreateInput) => Promise<boolean> }) {
  const model: IdentityAdminCreateInput = {
    provider: IdentityProvider.Solana,
    providerId: '',
    ownerId: '',
  }

  const fields: UiFormField<IdentityAdminCreateInput>[] = [
    formFieldText('providerId', {
      label: 'Provider ID',
    }),
    formFieldSelect('provider', {
      label: 'Provider',
      options: getEnumOptions(IdentityProvider),
    }),
  ]

  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as IdentityAdminCreateInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
