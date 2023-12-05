import { Loader, Text, TextProps } from '@mantine/core'
import { useAccount } from '@pubkey-stack/web-solana-data-access'
import { PublicKey } from '@solana/web3.js'

export function SolanaUiAccountTokenBalance({ address, ...props }: { address: PublicKey } & TextProps) {
  const { getTokenBalance } = useAccount({ address })
  return getTokenBalance.isLoading ? (
    <Loader size="xs" type="dots" />
  ) : getTokenBalance.data ? (
    <Text {...props}>{getTokenBalance.data?.value.uiAmount}</Text>
  ) : (
    <div>Error</div>
  )
}
