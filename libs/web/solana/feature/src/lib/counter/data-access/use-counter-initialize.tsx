import { toastExplorerLink, useCluster } from '@pubkey-stack/web-solana-data-access'
import { toastError } from '@pubkey-ui/core'
import { Keypair } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { useCounterProgram } from './use-counter-program'

import { useCounterRefresh } from './use-counter-refresh'

export function useCounterInitialize() {
  const program = useCounterProgram()
  const refresh = useCounterRefresh()
  const { getExplorerUrl } = useCluster()

  return useMutation({
    mutationKey: ['counter', 'initialize'],
    mutationFn: ({ keypair }: { keypair: Keypair }) =>
      program.methods
        .initializeCounter()
        .accounts({ counter: keypair.publicKey })
        .signers([keypair])
        .rpc()
        .then((signature) => {
          toastExplorerLink({ link: getExplorerUrl(`/tx/${signature}`) })

          return refresh()
        })
        .catch((err) => toastError(err.message)),
  })
}
