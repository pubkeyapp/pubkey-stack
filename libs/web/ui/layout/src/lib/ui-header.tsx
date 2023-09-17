import { Anchor, Burger, Container, createStyles, Group, Header, Paper, rem, Transition } from '@mantine/core'
import { UiLogoMark } from '@pubkey-stack/web/ui/core'
import { ComponentType } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UiHeaderProfile } from './ui-header-profile'

const useStyles = createStyles((theme) => ({
  root: {
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}))

export interface UiHeaderProps {
  text: string
  icon: ComponentType<{ size: number }>
  opened: boolean
  close: () => void
  toggle: () => void
  links: { link: string; label: string }[]
}

export function UiHeader({ icon: Icon, opened, links, close, toggle, text }: UiHeaderProps) {
  const location = useLocation()
  const { classes, cx } = useStyles()

  const items = links.map((link) => {
    const active = location.pathname.startsWith(link.link)
    return (
      <Anchor
        component={Link}
        key={link.label}
        to={link.link}
        underline={false}
        className={cx(classes.link, { [classes.linkActive]: active })}
        onClick={(event) => {
          close()
        }}
      >
        {link.label}
      </Anchor>
    )
  })
  return (
    <Header height={{ base: 50, md: 70 }} className={classes.root}>
      <Container size="xl" className={classes.header}>
        <Group align="center">
          {items.length ? <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" /> : null}
          <Anchor component={Link} to="/dashboard" replace underline={false} display="flex">
            <UiLogoMark size={36} />
          </Anchor>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
        </Group>
        <Group>
          <UiHeaderProfile />
        </Group>
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  )
}
