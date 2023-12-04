import { Anchor, AnchorProps, Group } from '@mantine/core'
import { UiCopy } from '@pubkey-ui/core'
import { useCluster } from './web-cluster-provider'

// TODO: Move to web-solana-ui library
export function SolanaExplorerLink({
  label,
  path,
  copyLabel,
  copyValue,
  ...props
}: AnchorProps & {
  label?: string
  path: string
  copyLabel?: string
  copyValue?: string
}) {
  return copyValue ? (
    <Group gap="xs">
      <UiCopy text={copyValue} tooltip={copyLabel} size={props.size} />
      <SolanaExplorerAnchor label={label} path={path} />
    </Group>
  ) : (
    <SolanaExplorerAnchor label={label} path={path} />
  )
}

export function SolanaExplorerAnchor({
  label = 'View on Solana Explorer',
  path,
  ...props
}: AnchorProps & {
  label?: string
  path: string
}) {
  const { getExplorerUrl } = useCluster()
  return (
    <Anchor c="brand" href={getExplorerUrl(path)} target="_blank" rel="noopener noreferrer" {...props}>
      {label}
    </Anchor>
  )
}
