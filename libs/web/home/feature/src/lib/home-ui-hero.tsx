import { Button, Container, createStyles, Group, rem, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',
    paddingTop: rem(200),
    paddingBottom: rem(120),

    [theme.fn.smallerThan('sm')]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(24),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: rem(54),
    paddingLeft: rem(38),
    paddingRight: rem(38),

    [theme.fn.smallerThan('sm')]: {
      height: rem(54),
      paddingLeft: rem(18),
      paddingRight: rem(18),
      flex: 1,
    },
  },
}))

export function HomeUiHero() {
  const { classes } = useStyles()

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          <Text component="span" color="#5865F2" inherit>
            Discord
          </Text>{' '}
          access gates
          <br />
          Using{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            PubKey
          </Text>
          .
        </h1>

        <Text className={classes.description} color="dimmed">
          PubKey is a simple and secure way to gate your content on Discord. It's free and open source.
        </Text>

        <Group className={classes.controls}>
          <Button component={Link} to="/dashboard" size="xl" className={classes.control} color="brand">
            Enter
          </Button>

          <Button component={Link} to="/learn-more" size="xl" variant="default" className={classes.control}>
            Learn more
          </Button>
        </Group>
      </Container>
    </div>
  )
}
