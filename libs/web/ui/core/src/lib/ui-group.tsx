import { Group, GroupProps } from '@mantine/core'

export function UiGroup(props: GroupProps) {
  return (
    <Group position="apart" {...props}>
      {props.children}
    </Group>
  )
}
