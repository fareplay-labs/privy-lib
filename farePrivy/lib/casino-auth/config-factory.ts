/**
 * Casino Configuration Factory
 * Creates and manages casino-specific authentication configurations
 */

import type { CasinoAuthConfig, CasinoPreset } from './types'
import { defaultSupportedChain, supportedChains } from "../chains"
import { mergeConfigs } from './utils'
import { getEnvironmentConfig } from '../../config/constants'

// Default configurations for different casino types
export const CASINO_PRESETS: Record<CasinoPreset, Partial<CasinoAuthConfig>> = {
  'fareplay-main': {},
  'custom-basic': {},
  'custom-premium': {},
  enterprise: {},
  demo: {},
}

/**
 * Factory class for creating casino configurations
 */
export class CasinoConfigFactory {
  /**
   * Creates a configuration from a preset with optional overrides
   */
  static fromPreset(preset: CasinoPreset, overrides?: Partial<CasinoAuthConfig>): CasinoAuthConfig {
    const baseConfig = CASINO_PRESETS[preset]
    if (!baseConfig) {
      throw new Error(`Unknown preset: ${preset}`)
    }
    return mergeConfigs(this.getDefaultConfig(), baseConfig, overrides || {})
  }

  /**
   * Creates a configuration from a custom config object
   */
  static fromConfig(config: Partial<CasinoAuthConfig>): CasinoAuthConfig {
    return mergeConfigs(this.getDefaultConfig(), config)
  }

  /**
   * Creates a configuration for a specific casino by slug
   */
  static forCasino(casinoSlug: string, customConfig?: Partial<CasinoAuthConfig>): CasinoAuthConfig {
    // Use preset if it matches, otherwise use custom-basic
    const preset =
      CASINO_PRESETS[casinoSlug as CasinoPreset] ? (casinoSlug as CasinoPreset) : 'custom-basic'

    const baseConfig = {
      id: casinoSlug,
      slug: casinoSlug,
      name: this.formatCasinoName(casinoSlug),
      environment: 'production' as const,
      ...customConfig,
    }

    return this.fromPreset(preset, baseConfig)
  }

  /**
   * Validates a casino configuration
   */
  static validate(config: CasinoAuthConfig): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!config.id) errors.push('Casino ID is required')
    if (!config.name) errors.push('Casino name is required')
    if (!config.slug) errors.push('Casino slug is required')
    if (!config.privy?.appId) errors.push('Privy App ID is required')
    if (!config.privy?.appearance?.logo) errors.push('Casino logo is required')

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * Gets the default configuration
   */
  private static getDefaultConfig(): Partial<CasinoAuthConfig> {
    const envConfig = getEnvironmentConfig()

    return {
      environment: 'production',
      blockchain: {
        defaultChain: defaultSupportedChain,
        supportedChains,
        supportedChainIds: [],
        primaryChain: 'ARBITRUM',
        currency: 'FARE',
      },
      api: {
        baseUrl: envConfig.apiUrl,
      },
      features: {
        socialLogin: true,
        embeddedWallets: true,
        smartWallets: false,
        customGames: false,
        analytics: true,
      },
    }  }

  /**
   * Formats a casino slug into a display name
   */
  private static formatCasinoName(slug: string): string {
    return (
      slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') + ' Casino'
    )
  }
}
