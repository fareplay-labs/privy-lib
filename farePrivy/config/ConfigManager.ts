/**
 * Configuration Manager
 * Provides runtime configuration management with environment-specific overrides
 */

import {
  COLORS,
  GAME_DEFAULTS,
  WALLET_DEFAULTS,
  AUTH_DEFAULTS,
  SMART_WALLET_DEFAULTS,
  getEnvironmentConfig,
  type Environment,
  type Device,
  type Region,
  type WalletType,
  type GameType,
  type ThemeVariant,
} from './constants'

// Configuration override types
export interface ConfigOverrides {
  // API overrides
  api?: {
    baseUrl?: string
    timeout?: number
    retryAttempts?: number
  }

  // Color overrides
  colors?: {
    primary?: string
    secondary?: string
    accent?: string
    background?: string
    text?: string
  }

  // Wallet overrides
  wallets?: {
    enabled?: WalletType[]
    disabled?: WalletType[]
    timeout?: number
    gasLimits?: {
      standard?: number
      contract?: number
      deployment?: number
    }
  }

  // Game overrides
  games?: {
    enabled?: GameType[]
    disabled?: GameType[]
    trialLimits?: {
      maxMultiplier?: number
      maxConcurrent?: number
      dailyLimit?: number
    }
  }

  // Authentication overrides
  auth?: {
    methods?: string[]
    sessionTimeout?: number
    idleTimeout?: number
  }

  // Smart wallet overrides
  smartWallet?: {
    enabled?: boolean
    provider?: 'biconomy' | 'safe' | 'custom'
    sponsorship?: {
      enabled?: boolean
      maxDaily?: number
      maxPerTransaction?: number
    }
  }

  // Theme overrides
  theme?: {
    variant?: ThemeVariant
    customColors?: Record<string, string>
    fonts?: {
      primary?: string
      secondary?: string
    }
  }

  // Feature flags
  features?: {
    [key: string]: boolean
  }
}

export class ConfigManager {
  private static instance: ConfigManager
  private overrides: ConfigOverrides = {}
  private environment: Environment = 'PRODUCTION'
  private device: Device = 'DESKTOP'
  private region: Region = 'US'

  private constructor() {}

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  /**
   * Set environment
   */
  public setEnvironment(env: Environment): void {
    this.environment = env
  }

  /**
   * Set device type
   */
  public setDevice(device: Device): void {
    this.device = device
  }

  /**
   * Set region
   */
  public setRegion(region: Region): void {
    this.region = region
  }

  /**
   * Apply configuration overrides
   */
  public applyOverrides(overrides: ConfigOverrides): void {
    this.overrides = { ...this.overrides, ...overrides }
  }

  /**
   * Clear all overrides
   */
  public clearOverrides(): void {
    this.overrides = {}
  }

  /**
   * Get API configuration
   */
  public getApiConfig() {
    const envConfig = getEnvironmentConfig(this.environment)

    return {
      baseUrl: this.overrides.api?.baseUrl || envConfig.apiUrl,
      timeout: this.overrides.api?.timeout || 30000,
      retryAttempts: this.overrides.api?.retryAttempts || 3,
    }
  }

  /**
   * Get color configuration
   */
  public getColorConfig() {
    return {
      primary: this.overrides.colors?.primary || COLORS.PRIMARY.PURPLE,
      secondary: this.overrides.colors?.secondary || COLORS.SECONDARY.DARK_GRAY,
      accent: this.overrides.colors?.accent || COLORS.PRIMARY.BLUE,
      background: this.overrides.colors?.background || COLORS.SECONDARY.BACKGROUND,
      text: this.overrides.colors?.text || COLORS.SECONDARY.FOREGROUND,
    }
  }

  /**
   * Get wallet configuration
   */
  public getWalletConfig() {
    const defaults = WALLET_DEFAULTS

    return {
      enabled: this.overrides.wallets?.enabled || Object.values(defaults.TYPES),
      disabled: this.overrides.wallets?.disabled || [],
      timeout: this.overrides.wallets?.timeout || defaults.TIMEOUTS.CONNECTION,
      gasLimits: {
        standard: this.overrides.wallets?.gasLimits?.standard || defaults.GAS_LIMITS.STANDARD,
        contract:
          this.overrides.wallets?.gasLimits?.contract || defaults.GAS_LIMITS.CONTRACT_INTERACTION,
        deployment:
          this.overrides.wallets?.gasLimits?.deployment ||
          defaults.GAS_LIMITS.SMART_WALLET_DEPLOYMENT,
      },
    }
  }

