import { Stack, StackProps } from '@mantine/core'
import { useUiTheme } from './theme'

export function UiStack(props: StackProps) {
  const { maxSm } = useUiTheme()

  return (
    <Stack spacing={maxSm ? 'xs' : 'md'} {...props}>
      {props.children}
    </Stack>
  )
}
