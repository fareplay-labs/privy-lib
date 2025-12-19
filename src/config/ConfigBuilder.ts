/**
 * Configuration Builder for FarePrivy
 * Provides a fluent API for building custom authentication configurations
 */

import type { PrivyClientConfig, WalletListEntry } from '@privy-io/react-auth'
import type { Chain } from 'viem'
import { privyConfig } from './privy.config'

export type LoginMethod = NonNullable<PrivyClientConfig['loginMethods']>[number]
export type WalletProvider = WalletListEntry

export class PrivyConfigBuilder {
  private config: PrivyClientConfig

  constructor(baseConfig: PrivyClientConfig = privyConfig) {
    this.config = { ...baseConfig }
  }

  /**
   * Set authentication methods
   */
  withLoginMethods(methods: LoginMethod[]): this {
    this.config.loginMethods = methods
    return this
  }

  /**
   * Add a single login method
   */
  addLoginMethod(method: LoginMethod): this {
    if (!this.config.loginMethods?.includes(method)) {
      this.config.loginMethods = [...(this.config.loginMethods || []), method]
    }
    return this
  }

  /**
   * Remove a login method
   */
  removeLoginMethod(method: LoginMethod): this {
    this.config.loginMethods = this.config.loginMethods?.filter(m => m !== method)
    return this
  }

  /**
   * Set supported wallets
   */
  withWallets(wallets: WalletProvider[]): this {
    if (this.config.appearance) {
      this.config.appearance.walletList = wallets
    }
    return this
  }

  /**
   * Add a wallet provider
   */
  addWallet(wallet: WalletProvider): this {
    if (this.config.appearance) {
      const currentWallets = this.config.appearance.walletList || []
      if (!currentWallets.includes(wallet)) {
        this.config.appearance.walletList = [...currentWallets, wallet]
      }
    }
    return this
  }

  /**
   * Set blockchain configuration
   */
  withChains(defaultChain: Chain, supportedChains: Chain[]): this {
    this.config.defaultChain = defaultChain
    this.config.supportedChains = supportedChains
    return this
  }

  /**
   * Set appearance configuration
   */
  withAppearance(appearance: Partial<PrivyClientConfig['appearance']>): this {
    this.config.appearance = {
      ...this.config.appearance,
      ...appearance,
    }
    return this
  }

  /**
   * Set theme (light/dark)
   */
  withTheme(theme: 'light' | 'dark'): this {
    if (this.config.appearance) {
      this.config.appearance.theme = theme
    }
    return this
  }

  /**
   * Set accent color
   */
  withAccentColor(color: `#${string}`): this {
    if (this.config.appearance) {
      this.config.appearance.accentColor = color
    }
    return this
  }

  /**
   * Set logo
   */
  withLogo(logo: string): this {
    if (this.config.appearance) {
      this.config.appearance.logo = logo
    }
    return this
  }

  /**
   * Configure embedded wallets
   */
  withEmbeddedWallets(config: PrivyClientConfig['embeddedWallets']): this {
    this.config.embeddedWallets = config
    return this
  }

  /**
   * Enable/disable embedded wallets
   */
  enableEmbeddedWallets(enabled = true): this {
    if (enabled) {
      this.config.embeddedWallets = {
        createOnLogin: 'all-users',
        showWalletUIs: false,
      }
    } else {
      this.config.embeddedWallets = {
        createOnLogin: 'off',
        showWalletUIs: false,
      }
    }
    return this
  }

  /**
   * Configure external wallets
   */
  withExternalWallets(config: PrivyClientConfig['externalWallets']): this {
    this.config.externalWallets = config
    return this
  }

  /**
   * Set wallet chain type
   */
  withWalletChainType(chainType: 'ethereum-only' | 'solana-only' | 'ethereum-and-solana'): this {
    if (this.config.appearance) {
      this.config.appearance.walletChainType = chainType
    }
    return this
  }

  /**
   * Configure wallet login priority
   */
  withWalletLoginFirst(walletFirst = true): this {
    if (this.config.appearance) {
      this.config.appearance.showWalletLoginFirst = walletFirst
    }
    return this
  }

  /**
   * Apply environment-specific configurations
   */
  forEnvironment(env: 'development' | 'staging' | 'production'): this {
    switch (env) {
      case 'development':
        this.withTheme('dark')
        this.addLoginMethod('email')
        this.addLoginMethod('wallet')
        break
      case 'staging':
        this.withTheme('dark')
        break
      case 'production':
        // Production-specific config
        break
    }
    return this
  }

  /**
   * Apply gaming-specific configurations
   */
  forGaming(): this {
    return this.withLoginMethods(['wallet', 'email', 'google', 'twitter'])
      .withWallets(['metamask', 'coinbase_wallet', 'rainbow', 'wallet_connect'])
      .enableEmbeddedWallets()
      .withWalletChainType('ethereum-only')
      .withWalletLoginFirst(false)
  }

  /**
   * Apply mobile-optimized configurations
   */
  forMobile(): this {
    return this.withLoginMethods(['email', 'sms', 'google'])
      .withWallets(['metamask', 'coinbase_wallet', 'wallet_connect'])
      .enableEmbeddedWallets()
      .withWalletLoginFirst(false)
  }

  /**
   * Apply desktop-optimized configurations
   */
  forDesktop(): this {
    return this.withLoginMethods(['wallet', 'email', 'google', 'twitter', 'discord'])
      .withWallets(['metamask', 'coinbase_wallet', 'rainbow', 'wallet_connect', 'safe', 'zerion'])
      .enableEmbeddedWallets()
      .withWalletLoginFirst(true)
  }

  /**
   * Build the final configuration
   */
  build(): PrivyClientConfig {
    return { ...this.config }
  }

  /**
   * Reset to base configuration
   */
  reset(): this {
    this.config = { ...privyConfig }
    return this
  }

  /**
   * Clone the current builder
   */
  clone(): PrivyConfigBuilder {
    const newBuilder = new PrivyConfigBuilder()
    newBuilder.config = { ...this.config }
    return newBuilder
  }

  /**
   * Merge with another configuration
   */
  merge(otherConfig: Partial<PrivyClientConfig>): this {
    this.config = {
      ...this.config,
      ...otherConfig,
      // Deep merge appearance
      ...(otherConfig.appearance && {
        appearance: {
          ...this.config.appearance,
          ...otherConfig.appearance,
        },
      }),
    }
    return this
  }
}

/**
 * Helper function to create a new configuration builder
 */
export const createPrivyConfig = (baseConfig?: PrivyClientConfig): PrivyConfigBuilder => {
  return new PrivyConfigBuilder(baseConfig)
}

/**
 * Preset configurations for common use cases
 */
export const PRIVY_PRESETS = {
  gaming: () => createPrivyConfig().forGaming(),
  mobile: () => createPrivyConfig().forMobile(),
  desktop: () => createPrivyConfig().forDesktop(),
  minimal: () =>
    createPrivyConfig()
      .withLoginMethods(['email', 'wallet'])
      .withWallets(['metamask', 'coinbase_wallet']),
  socialFirst: () =>
    createPrivyConfig()
      .withLoginMethods(['google', 'twitter', 'discord', 'email'])
      .withWalletLoginFirst(false),
  walletFirst: () =>
    createPrivyConfig().withLoginMethods(['wallet', 'email']).withWalletLoginFirst(true),
}
