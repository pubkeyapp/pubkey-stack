import { Box, TitleProps } from '@mantine/core'
import { useAccount } from '@pubkey-stack/web-solana-data-access'
import { PublicKey } from '@solana/web3.js'
import { SolanaUiBalanceSol } from './solana-ui-balance-sol'

export function SolanaUiAccountBalance({ address, ...props }: { address: PublicKey } & TitleProps) {
  const { getBalance: query } = useAccount({ address })

  return (
    <Box onClick={() => query.refetch()} {...props}>
      {query.data ? <SolanaUiBalanceSol balance={query.data} /> : '...'} SOL
    </Box>
  )
}
