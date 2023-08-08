import { ActionIcon, ActionIconProps } from '@mantine/core'
import { ComponentType } from 'react'

export interface UiActionIcon extends ActionIconProps {
  icon: ComponentType<{ size?: number }>
  onClick?: () => void
}
export function UiActionIcon({ icon: Icon, ...props }: UiActionIcon) {
  return (
    <ActionIcon color="brand" {...props}>
      <Icon />
    </ActionIcon>
  )
}
