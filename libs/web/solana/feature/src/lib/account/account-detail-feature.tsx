import { Group } from '@mantine/core'
import { UiPage, UiStack } from '@pubkey-ui/core'
import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'

import { useParams } from 'react-router-dom'

import { ExplorerLink } from '../cluster/cluster-ui'

import { AccountBalance, AccountButtons, AccountTokens, AccountTransactions, ellipsify } from './account-ui'

export default function AccountDetailFeature() {
  const params = useParams()
  const address = useMemo(() => {
    if (!params.address) {
      return
    }
    try {
      return new PublicKey(params.address)
    } catch (e) {
      console.log(`Invalid public key`, e)
    }
  }, [params])
  if (!address) {
    return <div>Error loading account</div>
  }

  return (
    <UiPage
      title={<AccountBalance order={2} address={address} />}
      rightAction={
        <Group>
          <ExplorerLink path={`account/${address}`} label={ellipsify(address.toString())} />
          <AccountButtons address={address} />
        </Group>
      }
    >
      <UiStack>
        <AccountTokens address={address} />
        <AccountTransactions address={address} />
      </UiStack>
    </UiPage>
  )
}
