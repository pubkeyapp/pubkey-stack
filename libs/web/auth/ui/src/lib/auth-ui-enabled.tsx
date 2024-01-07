import { Group, Title } from '@mantine/core'
import type { AppConfig } from '@pubkey-stack/sdk'
import { ReactNode } from 'react'

export function AuthUiEnabled({ appConfig, children }: { appConfig: AppConfig; children: ReactNode }) {
  const {
    authDiscordEnabled,
    authGithubEnabled,
    authPasswordEnabled,
    authRegisterEnabled,
    authSolanaEnabled,
    authTelegramEnabled,
    authTwitterEnabled,
  } = appConfig

  const enabled =
    authDiscordEnabled ||
    authGithubEnabled ||
    authRegisterEnabled ||
    authPasswordEnabled ||
    authSolanaEnabled ||
    authTelegramEnabled ||
    authTwitterEnabled

  return enabled ? (
    children
  ) : (
    <Group justify="center">
      <Title>Authentication is disabled.</Title>
    </Group>
  )
}
