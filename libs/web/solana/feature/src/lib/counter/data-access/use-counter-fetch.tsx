import { toastError } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useCounterProgramAccount } from './counter-program-account-provider'
import { useCounterProgram } from './use-counter-program'

export function useCounterFetch() {
  const { account } = useCounterProgramAccount()
  const program = useCounterProgram()

  return useQuery({
    queryKey: ['counter', 'fetch', { account }],
    queryFn: () => program.account.counter.fetch(account.publicKey).catch((err) => toastError(err.message)),
  })
}