  /**
   * Get game configuration
   */
  public getGameConfig() {
    return {
      enabled: this.overrides.games?.enabled || Object.values(GAME_DEFAULTS.TYPES),
      disabled: this.overrides.games?.disabled || [],
      trialLimits: {
        maxMultiplier: this.overrides.games?.trialLimits?.maxMultiplier,
        maxConcurrent: this.overrides.games?.trialLimits?.maxConcurrent,
        dailyLimit: this.overrides.games?.trialLimits?.dailyLimit,
      },
    }
  }

  /**
   * Get authentication configuration - now uses ALL login methods for all devices
   */
  public getAuthConfig() {
    // Always use ALL login methods regardless of device
    const allMethods = AUTH_DEFAULTS.LOGIN_METHODS.ALL

    return {
      methods: this.overrides.auth?.methods || allMethods,
      sessionTimeout: this.overrides.auth?.sessionTimeout || AUTH_DEFAULTS.TIMEOUTS.SESSION,
      idleTimeout: this.overrides.auth?.idleTimeout || AUTH_DEFAULTS.TIMEOUTS.IDLE,
    }
  }

  /**
   * Get smart wallet configuration
   */
  public getSmartWalletConfig() {
    const defaults = SMART_WALLET_DEFAULTS.BICONOMY

    return {
      enabled: this.overrides.smartWallet?.enabled !== false,
      provider: this.overrides.smartWallet?.provider || 'biconomy',
      paymasterContext: defaults.PAYMASTER_CONTEXT,
      sponsorship: {
        enabled: this.overrides.smartWallet?.sponsorship?.enabled !== false,
        maxDaily:
          this.overrides.smartWallet?.sponsorship?.maxDaily ||
          defaults.SPONSORSHIP.MAX_DAILY_AMOUNT,
        maxPerTransaction:
          this.overrides.smartWallet?.sponsorship?.maxPerTransaction ||
          defaults.SPONSORSHIP.MAX_TRANSACTION_AMOUNT,
      },
    }
  }

  /**
   * Get theme configuration
   */
  public getThemeConfig() {
    return {
      variant: this.overrides.theme?.variant || 'dark',
      customColors: this.overrides.theme?.customColors || {},
      fonts: {
        primary: this.overrides.theme?.fonts?.primary || 'Gohu, sans-serif',
        secondary: this.overrides.theme?.fonts?.secondary || 'PixeBoy, monospace',
      },
    }
  }

  /**
   * Get feature flags
   */
  public getFeatureFlags() {
    const envConfig = getEnvironmentConfig(this.environment)

    return {
      analytics: envConfig.analytics,
      debug: envConfig.debug,
      ...this.overrides.features,
    }
  }

  /**
   * Get environment-specific configuration
   */
  public getEnvironmentConfig() {
    return getEnvironmentConfig(this.environment)
  }

  /**
   * Get complete configuration
   */
  public getConfig() {
    return {
      environment: this.environment,
      device: this.device,
      region: this.region,
      api: this.getApiConfig(),
      colors: this.getColorConfig(),
      wallets: this.getWalletConfig(),
      games: this.getGameConfig(),
      auth: this.getAuthConfig(),
      smartWallet: this.getSmartWalletConfig(),
      theme: this.getThemeConfig(),
      features: this.getFeatureFlags(),
    }
  }

  /**
   * Create a configuration for a specific context
   */
  public createContextConfig(context: {
    environment?: Environment
    device?: Device
    region?: Region
    overrides?: ConfigOverrides
  }) {
    const originalValues = {
      environment: this.environment,
      device: this.device,
      region: this.region,
      overrides: this.overrides,
    }

    // Apply context
    if (context.environment) this.setEnvironment(context.environment)
    if (context.device) this.setDevice(context.device)
    if (context.region) this.setRegion(context.region)
    if (context.overrides) this.applyOverrides(context.overrides)

    // Get configuration
    const config = this.getConfig()

    // Restore original values
    this.environment = originalValues.environment
    this.device = originalValues.device
    this.region = originalValues.region
    this.overrides = originalValues.overrides

    return config
  }
}

// Export singleton instance
export const configManager = ConfigManager.getInstance()

// Export helper functions
export const createConfig = (context?: {
  environment?: Environment
  device?: Device
  region?: Region
  overrides?: ConfigOverrides
}) => {
  if (context) {
    return configManager.createContextConfig(context)
  }
  return configManager.getConfig()
}

export const applyConfigOverrides = (overrides: ConfigOverrides) => {
  configManager.applyOverrides(overrides)
}

export const clearConfigOverrides = () => {
  configManager.clearOverrides()
}

export const setEnvironment = (env: Environment) => {
  configManager.setEnvironment(env)
}

export const setDevice = (device: Device) => {
  configManager.setDevice(device)
}

export const setRegion = (region: Region) => {
  configManager.setRegion(region)
}
