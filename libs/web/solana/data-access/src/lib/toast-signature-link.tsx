import { Anchor } from '@mantine/core'
import { NotificationData } from '@mantine/notifications'
import { toastSuccess } from '@pubkey-ui/core'

// TODO: Move to web-solana-ui library
export function toastExplorerLink({
  label,
  link,
  ...props
}: Omit<NotificationData, 'message'> & { link: string; label?: string }) {
  return toastSuccess({
    ...props,
    message: (
      <Anchor c="brand" href={link} target="_blank" rel="noopener noreferrer">
        {label ?? 'View on Solana Explorer'}
      </Anchor>
    ),
  })
}
