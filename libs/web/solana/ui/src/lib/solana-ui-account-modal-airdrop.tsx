import { Button, ButtonProps, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAccount } from '@pubkey-stack/web-solana-data-access'
import { PublicKey } from '@solana/web3.js'
import { useState } from 'react'

export function SolanaUiAccountModalAirdrop({ address, ...props }: ButtonProps & { address: PublicKey }) {
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
