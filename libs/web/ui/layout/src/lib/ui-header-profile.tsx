import { Avatar, Button, Group, Menu, rem, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { UserRole } from '@pubkey-stack/sdk'
import { useWebAuth } from '@pubkey-stack/web/auth/data-access'
import {
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
  const theme = useMantineTheme()
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
            <Avatar src={user?.avatarUrl} alt={user?.username ?? 'User Avatar'} radius={100} size={34} />
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
        {user?.role === UserRole.Admin && (
          <>
            <Menu.Divider />
            <Menu.Item component={Link} to="/admin" icon={<IconShield size="0.9rem" stroke={1.5} />}>
              Admin
            </Menu.Item>
          </>
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
