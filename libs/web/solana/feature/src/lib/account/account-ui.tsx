import {
  ActionIcon,
  Badge,
  Box,
  Button,
  ButtonProps,
  Group,
  Loader,
  Modal,
  Table,
  Text,
  TextInput,
  TextProps,
  TitleProps,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useCluster } from '@pubkey-stack/web-solana-data-access'
import { UiError, UiInfo, UiStack, UiTime, UiWarning } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { IconRefresh, IconUserOff } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useAccount } from './account-data-access'

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
  }
  return str
}

export function AccountBalance({ address, ...props }: { address: PublicKey } & TitleProps) {
  const { getBalance: query } = useAccount({ address })

  return (
    <Box onClick={() => query.refetch()} {...props}>
      {query.data ? <BalanceSol balance={query.data} /> : '...'} SOL
    </Box>
  )
}
export function AccountChecker() {
  const { publicKey } = useWallet()
  if (!publicKey) {
    return null
  }
  return <AccountBalanceCheck address={publicKey} />
}
export function AccountBalanceCheck({ address }: { address: PublicKey }) {
  const { cluster } = useCluster()
  const { getBalance: query, requestAirdrop } = useAccount({ address })

  if (query.isLoading) {
    return null
  }
  if (query.isError || !query.data) {
    return (
      <UiWarning
        styles={{
          root: { display: 'flex', justifyContent: 'center' },
          title: { justifyContent: 'center' },
        }}
        title="Account not found"
        icon={<IconUserOff size={24} />}
        message={
          <Group justify="center">
            <Text>
              You are connected to <strong>{cluster.name}</strong> but your account is not found on this cluster.
            </Text>
            <Button
              variant="light"
              color="yellow"
              size="xs"
              onClick={() => requestAirdrop.mutateAsync(1).catch((err) => console.log(err))}
            >
              Request Airdrop
            </Button>
          </Group>
        }
      />
    )
  }
  return null
}

export function AccountButtons({ address }: { address: PublicKey }) {
  const wallet = useWallet()
  const { cluster } = useCluster()

  return (
    <Group gap={2}>
      <ModalAirdrop disabled={cluster.network?.includes('mainnet')} address={address} />
      <ModalSend disabled={wallet.publicKey?.toString() !== address.toString()} address={address} />
      <ModalReceive address={address} />
    </Group>
  )
}

