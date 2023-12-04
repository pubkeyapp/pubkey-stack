import { lazy } from 'react'

export * from './lib/web-solana-feature'

export const SolanaFeature = lazy(() => import('./lib/web-solana-feature'))
