import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UserAdminCreateInput } from '@pubkey-stack/sdk'
import { UiStack } from '@pubkey-ui/core'

export function AdminUiCreateUserForm({ submit }: { submit: (res: UserAdminCreateInput) => Promise<boolean> }) {
  const form = useForm<UserAdminCreateInput>({
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
        <Group justify="right">
          <Button type="submit">Create</Button>
        </Group>
      </UiStack>
    </form>
  )
}
