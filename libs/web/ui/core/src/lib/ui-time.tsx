import { Text, TextProps, Tooltip } from '@mantine/core'
import TimeAgo from 'timeago-react' // var TimeAgo = require('timeago-react');

export type UiTimeProps = TextProps & {
  datetime: Date
  prefix?: string
  tooltip?: boolean
}
export function UiTime({ datetime, prefix, tooltip, ...props }: UiTimeProps) {
  const element = (
    <Text size="xs" color="dimmed" {...props}>
      {prefix}
      <TimeAgo datetime={datetime} locale="en_US" />
    </Text>
  )

  return tooltip ? <Tooltip label={datetime.toISOString()}>{element}</Tooltip> : element
}

export function UiStatus(props: TextProps) {
  return (
    <Text size="xs" color="dimmed" {...props}>
      {props.children}
    </Text>
  )
}
