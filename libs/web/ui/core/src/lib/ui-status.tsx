import { Text, TextProps } from '@mantine/core'

export function UiStatus(props: TextProps) {
  return (
    <Text size="xs" color="dimmed" {...props}>
      {props.children}
    </Text>
  )
}
