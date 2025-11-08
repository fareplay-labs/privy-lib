/**
 * Casino Auth Library
 * Main export file for the casino authentication library
 */

// Main Provider
export {
  CasinoAuthProvider,
  useCasinoConfig,
  useCasinoContext,
  withCasinoAuth,
} from './CasinoAuthProvider'

// Configuration
export { CasinoConfigFactory, CASINO_PRESETS } from './config-factory'

// Types
export type {
  CasinoAuthConfig,
  CasinoAppearanceConfig,
  CasinoContext,
  CasinoUser,
  CasinoWallet,
  CasinoPermissions,
  CasinoPreset,
  CasinoMetadata,
  SmartWalletConfig,
  SponsorshipRule,
} from './types'

// Hooks
export { useCasinoAuth } from './hooks/useCasinoAuth'

// Utilities
export { createCasinoConfig, validateCasinoConfig } from './utils'
