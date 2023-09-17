import { Button, Group, Menu, rem, useMantineColorScheme } from '@mantine/core'
import { UserRole } from '@pubkey-stack/sdk'
import { useWebAuth } from '@pubkey-stack/web/auth/data-access'
import { WebUserUiAvatar } from '@pubkey-stack/web/user/ui'
import {
  IconBug,
  IconChevronDown,
  IconLogout,
  IconMoonStars,
  IconSettings,
  IconShield,
  IconSun,
  IconUser,
} from '@tabler/icons-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function UiHeaderProfile() {
  const { user, logout } = useWebAuth()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const [open, setOpen] = useState(false)
  const isAdmin = user?.role === UserRole.Admin
  const isDeveloper = user?.developer ?? false

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      withinPortal
      withArrow
    >
      <Menu.Target>
        <Button py={0} pl={0} pr={4} variant={open ? 'light' : 'default'} radius="xl">
          <Group spacing={4} p={0}>
            <WebUserUiAvatar user={user} alt={user?.username ?? 'User Avatar'} radius={100} size={34} />
            <IconChevronDown size={rem(12)} stroke={1.5} />
          </Group>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} to="/profile" icon={<IconUser size="0.9rem" stroke={1.5} />}>
          Your profile
        </Menu.Item>
        <Menu.Item component={Link} to="/settings" icon={<IconSettings size="0.9rem" stroke={1.5} />}>
          Your settings
        </Menu.Item>
        {isAdmin || isDeveloper ? <Menu.Divider /> : null}
        {isAdmin && (
          <Menu.Item component={Link} to="/admin" icon={<IconShield size="0.9rem" stroke={1.5} />}>
            Admin
          </Menu.Item>
        )}{' '}
        {isDeveloper && (
          <Menu.Item component={Link} to="/admin/development" icon={<IconBug size="0.9rem" stroke={1.5} />}>
            Development
          </Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item
          closeMenuOnClick={false}
          onClick={() => toggleColorScheme()}
          icon={
            colorScheme === 'dark' ? (
              <IconSun size="0.9rem" stroke={1.5} />
            ) : (
              <IconMoonStars size="0.9rem" stroke={1.5} />
            )
          }
        >
          {colorScheme === 'dark' ? 'Light' : 'Dark'} color scheme
        </Menu.Item>
        <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
