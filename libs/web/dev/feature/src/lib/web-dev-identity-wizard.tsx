import { toastError, toastSuccess, UiCard, UiDebug, UiStack } from '@pubkey-ui/core'
import { useCreateSignature, useUserFindManyIdentity } from '@pubkey-stack/web-identity-data-access'
import { IdentityProvider } from '@pubkey-stack/sdk'
import { Grid } from '@mantine/core'
import { WebUiIdentitySolanaWizard, WebUiIdentitySolanaWizardModal } from '@pubkey-stack/web-identity-ui'
import { useCallback } from 'react'
import { verifySignature } from '@pubkeyapp/solana-verify-wallet'
import { useWallet } from '@solana/wallet-adapter-react'

export function WebDevIdentityWizard() {
  const { items } = useUserFindManyIdentity()
  const { publicKey } = useWallet()
  const challenge = 'Sign this message to verify your wallet'
  const createSignature = useCreateSignature()

  const sign = useCallback(
    async (useLedger: boolean) => {
      if (!publicKey) {
        toastError({ message: 'No public key', title: 'Error signing message' })
        return false
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
        return false
      }

      toastSuccess({
        message: 'Successfully verified signature',
        title: 'Success signing message',
      })
      return !!signature
    },
    [challenge, createSignature, publicKey],
  )

  return (
    <Grid>
      <Grid.Col span={8}>
        <UiStack>
          <UiCard title="Identity Wizard">
            <WebUiIdentitySolanaWizard sign={sign} />
          </UiCard>
          <UiCard title="Identity Wizard Modal">
            <WebUiIdentitySolanaWizardModal sign={sign}>Verify your wallet</WebUiIdentitySolanaWizardModal>
          </UiCard>
        </UiStack>
      </Grid.Col>
      <Grid.Col span={4}>
        <UiDebug
          data={{
            providers: Object.keys(IdentityProvider),
            identities: items.map((i) => [i.provider, i.providerId]),
          }}
          open
          hideButton
        />
      </Grid.Col>
    </Grid>
  )
}
