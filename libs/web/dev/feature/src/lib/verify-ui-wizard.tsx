import { Badge, Button, rem, Stepper, StepperProps, Switch } from '@mantine/core'
import { toastError, toastSuccess, UiGroup } from '@pubkey-ui/core'
import { verifySignature } from '@pubkeyapp/solana-verify-wallet'
import { WalletDisconnectButton, WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { IconUsb, IconWallet } from '@tabler/icons-react'
import { useCallback, useMemo, useState } from 'react'
import { useCreateSignature } from '@pubkey-stack/web-identity-data-access'
import { PublicKey } from '@solana/web3.js'

export function VerifyUiWizard({
  onConnected,
  onVerified,
  ...props
}: Omit<StepperProps, 'children' | 'active'> & {
  onConnected?: (publicKey: PublicKey) => void
  onVerified?: (signature: string) => void
}) {
  const { connected, publicKey, signMessage, wallet } = useWallet()
  const [signed, setSigned] = useState(false)
  const [useLedger, setUseLedger] = useState<boolean>(false)
  const challenge = 'Sign this message to verify your wallet'
  const createSignature = useCreateSignature()

  const active = useMemo(() => {
    if (!wallet) {
      setSigned(false)
      return 0
    }
    if (!connected || !publicKey) {
      setSigned(false)
      return 1
    }
    if (!signed) {
      return 2
    }
    return 3
  }, [wallet, connected, publicKey, signed])

  const sign = useCallback(async () => {
    if (!challenge || signMessage === undefined || !publicKey) {
      return
    }
    const signature = await createSignature({
      challenge,
      publicKey: publicKey.toString(),
      useLedger,
    }).catch((err) => toastError({ message: `${err}`, title: 'Error signing message' }))

    if (!signature) {
      throw new Error('No signature')
    }

    const verified = verifySignature({
      challenge,
      publicKey: publicKey.toString(),
      signature,
      useLedger,
    })

    if (!verified) {
      toastError({
        message: 'Failed to verify signature',
        title: 'Error signing message',
      })
      return
    }

    toastSuccess({
      message: 'Successfully verified signature',
      title: 'Success signing message',
    })
    onVerified?.(signature)
    setSigned(!!signature)
    return signature
  }, [challenge, createSignature, publicKey, signMessage, useLedger])

  return (
    <Stepper {...props} allowNextStepsSelect={false} active={active}>
      <Stepper.Step label="Select wallet">
        <UiGroup mt="md" justify="end">
          <WalletMultiButton size="lg" />
        </UiGroup>
      </Stepper.Step>
      <Stepper.Step label="Connect wallet">
        <UiGroup mt="md">
          <WalletDisconnectButton variant="light" size="lg" />
          <WalletMultiButton size="lg" />
        </UiGroup>
      </Stepper.Step>
      <Stepper.Step label="Sign message">
        <UiGroup mt="md" align="start">
          <WalletDisconnectButton variant="light" size="lg" />
          <UiGroup align="center">
            <Switch
              size="lg"
              checked={useLedger}
              onChange={() => setUseLedger((useLedger) => !useLedger)}
              onLabel={<IconWallet style={{ width: rem(16), height: rem(16) }} stroke={2.5} />}
              offLabel={<IconUsb style={{ width: rem(16), height: rem(16) }} stroke={2.5} />}
            />

            <Button leftSection={useLedger ? <IconUsb /> : <IconWallet />} onClick={() => sign()} size="lg">
              Verify {useLedger ? 'Ledger' : 'Wallet'}
            </Button>
          </UiGroup>
        </UiGroup>
      </Stepper.Step>
      <Stepper.Completed>
        <UiGroup mt="md" align="start">
          <WalletDisconnectButton size="lg" />
          <Badge size="xl" variant="light" color="green">
            {useLedger ? 'Ledger' : 'Wallet'} verified
          </Badge>
        </UiGroup>
      </Stepper.Completed>
    </Stepper>
  )
}
