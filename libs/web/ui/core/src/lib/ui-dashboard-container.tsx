import { Container } from '@mantine/core'
import { ReactNode } from 'react'

export function UiDashboardContainer({ children }: { children: ReactNode }) {
  return (
    <Container
      size="xs"
      h="100%"
      sx={{
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        gap: 32,
      }}
    >
      {children}
    </Container>
  )
}
