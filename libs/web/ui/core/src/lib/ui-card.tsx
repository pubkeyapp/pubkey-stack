import { Box, Paper, PaperProps, Skeleton } from '@mantine/core'
import { ReactNode } from 'react'
import { useUiTheme } from './theme'
import { UiCardTitle } from './ui-card-title'

export function UiCard({
  loading,
  title,
  ...props
}: PaperProps & {
  loading?: boolean
  title?: ReactNode
}) {
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
