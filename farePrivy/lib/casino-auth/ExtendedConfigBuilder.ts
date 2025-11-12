/**
 * Extended Casino Configuration System
 * Provides advanced configuration options for different casino use cases
 */

import type { CasinoAuthConfig, CasinoPreset } from './types'
import { CasinoConfigFactory } from './config-factory'
import { getEnvironmentConfig, PLUGIN_DEFAULTS } from '../../config/constants'
import type { PrivyClientConfig } from '@privy-io/react-auth'
import type { AppGameName } from "../chains/types"

export interface CasinoConfigBuilderOptions {
  /**
   * Environment-specific overrides
   */
  environment?: 'development' | 'staging' | 'production'
  /**
   * Feature flags for conditional functionality
   */
  features?: {
    [key: string]: boolean | string | number
  }
  /**
   * Custom validation rules
   */
  validation?: {
    [key: string]: (value: any) => boolean | string
  }
  /**
   * Plugin system for extending functionality
   */
  plugins?: CasinoPlugin[]
  /**
   * Custom theme configurations
   */
  themes?: {
    [themeName: string]: Partial<CasinoAuthConfig['privy']['appearance']>
  }
  /**
   * Responsive configuration for different screen sizes
   */
  responsive?: {
    mobile?: Partial<CasinoAuthConfig>
    tablet?: Partial<CasinoAuthConfig>
    desktop?: Partial<CasinoAuthConfig>
  }
}

export interface CasinoPlugin {
  name: string
  version: string
  configure: (config: CasinoAuthConfig) => CasinoAuthConfig
  validate?: (config: CasinoAuthConfig) => boolean | string[]
}

export class ExtendedCasinoConfigBuilder {
  private config: CasinoAuthConfig
  private options: CasinoConfigBuilderOptions
  private plugins: CasinoPlugin[] = []

  constructor(basePreset: CasinoPreset = 'custom-basic', options: CasinoConfigBuilderOptions = {}) {
    this.config = CasinoConfigFactory.fromPreset(basePreset)
    this.options = options

    if (options.plugins) {
      this.plugins = options.plugins
    }
  }

  /**
   * Apply environment-specific configurations
   */
  forEnvironment(env: 'development' | 'staging' | 'production'): this {
    const envConfig = getEnvironmentConfig(env)

    const envConfigs = {
      development: {
        environment: 'development' as const,
        features: {
          ...this.config.features,
          analytics: false,
          customGames: true,
        },
        api: {
          ...this.config.api,
          baseUrl: envConfig.apiUrl,
        },
      },
      staging: {
        environment: 'staging' as const,
        features: {
          ...this.config.features,
          analytics: true,
          customGames: true,
        },
        api: {
          ...this.config.api,
          baseUrl: envConfig.apiUrl,
        },
      },
      production: {
        environment: 'production' as const,
        features: {
          ...this.config.features,
          analytics: true,
          customGames: false,
        },
        api: {
          ...this.config.api,
          baseUrl: envConfig.apiUrl,
        },
      },
    }

    this.config = { ...this.config, ...envConfigs[env] }
    return this
  }

  /**
   * Apply device-specific configurations
   */
  forDevice(device: 'mobile' | 'tablet' | 'desktop'): this {
    const deviceConfigs = {
      mobile: {
        privy: {
          ...this.config.privy,
          loginMethods: ['email', 'sms', 'google'] as PrivyClientConfig['loginMethods'],
          appearance: {
            ...this.config.privy.appearance,
            walletChainType: 'ethereum-only' as const,
            showWalletLoginFirst: false,
          },
        },
      },
      tablet: {
        privy: {
          ...this.config.privy,
          loginMethods: [
            'email',
            'wallet',
            'google',
            'twitter',
          ] as PrivyClientConfig['loginMethods'],
          appearance: {
            ...this.config.privy.appearance,
            walletChainType: 'ethereum-only' as const,
            showWalletLoginFirst: false,
          },
        },
      },
      desktop: {
        privy: {
          ...this.config.privy,
          loginMethods: [
            'wallet',
            'email',
            'google',
            'twitter',
            'discord',
          ] as PrivyClientConfig['loginMethods'],
          appearance: {
            ...this.config.privy.appearance,
            walletChainType: 'ethereum-only' as const,
            showWalletLoginFirst: true,
          },
        },
      },
    }

    this.config = { ...this.config, ...deviceConfigs[device] }
    return this
  }

  /**
   * Apply theme configuration
   */
  withTheme(themeName: string): this {
    if (this.options.themes?.[themeName]) {
      this.config.privy.appearance = {
        ...this.config.privy.appearance,
        ...this.options.themes[themeName],
      }
    }
    return this
  }

