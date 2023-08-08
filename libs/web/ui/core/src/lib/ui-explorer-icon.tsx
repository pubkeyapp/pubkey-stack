import { ActionIcon, Tooltip } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'

export function UiExplorerIcon({ path }: { path: string }) {
  return (
    <Tooltip label="Open in Explorer" withArrow position="top">
      <ActionIcon size="sm" color="brand" component="a" href={`https://explorer.solana.com/${path}`} target="_blank">
        <IconExternalLink size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
