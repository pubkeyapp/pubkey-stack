import { Text } from '@mantine/core'
import { UiStack } from '@pubkey-stack/web/ui/core'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomeUiHero } from './home-ui-hero'

export default function WebHomeRoutes() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <UiStack>
            <HomeUiHero />
          </UiStack>
        }
      />
      <Route
        path="/learn-more"
        element={
          <UiStack>
            <Text>Learn more</Text>
          </UiStack>
        }
      />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