  /**
   * Apply custom branding
   */
  withBranding(branding: {
    name: string
    logo: string
    colors: {
      primary: string
      secondary?: string
      accent?: string
    }
    fonts?: {
      primary: string
      secondary?: string
    }
  }): this {
    this.config.name = branding.name
    this.config.privy.appearance.logo = branding.logo
    this.config.privy.appearance.accentColor = branding.colors.primary

    if (branding.colors.accent) {
      this.config.privy.appearance.accentColor = branding.colors.accent
    }

    return this
  }

  /**
   * Configure game-specific settings
   */
  withGameConfig(gameConfig: {
    enabled: string[]
    disabled?: string[]
    customConfigs?: Record<string, any>
  }): this {
    this.config.metadata = {
      ...this.config.metadata,
      games: {
        enabled: gameConfig.enabled as AppGameName[],
        disabled: gameConfig.disabled ? (gameConfig.disabled as AppGameName[]) : [],
        customConfigs: gameConfig.customConfigs || {},
      },
    }
    return this
  }

  /**
   * Configure authentication methods
   */
  withAuthMethods(methods: { primary: string[]; secondary?: string[]; disabled?: string[] }): this {
    const allMethods = [...methods.primary, ...(methods.secondary || [])]
    const filteredMethods =
      methods.disabled ?
        allMethods.filter(method => !methods.disabled!.includes(method))
      : allMethods

    this.config.privy.loginMethods = filteredMethods as any
    return this
  }

  /**
   * Configure smart wallet settings
   */
  withSmartWallet(smartWalletConfig: {
    enabled: boolean
    provider?: 'biconomy' | 'safe' | 'custom'
    sponsorship?: {
      enabled: boolean
      rules?: any[]
    }
  }): this {
    this.config.features.smartWallets = smartWalletConfig.enabled

    if (smartWalletConfig.enabled && smartWalletConfig.provider) {
      this.config.blockchain.smartWallet = {
        provider: smartWalletConfig.provider,
        config: {},
        paymasterOptions:
          smartWalletConfig.sponsorship?.enabled ?
            {
              mode: 'sponsored' as const,
              sponsorshipRules: smartWalletConfig.sponsorship.rules || [],
            }
          : undefined,
      }
    }

    return this
  }

  /**
   * Apply feature flags
   */
  withFeatures(features: Record<string, boolean>): this {
    this.config.features = {
      ...this.config.features,
      ...features,
    }
    return this
  }

  /**
   * Apply custom validation rules
   */
  withValidation(validationRules: Record<string, (value: any) => boolean | string>): this {
    this.options.validation = {
      ...this.options.validation,
      ...validationRules,
    }
    return this
  }

  /**
   * Add plugin to the configuration
   */
  withPlugin(plugin: CasinoPlugin): this {
    this.plugins.push(plugin)
    return this
  }

  /**
   * Configure for specific region/jurisdiction
   */
  forRegion(region: 'US' | 'EU' | 'APAC' | 'LATAM'): this {
    const regionConfigs = {
      US: {
        metadata: {
          ...this.config.metadata,
          legal: {
            jurisdiction: 'United States',
            termsOfService: '/terms-us',
            privacyPolicy: '/privacy-us',
          },
        },
        features: {
          ...this.config.features,
          // US-specific feature restrictions
        },
      },
      EU: {
        metadata: {
          ...this.config.metadata,
          legal: {
            jurisdiction: 'European Union',
            termsOfService: '/terms-eu',
            privacyPolicy: '/privacy-eu',
          },
        },
        features: {
          ...this.config.features,
          // GDPR compliance features
        },
      },
      APAC: {
        metadata: {
          ...this.config.metadata,
          legal: {
            jurisdiction: 'Asia Pacific',
            termsOfService: '/terms-apac',
            privacyPolicy: '/privacy-apac',
          },
        },
      },
      LATAM: {
        metadata: {
          ...this.config.metadata,
          legal: {
            jurisdiction: 'Latin America',
            termsOfService: '/terms-latam',
            privacyPolicy: '/privacy-latam',
          },
        },
      },
    }

    this.config = { ...this.config, ...regionConfigs[region] }
    return this
  }

  /**
   * Build the final configuration with all plugins applied
   */
  build(): CasinoAuthConfig {
    let finalConfig = { ...this.config }

    // Apply all plugins
    for (const plugin of this.plugins) {
      finalConfig = plugin.configure(finalConfig)
    }

    // Apply custom validation
    if (this.options.validation) {
      // Validation logic would go here
    }

    return finalConfig
  }

