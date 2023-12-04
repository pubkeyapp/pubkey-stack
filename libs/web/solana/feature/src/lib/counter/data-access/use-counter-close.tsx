import { toastExplorerLink, useCluster } from '@pubkey-stack/web-solana-data-access'
import { toastError } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'
import { useCounterProgramAccount } from './counter-program-account-provider'
import { useCounterFetchAll } from './use-counter-fetch-all'

export function useCounterClose() {
  const fetchAll = useCounterFetchAll()
  const { account, program } = useCounterProgramAccount()
  const { getExplorerUrl } = useCluster()

  return useMutation({
    mutationKey: ['counter', 'close', { account }],
    mutationFn: () =>
      program.methods
        .closeCounter()
        .accounts({ counter: account.publicKey })
        .rpc()
        .then(async (signature) => {
          if (signature) {
            toastExplorerLink({
              link: getExplorerUrl(`/tx/${signature}`),
              label: 'View transaction',
            })
          }
          return fetchAll.refetch()
        })
        .catch((err) => toastError(err.message)),
  })
}
