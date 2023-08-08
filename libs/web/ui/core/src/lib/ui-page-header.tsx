import { Group, Text } from '@mantine/core'
import { ReactNode } from 'react'
import { UiCard } from './ui-card'
import { UiGroup } from './ui-group'

export function UiPageHeader({
  children,
  title,
  actions,
}: {
  children?: ReactNode
  title: string
  actions?: ReactNode
}) {
  return (
    <UiCard>
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
