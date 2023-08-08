import { Box, Tabs, TabsProps, Text } from '@mantine/core'
import { ReactElement, ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

export interface UiTabRoute {
  component: ReactNode
  label: ReactElement | string
  value: string
}
export interface UiTabRoutesProps extends Omit<TabsProps, 'children'> {
  children?: ReactNode
  grow?: boolean
  tabs: UiTabRoute[]
}

export function UiTabRoutes({ grow = true, tabs, ...props }: UiTabRoutesProps) {
  const navigate = useNavigate()
  const location = useLocation()
  // Set the active tab based on matching the location pathname with the tab value
  const activeTab = tabs.find((tab) => location.pathname.endsWith(tab.value))?.value
  // Set default redirect route to the first tab
  const redirect = tabs.length && tabs[0].value !== '' ? tabs[0].value : undefined

  return (
    <Box>
      <Tabs value={activeTab} onTabChange={(value) => navigate(`${value}`)} mb="md" {...props}>
        <Tabs.List grow={grow}>
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              <Text>{tab.label}</Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <Routes>
        {redirect ? <Route index element={<Navigate replace to={`./${redirect}`} />} /> : null}
        {tabs.map((tab) => (
          <Route key={tab.value} path={`${tab.value}/*`} element={tab.component} />
        ))}
        <Route path="*" element={<Navigate replace to={`./${redirect}`} />} />
      </Routes>
    </Box>
  )
}