  /**
   * Validate the current configuration
   */
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Apply plugin validations
    for (const plugin of this.plugins) {
      if (plugin.validate) {
        const result = plugin.validate(this.config)
        if (typeof result === 'boolean' && !result) {
          errors.push(`Plugin ${plugin.name} validation failed`)
        } else if (Array.isArray(result)) {
          errors.push(...result)
        }
      }
    }

    // Apply custom validations
    if (this.options.validation) {
      for (const [key, validator] of Object.entries(this.options.validation)) {
        const value = (this.config as any)[key]
        const result = validator(value)
        if (typeof result === 'string') {
          errors.push(result)
        } else if (!result) {
          errors.push(`Validation failed for ${key}`)
        }
      }
    }

    return CasinoConfigFactory.validate(this.config)
  }

  /**
   * Clone the current builder
   */
  clone(): ExtendedCasinoConfigBuilder {
    const newBuilder = new ExtendedCasinoConfigBuilder()
    newBuilder.config = { ...this.config }
    newBuilder.options = { ...this.options }
    newBuilder.plugins = [...this.plugins]
    return newBuilder
  }
}

/**
 * Helper function to create extended configuration builder
 */
export const createCasinoConfigBuilder = (
  basePreset: CasinoPreset = 'custom-basic',
  options: CasinoConfigBuilderOptions = {}
): ExtendedCasinoConfigBuilder => {
  return new ExtendedCasinoConfigBuilder(basePreset, options)
}

/**
 * Common plugin implementations
 */
export const CASINO_PLUGINS = {
  /**
   * Analytics plugin
   */
  analytics: (config: { trackingId: string; events: string[] }): CasinoPlugin => ({
    name: 'analytics',
    version: PLUGIN_DEFAULTS.VERSIONS.ANALYTICS,
    configure: casinoConfig => ({
      ...casinoConfig,
      features: {
        ...casinoConfig.features,
        analytics: true,
      },
      metadata: {
        ...casinoConfig.metadata,
        analytics: config,
      },
    }),
  }),

  /**
   * Compliance plugin
   */
  compliance: (config: { jurisdiction: string; rules: string[] }): CasinoPlugin => ({
    name: 'compliance',
    version: PLUGIN_DEFAULTS.VERSIONS.COMPLIANCE,
    configure: casinoConfig => ({
      ...casinoConfig,
      metadata: {
        ...casinoConfig.metadata,
        legal: {
          ...casinoConfig.metadata?.legal,
          jurisdiction: config.jurisdiction,
          complianceRules: config.rules,
        },
      },
    }),
  }),

  /**
   * Custom games plugin
   */
  customGames: (config: { games: string[]; configs: Record<string, any> }): CasinoPlugin => ({
    name: 'customGames',
    version: PLUGIN_DEFAULTS.VERSIONS.CUSTOM_GAMES,
    configure: casinoConfig => ({
      ...casinoConfig,
      features: {
        ...casinoConfig.features,
        customGames: true,
      },
      metadata: {
        ...casinoConfig.metadata,
        games: {
          ...casinoConfig.metadata?.games,
          enabled: [
            ...(casinoConfig.metadata?.games?.enabled || []),
            ...(config.games as AppGameName[]),
          ],
          disabled: casinoConfig.metadata?.games?.disabled ?? [],
          customConfigs: {
            dice:
              config.configs.dice ?? casinoConfig.metadata?.games?.customConfigs?.dice ?? undefined,
            rps:
              config.configs.rps ?? casinoConfig.metadata?.games?.customConfigs?.rps ?? undefined,
            coinFlip:
              config.configs.coinFlip ??
              casinoConfig.metadata?.games?.customConfigs?.coinFlip ??
              undefined,
            bombs:
              config.configs.bombs ??
              casinoConfig.metadata?.games?.customConfigs?.bombs ??
              undefined,
            plinko:
              config.configs.plinko ??
              casinoConfig.metadata?.games?.customConfigs?.plinko ??
              undefined,
            crash:
              config.configs.crash ??
              casinoConfig.metadata?.games?.customConfigs?.crash ??
              undefined,
            cards_1:
              config.configs.cards_1 ??
              casinoConfig.metadata?.games?.customConfigs?.cards_1 ??
              undefined,
            roulette:
              config.configs.roulette ??
              casinoConfig.metadata?.games?.customConfigs?.roulette ??
              undefined,
            cryptoLaunch_1:
              config.configs.cryptoLaunch_1 ??
              casinoConfig.metadata?.games?.customConfigs?.cryptoLaunch_1 ??
              undefined,
            slots_1:
              config.configs.slots_1 ??
              casinoConfig.metadata?.games?.customConfigs?.slots_1 ??
              undefined,
          },
        },
      },
    }),
  }),
}
