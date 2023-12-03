import { Button, Container, Group, Text, Title } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { IconBrandGithub, IconRocket } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export function HomeUiHero() {
  return (
    <Container size={700}>
      <UiStack gap="xl" my="xl">
        <Title>Welcome to PubKey Stack.</Title>

        <Text className={'classes.description'} c="dimmed">
          This is the PubKey Stack starter project.
        </Text>
        <Group>
          <Button component={Link} to="/dashboard" size="xl" color="brand" leftSection={<IconRocket />}>
            Get started
          </Button>

          <Button
            component={'a'}
            href="https://github.com/pubkeyapp/pubkey-stack"
            size="xl"
            variant="default"
            leftSection={<IconBrandGithub />}
          >
            Star on GitHub
          </Button>
        </Group>
      </UiStack>
    </Container>
  )
}
