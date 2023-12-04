import { ActionIcon, ActionIconProps, Image, Menu, Tooltip } from '@mantine/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { IconCopy, IconCurrencySolana, IconLogout, IconSwitchHorizontal } from '@tabler/icons-react'
import { MouseEventHandler, useCallback, useMemo, useState } from 'react'

export function UiWalletSelectIcon(props: ActionIconProps & { iconSize?: number }) {
  const { iconSize = 28, ...rest } = props
  const { connecting, connected, wallet, connect, disconnect, publicKey } = useWallet()
  const { setVisible } = useWalletModal()
  const [copied, setCopied] = useState(false)

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey])

  const copyAddress = useCallback(async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58)
      setCopied(true)
      setTimeout(() => setCopied(false), 400)
    }
  }, [base58])
  const content = useMemo(() => {
    if (!wallet || !base58) return null
    return base58.slice(0, 4) + '..' + base58.slice(-4)
  }, [wallet, base58])

  const openModal = useCallback(() => {
    setVisible(true)
  }, [setVisible])

  const connectWallet: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (!wallet) {
        openModal()
        return
      }
      if (!event.defaultPrevented) {
        connect().catch(() => {})
      }
    },
    [connect, wallet, openModal],
  )

  return connected ? (
    <Menu withArrow offset={3}>
      <Menu.Target>
        <Tooltip label={`Connected to ${wallet?.adapter.name}: ${content}`}>
          <ActionIcon size="lg" color="brand" variant="subtle" {...rest}>
            <Image src={wallet?.adapter.icon} height={iconSize} width={iconSize} />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={copyAddress} leftSection={<IconCopy size={16} />}>
          {copied ? 'Copied' : 'Copy address'}
        </Menu.Item>
        <Menu.Item onClick={openModal} leftSection={<IconSwitchHorizontal size={16} />}>
          Change wallet
        </Menu.Item>
        <Menu.Item onClick={disconnect} leftSection={<IconLogout size={16} />}>
          Disconnect
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <Tooltip label="Connect Solana Wallet">
      <ActionIcon
        loading={connecting}
        size="lg"
        color="brand"
        variant={connecting ? 'light' : 'light'}
        {...props}
        onClick={connectWallet}
      >
        <IconCurrencySolana height={iconSize} />
      </ActionIcon>
    </Tooltip>
  )
}
