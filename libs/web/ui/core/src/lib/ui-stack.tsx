import { Stack, StackProps } from '@mantine/core'
import { useUiTheme } from './theme'

export function UiStack(props: StackProps) {
  const { isSmall } = useUiTheme()

  return (
    <Stack spacing={isSmall ? 'xs' : 'md'} {...props}>
      {props.children}
    </Stack>
  )
}
