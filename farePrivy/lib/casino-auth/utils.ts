/**
 * Casino Auth Utilities
 * Utility functions for casino authentication configuration
 */

import type { CasinoAuthConfig, CasinoPreset } from './types'
import { CASINO_PRESETS } from './config-factory'
import { getEnvironmentConfig as getEnvConfig } from '../../config/constants'

/**
 * Creates a casino configuration from a preset and optional overrides
 */
export function createCasinoConfig(
  preset: CasinoPreset,
  overrides?: Partial<CasinoAuthConfig>
): CasinoAuthConfig {
  const baseConfig = CASINO_PRESETS[preset]

  if (!baseConfig) {
    throw new Error(`Invalid casino preset: ${preset}`)
  }

  return {
    ...getDefaultConfig(),
    ...baseConfig,
    ...overrides,
  } as CasinoAuthConfig
}

/**
 * Validates a casino configuration
 */
export function validateCasinoConfig(config: CasinoAuthConfig): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Required fields
  if (!config.id) errors.push('Casino ID is required')
  if (!config.name) errors.push('Casino name is required')
  if (!config.slug) errors.push('Casino slug is required')

  // Privy configuration
  if (!config.privy?.appId) errors.push('Privy App ID is required')
  if (!config.privy?.appearance?.logo) errors.push('Casino logo is required')

  // Blockchain configuration
  if (!config.blockchain?.defaultChain) errors.push('Default blockchain chain is required')
  if (!config.blockchain?.supportedChains?.length)
    errors.push('At least one supported chain is required')

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Gets the default configuration that all presets inherit from
 */
function getDefaultConfig(): Partial<CasinoAuthConfig> {
  return {
    environment: 'production',
    features: {
      socialLogin: true,
      embeddedWallets: true,
      smartWallets: false,
      customGames: false,
      analytics: true,
    },
    api: {
      baseUrl: 'https://api.fareplay.io',
    },
  }
}

/**
 * Deep merges multiple configuration objects
 */
export function mergeConfigs(...configs: Partial<CasinoAuthConfig>[]): CasinoAuthConfig {
  const merged = {} as CasinoAuthConfig

  for (const config of configs) {
    for (const key in config) {
      const value = config[key as keyof CasinoAuthConfig]
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        // Deep merge objects
        const existingValue = merged[key as keyof CasinoAuthConfig]
        merged[key as keyof CasinoAuthConfig] = {
          ...(existingValue && typeof existingValue === 'object' ? existingValue : {}),
          ...value,
        } as any
      } else {
        // Direct assignment for primitives and arrays
        merged[key as keyof CasinoAuthConfig] = value as any
      }
    }
  }

  return merged
}

/**
 * Generates a casino slug from a name
 */
export function generateCasinoSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Formats a casino slug into a display name
 */
export function formatCasinoName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Validates a casino slug format
 */
export function isValidCasinoSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

/**
 * Gets environment-specific configuration
 */
export function getEnvironmentConfig(
  environment: 'production' | 'staging' | 'development'
): Partial<CasinoAuthConfig> {
  const envConfig = getEnvConfig(environment)

  return {
    api: {
      baseUrl: envConfig.apiUrl,
    },
  } as Partial<CasinoAuthConfig>
}
