import { BN } from '@coral-xyz/anchor'
import { toastExplorerLink, useCluster } from '@pubkey-stack/web-solana-data-access'
import { toastError } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'
import { useCounterProgramAccount } from './counter-program-account-provider'
import { useCounterFetch } from './use-counter-fetch'

export function useCounterSet() {
  const counterQuery = useCounterFetch()
  const { account, program } = useCounterProgramAccount()

  const { getExplorerUrl } = useCluster()
  return useMutation({
    mutationKey: ['counter', 'decrement', { account }],
    mutationFn: (value: number) =>
      program.methods
        .set(new BN(value))
        .accounts({ counter: account.publicKey })
        .rpc()
        .then((signature) => {
          if (signature) {
            toastExplorerLink({
              link: getExplorerUrl(`/tx/${signature}`),
              label: 'View transaction',
            })
          }
          return counterQuery.refetch()
        })
        .catch((err) => toastError(err.message)),
  })
}
