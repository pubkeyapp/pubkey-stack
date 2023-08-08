import { Box, Paper, PaperProps, Skeleton, Title, TitleProps } from '@mantine/core'
import { ReactNode } from 'react'
import { useUiTheme } from './theme'

export interface UiCardProps extends PaperProps {
  loading?: boolean
  title?: ReactNode
}
export function UiCard({ loading, title, ...props }: UiCardProps) {
  const { isSmall } = useUiTheme()

  return (
    <Paper p={isSmall ? 'xs' : 'md'} withBorder {...props}>
      {title ? (
        <Box mb={isSmall ? 'xs' : 'md'}>{typeof title === 'string' ? <UiCardTitle>{title}</UiCardTitle> : title}</Box>
      ) : null}
      {loading ? <Skeleton visible={loading}>{props.children}</Skeleton> : props.children}
    </Paper>
  )
}

export interface UiCardTitleProps extends TitleProps {
  children: ReactNode
}
export function UiCardTitle({ children, ...props }: UiCardTitleProps) {
  return (
    <Title order={3} {...props}>
      {children}
    </Title>
  )
}
