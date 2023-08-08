import { Footer, Group, Text } from '@mantine/core'

export function UiFooter({ text }: { text: string }) {
  return (
    <Footer height={60}>
      <Group position="center" h="100%">
        <Text size="sm" color="dimmed">
          {text}
        </Text>
      </Group>
    </Footer>
  )
}
