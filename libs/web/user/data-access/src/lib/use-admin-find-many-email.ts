import { modals } from '@mantine/modals'
import { AdminCreateEmailInput, AdminFindManyEmailInput, AdminUpdateEmailInput, Email } from '@pubkey-stack/sdk'
import { useWebSdk } from '@pubkey-stack/web/shell/data-access'
import { notifyError, notifySuccess } from '@pubkey-stack/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyEmail(userId: string) {
  const sdk = useWebSdk()

  const [input] = useState<AdminFindManyEmailInput>({
    ownerId: userId,
  })

  const query = useQuery({
    queryKey: ['admin', 'find-many-email', input],
    queryFn: () => sdk.adminFindManyEmail({ input }).then((res) => res.data),
  })

  return {
    emails: query.data?.items ?? [],
    query,
    createEmail: (input: AdminCreateEmailInput) =>
      sdk
        .adminCreateEmail({ input: { email: input.email, ownerId: userId } })
        .then(async (res) => {
          if (res) {
            notifySuccess('Email created')
            modals.closeAll()
            await query.refetch()
            return true
          }
          notifyError('Error creating email')
          return false
        })
        .catch((err) => {
          notifyError(`${err}`)
          return false
        }),
    deleteEmail: (email: Email) => {
      return sdk.adminDeleteEmail({ emailId: email.id }).then(async (res) => {
        if (res) {
          notifySuccess('Email deleted')
          await query.refetch()
          return true
        }
        notifyError('Error deleting email')
        return false
      })
    },
    updateEmail: (emailId: string, input: AdminUpdateEmailInput) => {
      return sdk
        .adminUpdateEmail({
          emailId,
          input: input,
        })
        .then(async (res) => {
          if (res) {
            notifySuccess('Email created')
            modals.closeAll()
            await query.refetch()
            return true
          }
          notifyError('Error creating email')
          return false
        })
        .catch((err) => {
          notifyError(`${err}`)
          return false
        })
    },
  }
}
