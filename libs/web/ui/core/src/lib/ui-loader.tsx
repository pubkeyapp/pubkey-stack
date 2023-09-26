import { Flex, Loader, LoaderProps } from '@mantine/core'
import { MantineNumberSize, MantineTheme } from '@mantine/styles'

export function UiLoader({
  size = 'xl',
  variant = 'oval',
  type = 'inline',
  ...props
}: LoaderProps & {
  size?: MantineNumberSize
  variant?: MantineTheme['loader']
  type?: 'full' | 'inline'
}) {
  return (
    <Flex h={type === 'full' ? '100vh' : '100%'} justify="center" align="center">
      <Loader size={size} variant={variant} {...props} />
    </Flex>
  )
}
