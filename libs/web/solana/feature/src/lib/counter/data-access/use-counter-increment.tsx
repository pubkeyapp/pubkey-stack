import { toastExplorerLink, useAccount, useCluster } from '@pubkey-stack/web-solana-data-access'
import { toastError } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { useMutation } from '@tanstack/react-query'
import { useCounterProgramAccount } from './counter-program-account-provider'
import { useCounterFetch } from './use-counter-fetch'

export function useCounterIncrement() {
  const { publicKey } = useWallet()
  const { getBalance } = useAccount({ address: publicKey! })
  const counterQuery = useCounterFetch()
  const { account, program } = useCounterProgramAccount()
  const { getExplorerUrl } = useCluster()

  return useMutation({
    mutationKey: ['counter', 'increment', { account }],
    mutationFn: () =>
      program.methods
        .increment()
        .accounts({ counter: account.publicKey })
        .rpc()
        .then((signature) => {
          toastExplorerLink({
            link: getExplorerUrl(`/tx/${signature}`),
            label: 'View transaction',
          })
          return Promise.all([counterQuery.refetch(), getBalance.refetch()])
        })
        .catch((err) => toastError(err.message)),
  })
}
