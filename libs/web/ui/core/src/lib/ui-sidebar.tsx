import { NavLink, Text } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import { ComponentType } from 'react'
import { Link, useLocation } from 'react-router-dom'

export interface UiSidebarLinkProps {
  color?: string
  icon?: ComponentType<{ size: number | string; stroke: number }>
  label: string
  to: string
}

export function UiSidebarLink({ color, icon: Icon, label, to }: UiSidebarLinkProps) {
  const { pathname } = useLocation()
  return (
    <NavLink
      active={pathname === to}
      component={Link}
      to={to}
      variant={'filled'}
      icon={Icon ? <Icon size="1rem" stroke={1.5} /> : null}
      rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
      label={<Text>{label}</Text>}
    />
  )
}

export function UiSidebar({ links }: { links: UiSidebarLinkProps[] }) {
  return links.map((item) => <UiSidebarLink {...item} />)
}
