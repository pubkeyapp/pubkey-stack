import { Group } from '@mantine/core'
import {
  SolanaUiAccountBalanceButton,
  SolanaUiAccountChecker,
  SolanaUiClusterChecker,
  SolanaUiClusterSelect,
  WalletIcon,
} from '@pubkey-stack/web-solana-ui'
import { UiHeaderProfile } from '@pubkey-stack/web-ui-core'
import { UiHeader, UiLayout } from '@pubkey-ui/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { ReactNode } from 'react'

export function WebShellLayout({ children }: { children: ReactNode }) {
  const { publicKey } = useWallet()
  return (
    <UiLayout
      header={
        <UiHeader
          links={[
            { link: '/dashboard', label: 'Dashboard' },
            { link: '/solana', label: 'Solana' },
          ]}
          profile={
            <Group gap="xs">
              {publicKey && <SolanaUiAccountBalanceButton address={publicKey} />}
              {publicKey && <SolanaUiClusterSelect />}
              <WalletIcon />
              <UiHeaderProfile />
            </Group>
          }
        />
      }
    >
      <SolanaUiClusterChecker>
        <SolanaUiAccountChecker />
      </SolanaUiClusterChecker>
      {children}
    </UiLayout>
  )
}
