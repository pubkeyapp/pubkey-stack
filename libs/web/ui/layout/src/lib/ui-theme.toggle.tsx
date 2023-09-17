import { ActionIcon, Group, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'

export function UiThemeToggle() {
  const theme = useMantineTheme()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Group position="center" my="xl">
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        style={{
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.colors.brand[4] : theme.colors.brand[6],
        }}
      >
        {colorScheme === 'dark' ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
      </ActionIcon>
    </Group>
  )
}
