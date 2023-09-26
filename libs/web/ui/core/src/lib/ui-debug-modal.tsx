import { ActionIcon, Modal, Tooltip } from '@mantine/core'
import { useWebAuth } from '@pubkey-stack/web-auth-data-access'
import { IconBug } from '@tabler/icons-react'
import React, { useState } from 'react'
import { UiDebug } from './ui-debug'

export function UiDebugModal({ data, title }: { data: string | unknown; title?: string }) {
  const { user } = useWebAuth()
  const [opened, setOpened] = useState(false)

  if (!user?.developer) {
    return null
  }

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title={title ?? 'Debug'} centered size="xl">
        <UiDebug data={data} open={opened} hideButton />
      </Modal>

      <Tooltip label={`Show debug data`}>
        <ActionIcon color="brand" onClick={() => setOpened(true)}>
          <IconBug size={16} />
        </ActionIcon>
      </Tooltip>
    </>
  )
}
