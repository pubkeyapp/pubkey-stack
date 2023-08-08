import { Alert, AlertProps } from '@mantine/core'
import { ReactNode } from 'react'

export type UiAlertProps = Omit<AlertProps, 'children'> & { message: ReactNode }

export function UiAlert({ message, ...props }: UiAlertProps) {
  return (
    <Alert color="brand" {...props}>
      {message}
    </Alert>
  )
}

export function UiError(props: UiAlertProps) {
  return <UiAlert color="red" {...props} />
}

export function UiWarn(props: UiAlertProps) {
  return <UiAlert color="yellow" {...props} />
}
