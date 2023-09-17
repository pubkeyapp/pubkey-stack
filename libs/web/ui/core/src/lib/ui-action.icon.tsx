import { ActionIcon, ActionIconProps } from '@mantine/core'
import { ComponentType } from 'react'

export function UiActionIcon({
  icon: Icon,
  ...props
}: ActionIconProps & {
  icon: ComponentType<{ size?: number }>
  onClick?: () => void
}) {
  return (
    <ActionIcon color="brand" {...props}>
      <Icon />
    </ActionIcon>
  )
}
