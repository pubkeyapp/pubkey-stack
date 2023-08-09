import { Group, Title } from '@mantine/core'
import { UiLogo } from './ui-logo'

export function UiLogoMark({ size }: { size?: number }) {
  return (
    <Group spacing={'xs'}>
      <UiLogo size={size ?? 48} />
      <Title size={size ?? 48}>PubKey</Title>
    </Group>
  )
}
