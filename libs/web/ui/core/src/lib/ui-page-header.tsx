import { Group, Text } from '@mantine/core'
import { ReactNode } from 'react'
import { UiCard, UiCardProps } from './ui-card'
import { UiGroup } from './ui-group'

export interface UiPageHeaderProps extends UiCardProps {
  children?: ReactNode
  title: ReactNode
  actions?: ReactNode
}
export function UiPageHeader({ children, title, actions, ...props }: UiPageHeaderProps) {
  return (
    <UiCard {...props}>
      <UiGroup>
        <Text size="xl" weight={700}>
          {title}
        </Text>
        <Group>{actions}</Group>
      </UiGroup>
      {children}
    </UiCard>
  )
}
