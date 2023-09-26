import { NotificationProps, showNotification } from '@mantine/notifications'

export function notifyWarn(message?: string, { title, ...props }: Omit<NotificationProps, 'message'> = {}): boolean {
  showNotification({
    message: message ?? 'Warning',
    title: title ?? 'Warning',
    color: 'yellow',
    ...props,
  })
  return true
}
