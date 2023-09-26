import { Alert, AlertProps, Stack, Text } from '@mantine/core'
import { IconAlertCircle, IconCheck, IconCircleX, IconInfoCircle } from '@tabler/icons-react'
import { ReactNode } from 'react'

export type UiAlertProps = Omit<AlertProps, 'children'> & { message: ReactNode; title?: ReactNode }

export function UiAlert({ message, title, ...props }: UiAlertProps) {
  return (
    <Alert {...props}>
      {title ? (
        <Stack spacing="xs">
          {typeof title === 'string' ? <Text weight={700}>{title}</Text> : title}
          {typeof message === 'string' ? <Text>{message}</Text> : message}
        </Stack>
      ) : typeof message === 'string' ? (
        <Text>{message}</Text>
      ) : (
        message
      )}
    </Alert>
  )
}

export function UiInfo(props: UiAlertProps) {
  return <UiAlert icon={<IconInfoCircle />} color="blue" {...props} />
}

export function UiError(props: UiAlertProps) {
  return <UiAlert icon={<IconCircleX />} color="red" {...props} />
}

export function UiSuccess(props: UiAlertProps) {
  return <UiAlert icon={<IconCheck />} color="green" {...props} />
}

export function UiWarn(props: UiAlertProps) {
  return <UiAlert icon={<IconAlertCircle />} color="yellow" {...props} />
}
