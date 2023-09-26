import { NotificationProps, showNotification } from '@mantine/notifications'

export function notifyInfo(message?: string, { title, ...props }: Omit<NotificationProps, 'message'> = {}): boolean {
  showNotification({
    message: message ?? 'Information',
    title: title ?? 'Information',
    color: 'blue',
    ...props,
  })
  return true
}
