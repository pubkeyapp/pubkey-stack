import { Container, ContainerProps } from '@mantine/core'
import { useUiTheme } from './theme'

export function UiContainer(props: ContainerProps) {
  const { maxSm } = useUiTheme()

  return (
    <Container fluid={maxSm} px={maxSm ? 0 : undefined} py={maxSm ? undefined : 'sm'} {...props}>
      {props.children}
    </Container>
  )
}
