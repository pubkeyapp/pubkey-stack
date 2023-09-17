import { Button, Stepper, Switch } from '@mantine/core'
import { modals } from '@mantine/modals'
import { ellipsify, Identity, IdentityProvider } from '@pubkey-stack/sdk'
import { useIdentitySolana } from '@pubkey-stack/web/identity/data-access'
import { UiStack, UiWarn } from '@pubkey-stack/web/ui/core'
import { notifyError } from '@pubkey-stack/web/ui/notifications'
import { WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'

export function WebUiIdentitySolanaLinkWizard({ identities }: { identities: Identity[] }) {
  const { linkAndSign } = useIdentitySolana()
  const { connected, publicKey, disconnect } = useWallet()
  const [signing, setSigning] = useState(false)
  const [useLedger, setUseLedger] = useState(false)
  const provider = IdentityProvider.Solana

  const exists = identities?.some((item) => item.providerId === publicKey?.toBase58())

  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!connected) {
      return
    }
    if (connected && exists) {
      setActive(0)
      return
    }
    setActive(1)
  }, [connected, exists])

  return (
    <UiStack>
      <Stepper active={active} onStepClick={setActive} orientation="vertical">
        <Stepper.Step
          label="Step 1: Connect Wallet"
          description={connected ? `Connected ${ellipsify(publicKey?.toBase58() ?? '')}` : 'Connect Wallet'}
        >
          {provider ? (
            connected ? (
              <UiStack>
                <Button
                  size={`lg`}
                  variant={connected ? 'filled' : 'light'}
                  onClick={() => {
                    if (!connected) {
                      return
                    }
                    disconnect()
                  }}
                >
                  Disconnect
                </Button>

                {exists ? (
                  <UiWarn
                    title="Identity already linked"
                    message="This identity is already linked to your account. Please connect a different wallet."
                  />
                ) : (
                  <Button
                    size={`lg`}
                    variant={connected ? 'filled' : 'light'}
                    onClick={() => {
                      if (!connected) {
                        return
                      }
                      setActive(1)
                    }}
                  >
                    Select {ellipsify(publicKey?.toBase58() ?? '')} on {provider}
                  </Button>
                )}
              </UiStack>
            ) : (
              <UiStack>
                <WalletMultiButton size="lg" />
              </UiStack>
            )
          ) : (
            <UiWarn title={'Select provider'} message={'Please select a provider before connecting your wallet.'} />
          )}
        </Stepper.Step>

        <Stepper.Step loading={signing} label="Step 2: Link Identity" description="Link and Verify Identity">
          {provider && connected && publicKey ? (
            <UiStack>
              <Switch
                size="lg"
                checked={useLedger}
                onChange={() => setUseLedger(!useLedger)}
                label="Verify with Ledger"
              />
              <Button
                loading={signing}
                size="lg"
                onClick={() => {
                  setSigning(true)
                  linkAndSign({ publicKey: publicKey.toString(), useLedger })
                    .then(() => {
                      modals.closeAll()
                      setActive(2)
                    })
                    .catch((err) => {
                      console.log('error linking identity', err)
                      notifyError('Error linking identity')
                    })
                    .finally(() => setSigning(false))
                }}
              >
                Link and Verify Identity
              </Button>
            </UiStack>
          ) : null}
        </Stepper.Step>
      </Stepper>
    </UiStack>
  )
}
