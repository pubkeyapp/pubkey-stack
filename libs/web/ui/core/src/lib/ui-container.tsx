import { Container, ContainerProps } from '@mantine/core'
import { useUiTheme } from './theme'

export function UiContainer(props: ContainerProps) {
  const { isSmall } = useUiTheme()

  return (
    <Container fluid={isSmall} px={isSmall ? 0 : undefined} py={isSmall ? undefined : 'sm'} {...props}>
      {props.children}
    </Container>
  )
}
