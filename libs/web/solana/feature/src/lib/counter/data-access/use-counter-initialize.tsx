import { toastExplorerLink, useAccount, useCluster } from '@pubkey-stack/web-solana-data-access'
import { toastError } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { Keypair } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { useCounterFetchAll } from './use-counter-fetch-all'
import { useCounterProgram } from './use-counter-program'

export function useCounterInitialize() {
  const { publicKey } = useWallet()
  const { getBalance } = useAccount({ address: publicKey! })
  const program = useCounterProgram()
  const fetchAllQuery = useCounterFetchAll()
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

          return Promise.all([fetchAllQuery.refetch(), getBalance.refetch()])
        })
        .catch((err) => toastError(err.message)),
  })
}
