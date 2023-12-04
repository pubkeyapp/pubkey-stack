import { toastExplorerLink, useAccount, useCluster } from '@pubkey-stack/web-solana-data-access'
import { toastError } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'
import { useCounterProgramAccount } from './counter-program-account-provider'
import { useCounterFetch } from './use-counter-fetch'

export function useCounterDecrement() {
  const counterQuery = useCounterFetch()
  const { account, program } = useCounterProgramAccount()
  const { getBalance } = useAccount({ address: account?.publicKey })
  const { getExplorerUrl } = useCluster()

  return useMutation({
    mutationKey: ['counter', 'decrement', { account }],
    mutationFn: () =>
      program.methods
        .decrement()
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
