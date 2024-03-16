import { Button, Checkbox, Group, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { User, UserAdminUpdateInput, UserRole, UserStatus } from '@pubkey-stack/sdk'
import { getEnumOptions, UiStack } from '@pubkey-ui/core'

export function AdminUiUpdateUserForm({
  submit,
  user,
}: {
  submit: (res: UserAdminUpdateInput) => Promise<boolean>
  user: User
}) {
  const form = useForm<UserAdminUpdateInput>({
    initialValues: {
      avatarUrl: user.avatarUrl ?? user.avatarUrl ?? '',
      developer: user.developer,
      name: user.name ?? '',
      role: user.role ?? UserRole.User,
      status: user.status ?? UserStatus.Created,
      username: user.username ?? '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <Select name="role" label="Role" data={getEnumOptions(UserRole)} {...form.getInputProps('role')} />
        <Select name="status" label="Status" data={getEnumOptions(UserStatus)} {...form.getInputProps('status')} />
        <TextInput name="username" label="Username" {...form.getInputProps('username')} />
        <TextInput name="name" label="Name" {...form.getInputProps('name')} />
        <TextInput name="avatarUrl" label="Avatar URL" {...form.getInputProps('avatarUrl')} />
        <Checkbox name="developer" label="Developer" {...form.getInputProps('developer', { type: 'checkbox' })} />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
