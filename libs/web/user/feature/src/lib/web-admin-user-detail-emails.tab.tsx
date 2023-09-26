import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Email } from '@pubkey-stack/sdk'
import { UiAlert, UiLoader, UiStack } from '@pubkey-stack/web-ui-core'
import { useAdminFindManyEmail } from '@pubkey-stack/web-user-data-access'
import { AdminUiEmailTable, AuthUiEmailCreateForm, AuthUiEmailUpdateForm } from '@pubkey-stack/web-user-ui'

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
        <UiAlert message="No emails found" />
      )}
      <Group position="right">
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
