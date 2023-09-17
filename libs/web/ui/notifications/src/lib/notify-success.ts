import { NotificationProps, showNotification } from '@mantine/notifications'

export function notifySuccess(message?: string, { title, ...props }: Omit<NotificationProps, 'message'> = {}): boolean {
  showNotification({
    message: message ?? 'Success',
    title: title ?? 'Success',
    color: 'green',
    ...props,
  })
  return true
}
