import { toastError } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useCounterProgram } from './use-counter-program'

export function useCounterFetchAll() {
  const program = useCounterProgram()

  return useQuery({
    queryKey: ['counter', 'fetch-all'],
    queryFn: () => program.account.counter.all().catch((err) => toastError(err.message)),
  })
}
