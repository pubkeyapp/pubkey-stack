import { toastError } from '@pubkey-ui/core'
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, TransactionSignature } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createTransaction } from './create-transaction'
import { toastExplorerLink } from './toast-signature-link'
import { useCluster } from './web-cluster-provider'

export function useAccount({ address }: { address: PublicKey }) {
  const { cluster, getExplorerUrl } = useCluster()
  const { connection } = useConnection()

  const wallet = useWallet()

  const getBalance = useQuery({
    queryKey: ['balance', { cluster, address }],
    queryFn: () => connection.getBalance(address),
  })

  const getSignatures = useQuery({
    queryKey: ['signatures', { cluster, address }],
    queryFn: () => connection.getConfirmedSignaturesForAddress2(address),
  })

  const getTokenAccounts = useQuery({
    queryKey: ['token-accounts', { endpoint: connection.rpcEndpoint, address: address.toString() }],
    queryFn: async () => {
      const [tokenAccounts, token2022Accounts] = await Promise.all([
        connection.getParsedTokenAccountsByOwner(address, {
          programId: TOKEN_PROGRAM_ID,
        }),
        connection.getParsedTokenAccountsByOwner(address, {
          programId: TOKEN_2022_PROGRAM_ID,
        }),
      ])
      return [...tokenAccounts.value, ...token2022Accounts.value]
    },
  })

  const getTokenBalance = useQuery({
    queryKey: ['getTokenAccountBalance', { endpoint: connection.rpcEndpoint, account: address.toString() }],
    queryFn: () => connection.getTokenAccountBalance(address),
  })

  const requestAirdrop = useMutation({
    mutationKey: ['airdrop', { cluster, address }],
    mutationFn: async (amount: number = 1) => {
      const [latestBlockhash, signature] = await Promise.all([
        connection.getLatestBlockhash(),
        connection.requestAirdrop(address, amount * LAMPORTS_PER_SOL),
      ])

      await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')
      return signature
    },
    onSuccess: (signature) => {
      toastExplorerLink({ link: getExplorerUrl(`tx/${signature}`), label: 'View Transaction' })
      return Promise.all([getBalance.refetch(), getSignatures.refetch()])
    },
  })

  const transferSol = useMutation({
    mutationKey: ['transfer-sol', { cluster, address }],
    mutationFn: async (input: { destination: PublicKey; amount: number }) => {
      let signature: TransactionSignature = ''
      try {
        const { transaction, latestBlockhash } = await createTransaction({
          publicKey: address,
          destination: input.destination,
          amount: input.amount,
          connection,
        })

        // Send transaction and await for signature
        signature = await wallet.sendTransaction(transaction, connection)

        // Send transaction and await for signature
        await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')

        console.log(signature)
        return signature
      } catch (error: unknown) {
        console.log('error', `Transaction failed! ${error}`, signature)

        return
      }
    },
    onSuccess: (signature) => {
      if (signature) {
        toastExplorerLink({ link: getExplorerUrl(`tx/${signature}`), label: 'View Transaction' })
      }
      return Promise.all([getBalance.refetch(), getSignatures.refetch()])
    },
    onError: (error) => {
      toastError(`Transaction failed! ${error}`)
    },
  })

  return {
    getBalance,
    getSignatures,
    getTokenAccounts,
    getTokenBalance,
    requestAirdrop,
    transferSol,
  }
}
