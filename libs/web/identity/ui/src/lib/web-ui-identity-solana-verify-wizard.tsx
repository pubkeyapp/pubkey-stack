import { Button, Stepper, Switch } from '@mantine/core'
import { modals } from '@mantine/modals'
import { ellipsify, Identity, IdentityProvider } from '@pubkey-stack/sdk'
import { useIdentitySolana } from '@pubkey-stack/web-identity-data-access'
import { WalletButton } from '@pubkey-stack/web-solana-ui'
import { toastError, UiStack, UiWarning } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useMemo, useState } from 'react'

export function WebUiIdentitySolanaVerifyWizard({ identity, refresh }: { identity: Identity; refresh: () => void }) {
  const { connected, publicKey } = useWallet()
  const { verifyAndSign } = useIdentitySolana()
  const [useLedger, setUseLedger] = useState(false)
  const [requesting, setRequesting] = useState(false)
  const [active, setActive] = useState(0)

  const canVerify = useMemo(
    () => identity.provider === IdentityProvider.Solana && connected && publicKey?.toBase58() === identity.providerId,
    [identity, connected, publicKey],
  )

  useEffect(() => {
    if (connected && active === 0) {
      setActive(1)
    }
  }, [active, connected])

  function request() {
    setRequesting(true)
    verifyAndSign({ publicKey: identity.providerId, useLedger })
      .catch((err) => {
        console.log('Error verifying identity', err)
        toastError('Error verifying identity')
      })
      .finally(() => {
        setRequesting(false)
        refresh()
        modals.closeAll()
      })
  }

  return (
    <Stepper active={active} onStepClick={setActive} orientation="vertical">
      <Stepper.Step
        label={`Step 1: Connect ${identity.provider} wallet`}
        description={connected ? `Connected to ${ellipsify(publicKey?.toBase58())}` : 'Select Wallet'}
      >
        <UiStack>
          <WalletButton size="lg" />
        </UiStack>
      </Stepper.Step>
      <Stepper.Step
        loading={requesting}
        label="Step 2: Verify and Sign"
        description={requesting ? 'Verifying...' : 'Verify and Sign'}
      >
        {canVerify ? (
          <UiStack>
            <Switch
              size="lg"
              checked={useLedger}
              onChange={() => setUseLedger(!useLedger)}
              label="Verify with Ledger"
            />
            <Button size="lg" onClick={() => request()} loading={requesting}>
              Verify and Sign
            </Button>
          </UiStack>
        ) : (
          <UiStack>
            <UiWarning
              title="Cannot verify identity"
              message={`You must connect your Solana wallet ${ellipsify(identity.providerId)} to verify your identity.`}
            />
          </UiStack>
        )}
      </Stepper.Step>
    </Stepper>
  )
}
