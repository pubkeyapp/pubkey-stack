import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Email } from '@pubkey-stack/sdk'
import { useAdminFindManyEmail } from '@pubkey-stack/web-user-data-access'
import { AdminUiEmailTable, AuthUiEmailCreateForm, AuthUiEmailUpdateForm } from '@pubkey-stack/web-user-ui'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function WebAdminUserDetailEmailsTab({ userId }: { userId: string }) {
  const { emails, createEmail, deleteEmail, updateEmail, query } = useAdminFindManyEmail(userId)

  if (query.isLoading) return <UiLoader />

  return (
    <UiStack>
      {emails?.length ? (
        <AdminUiEmailTable
          emails={emails ?? []}
          editEmail={(email: Email) => {
            modals.open({
              title: 'Edit Email',
              children: <AuthUiEmailUpdateForm email={email} submit={updateEmail} />,
            })
          }}
          deleteEmail={(email) => {
            if (!window.confirm(`Delete email ${email.email}?`)) return
            return deleteEmail(email)
          }}
        />
      ) : (
        <UiInfo message="No emails found" />
      )}
      <Group justify="right">
        <Button
          onClick={() => {
            modals.open({
              title: 'Add Email',
              children: <AuthUiEmailCreateForm submit={createEmail} />,
            })
          }}
        >
          Add Email
        </Button>
      </Group>
    </UiStack>
  )
}
