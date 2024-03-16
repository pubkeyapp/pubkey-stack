import { Button, Group, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IdentityAdminCreateInput, IdentityProvider } from '@pubkey-stack/sdk'
import { getEnumOptions, UiStack } from '@pubkey-ui/core'

export function AuthUiIdentityCreateForm({ submit }: { submit: (res: IdentityAdminCreateInput) => Promise<boolean> }) {
  const form = useForm<IdentityAdminCreateInput>({
    initialValues: {
      provider: IdentityProvider.Solana,
      providerId: '',
      ownerId: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput name="providerId" label="Provider ID" {...form.getInputProps('providerId')} />
        <Select
          name="provider"
          label="Provider"
          data={getEnumOptions(IdentityProvider)}
          {...form.getInputProps('provider')}
        />
        <Group justify="right">
          <Button type="submit">Create</Button>
        </Group>
      </UiStack>
    </form>
  )
}
