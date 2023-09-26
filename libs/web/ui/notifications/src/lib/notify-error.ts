import { NotificationProps, showNotification } from '@mantine/notifications'

export function notifyError(message?: string, { title, ...props }: Omit<NotificationProps, 'message'> = {}): boolean {
  showNotification({
    title: title ?? 'Error',
    message: message ?? 'Unknown error',
    color: 'red',
    ...props,
  })
  return false
}
