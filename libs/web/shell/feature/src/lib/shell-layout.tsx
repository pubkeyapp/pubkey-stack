import { Group } from '@mantine/core'
import {
  SolanaUiAccountBalanceButton,
  SolanaUiAccountChecker,
  SolanaUiClusterChecker,
  SolanaUiClusterSelect,
  WalletIcon,
} from '@pubkey-stack/web-solana-ui'
import { UiHeaderProfile } from '@pubkey-stack/web-ui-core'
import { UiHeader, UiLayout, UiLoader } from '@pubkey-ui/core'
import { ReactNode, Suspense } from 'react'

export function ShellLayout({ children }: { children: ReactNode }) {
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
              <SolanaUiAccountBalanceButton />
              <SolanaUiClusterSelect />
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
      <Suspense fallback={<UiLoader mt="xl" size="xl" type="dots" />}>{children}</Suspense>
    </UiLayout>
  )
}
