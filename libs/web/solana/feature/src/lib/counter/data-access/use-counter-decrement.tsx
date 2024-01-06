import { toastExplorerLink } from '@pubkey-stack/web-solana-data-access'
import { toastError } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'
import { useCounterProgramAccount } from './counter-program-account-provider'

export function useCounterDecrement() {
  const { account, program, getExplorerUrl, refresh } = useCounterProgramAccount()

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
          return refresh()
        })
        .catch((err) => toastError(err.message)),
  })
}