export function AccountTokens({ address }: { address: PublicKey }) {
  const [showAll, setShowAll] = useState(false)
  const { getTokenAccounts: query } = useAccount({ address })
  const client = useQueryClient()
  const items = useMemo(() => {
    if (showAll) return query.data
    return query.data?.slice(0, 5)
  }, [query.data, showAll])

  return (
    <div>
      <UiStack>
        <Group justify="space-between">
          <Text size="xl">Token Accounts</Text>
          <Group>
            {query.isLoading ? (
              <Loader />
            ) : (
              <ActionIcon
                variant="outline"
                onClick={async () => {
                  await query.refetch()
                  await client.invalidateQueries({
                    queryKey: ['getTokenAccountBalance'],
                  })
                }}
              >
                <IconRefresh size={16} />
              </ActionIcon>
            )}
          </Group>
        </Group>
        {query.isError && <UiError title={'An error occurred'} message={`Error: ${query.error?.message.toString()}`} />}

        {query.isSuccess && (
          <div>
            {query.data.length === 0 ? (
              <UiInfo
                title="No token accounts found"
                message="Token accounts will appear here when you send or receive tokens."
              />
            ) : (
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Public Key</Table.Th>
                    <Table.Th>Mint</Table.Th>
                    <Table.Th align="right">Balance</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {items?.map(({ account, pubkey }) => (
                    <Table.Tr key={pubkey.toString()}>
                      <Table.Td>
                        <ExplorerLink
                          ff="monospace"
                          label={ellipsify(pubkey.toString())}
                          path={`account/${pubkey.toString()}`}
                        />
                      </Table.Td>
                      <Table.Td>
                        <ExplorerLink
                          ff="monospace"
                          label={ellipsify(account.data.parsed.info.mint)}
                          path={`account/${account.data.parsed.info.mint.toString()}`}
                        />
                      </Table.Td>
                      <Table.Td align="right">
                        <AccountTokenBalance ff="monospace" address={address} />
                      </Table.Td>
                    </Table.Tr>
                  ))}

                  {(query.data?.length ?? 0) > 5 && (
                    <Table.Tr>
                      <Table.Td colSpan={4} align="center">
                        <Button onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Less' : 'Show All'}</Button>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            )}
          </div>
        )}
      </UiStack>
    </div>
  )
}

export function AccountTokenBalance({ address, ...props }: { address: PublicKey } & TextProps) {
  const { getTokenBalance } = useAccount({ address })
  return getTokenBalance.isLoading ? (
    <Loader />
  ) : getTokenBalance.data ? (
    <Text {...props}>{getTokenBalance.data?.value.uiAmount}</Text>
  ) : (
    <div>Error</div>
  )
}

export function AccountTransactions({ address }: { address: PublicKey }) {
  const { getSignatures: query } = useAccount({ address })
  const [showAll, setShowAll] = useState(false)

  const items = useMemo(() => {
    if (showAll) return query.data
    return query.data?.slice(0, 5)
  }, [query.data, showAll])

  return (
    <UiStack>
      <Group justify="space-between">
        <Text size="xl">Transaction History</Text>
        {query.isLoading ? (
          <Loader />
        ) : (
          <ActionIcon variant="outline" onClick={() => query.refetch()}>
            <IconRefresh size={16} />
          </ActionIcon>
        )}
      </Group>
      {query.isError && <UiError title="An error occurred" message={`Error: ${query.error?.message.toString()}`} />}
      {query.isSuccess && query.data.length === 0 ? (
        <UiInfo
          message={'Transactions will appear here when you send or receive tokens.'}
          title={'No transactions found.'}
        />
      ) : (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Signature</Table.Th>
              <Table.Th align="right">Slot</Table.Th>
              <Table.Th>Block Time</Table.Th>
              <Table.Th align="right">Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {items?.map((item) => (
              <Table.Tr key={item.signature}>
                <Table.Th>
                  <ExplorerLink ff="monospace" path={`tx/${item.signature}`} label={ellipsify(item.signature, 8)} />
                </Table.Th>
                <Table.Td>
                  <ExplorerLink ff="monospace" path={`block/${item.slot}`} label={item.slot.toString()} />
                </Table.Td>
                <Table.Td>
                  <UiTime date={new Date((item.blockTime ?? 0) * 1000)} />
                </Table.Td>
                <Table.Td align="right">
                  {item.err ? (
                    <Badge color="red" title={JSON.stringify(item.err)}>
                      Failed
                    </Badge>
                  ) : (
                    <Badge color="green">Success</Badge>
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
            {(query.data?.length ?? 0) > 5 && (
              <Table.Tr>
                <Table.Td colSpan={4} align="center">
                  <Button onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Less' : 'Show All'}</Button>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      )}
    </UiStack>
  )
}

function BalanceSol({ balance }: { balance: number }) {
  return <span>{Math.round((balance / LAMPORTS_PER_SOL) * 100000) / 100000}</span>
}

function ModalReceive({ address, ...props }: { address: PublicKey }) {
  const [opened, { close, open }] = useDisclosure(false)

  return (
    <>
      <Button onClick={open} {...props}>
        Receive
      </Button>
      <Modal opened={opened} onClose={close} title="Receive">
        <p>You can receive assets by sending them to your public key:</p>
        <code>{address.toString()}</code>
      </Modal>
    </>
  )
}

function ModalAirdrop({ address, ...props }: ButtonProps & { address: PublicKey }) {
  const [opened, { close, open }] = useDisclosure(false)
  const { requestAirdrop: mutation } = useAccount({ address })
  const [amount, setAmount] = useState(2)

  return (
    <>
      <Button onClick={open} {...props}>
        Airdrop
      </Button>
      <Modal opened={opened} onClose={close} title="Airdrop">
        <TextInput
          disabled={mutation.isPending}
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Button
          disabled={!amount || mutation.isPending}
          onClick={() => {
            mutation.mutateAsync(amount).then(() => close())
          }}
        >
          Request Airdrop
        </Button>
      </Modal>
    </>
  )
}

function ModalSend({ address, ...props }: ButtonProps & { address: PublicKey }) {
  const [opened, { close, open }] = useDisclosure(false)
  const wallet = useWallet()
  const { transferSol: mutation } = useAccount({ address })
  const [destination, setDestination] = useState('')
  const [amount, setAmount] = useState(1)

  if (!address || !wallet.sendTransaction) {
    return <div>Wallet not connected</div>
  }

  return (
    <>
      <Button onClick={open} {...props}>
        Send
      </Button>
      <Modal opened={opened} onClose={close} title="Send">
        <TextInput
          disabled={mutation.isPending}
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <TextInput
          disabled={mutation.isPending}
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Button
          disabled={!destination || !amount || mutation.isPending}
          onClick={() => {
            mutation
              .mutateAsync({
                destination: new PublicKey(destination),
                amount,
              })
              .then(() => close())
          }}
        >
          Send
        </Button>
      </Modal>
    </>
  )
}
