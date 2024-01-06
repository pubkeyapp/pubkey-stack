import { Button, ButtonProps, Menu } from '@mantine/core'
import { ellipsify } from '@pubkey-stack/sdk'
import { useCluster, useGetBalance } from '@pubkey-stack/web-solana-data-access'
import { PublicKey } from '@solana/web3.js'
import { IconCurrencySolana, IconExternalLink } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { SolanaUiBalanceSol } from './solana-ui-balance-sol'

export function SolanaUiAccountBalanceButton({ address, ...props }: { address: PublicKey } & ButtonProps) {
  const query = useGetBalance({ address })
  const { getExplorerUrl } = useCluster()
  const content = query.data ? <SolanaUiBalanceSol balance={query.data} /> : '...'

  return (
    <Menu shadow="md" width={250} withArrow>
      <Menu.Target>
        <Button
          loading={query.isLoading}
          variant="light"
          color={query.isError ? 'red' : query.data ? 'brand' : 'yellow'}
          rightSection={'SOL'}
          {...props}
        >
          {content}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account {ellipsify(address.toString())}</Menu.Label>
        <Menu.Item component={Link} to={`/solana/accounts/${address}`} leftSection={<IconCurrencySolana size={16} />}>
          View Account
        </Menu.Item>
        <Menu.Item
          component={'a'}
          href={getExplorerUrl(`address/${address}`)}
          leftSection={<IconExternalLink size={16} />}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Solana Explorer
        </Menu.Item>
        <Menu.Item
          component={'a'}
          href={getExplorerUrl(`address/${address}`).replace('explorer.solana.com', 'solscan.io')}
          leftSection={<IconExternalLink size={16} />}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Solscan
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
