import { Button, Checkbox, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { User, UserUserUpdateInput } from '@pubkey-stack/sdk'
import { UiStack } from '@pubkey-ui/core'

export function UserUiUpdateForm({
  submit,
  user,
}: {
  submit: (res: UserUserUpdateInput) => Promise<boolean>
  user: User
}) {
  const form = useForm<UserUserUpdateInput>({
    initialValues: {
      avatarUrl: user.avatarUrl ?? user.avatarUrl ?? '',
      developer: user.developer,
      name: user.name ?? '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
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
