import React, { useMemo } from 'react'
import { PrivyProvider as _PrivyProvider, type PrivyClientConfig } from '@privy-io/react-auth'
import { SmartWalletsProvider } from '@privy-io/react-auth/smart-wallets'
import {
  privyConfig,
  PRIVY_APP_ID,
  PRIVY_APP_CLIENT_ID,
  biconomyPrivyConfig,
} from './config/privy.config'

export interface PrivyProviderProps {
  children: React.ReactNode
  /**
   * Custom Privy App ID - overrides default
   */
  appId?: string
  /**
   * Custom Privy Client ID - overrides default
   */
  clientId?: string
  /**
   * Custom Privy configuration - merges with or overrides default
   */
  config?: PrivyClientConfig
  /**
   * Custom Smart Wallet configuration - overrides default Biconomy config
   */
  smartWalletConfig?: Record<string, any>
  /**
   * Disable Smart Wallet integration entirely
   */
  disableSmartWallet?: boolean
  /**
   * Environment override for configuration selection
   */
  environment?: 'production' | 'staging' | 'development'
  /**
   * Custom theme overrides
   */
  theme?: {
    accentColor?: string
    logo?: string
    darkMode?: boolean
  }
}

export const PrivyProvider: React.FC<PrivyProviderProps> = ({
  children,
  appId = PRIVY_APP_ID,
  clientId = PRIVY_APP_CLIENT_ID,
  config,
  smartWalletConfig,
  disableSmartWallet = false,
  environment,
  theme,
}) => {
  // Merge configurations
  const finalConfig = useMemo(() => {
    let baseConfig = { ...privyConfig }

    // Apply environment-specific overrides
    if (environment) {
      // You can add environment-specific logic here
      if (environment === 'development') {
        baseConfig = {
          ...baseConfig,
          // Add development-specific overrides
        }
      }
    }

    // Apply theme overrides
    if (theme) {
      baseConfig = {
        ...baseConfig,
        appearance: {
          ...baseConfig.appearance,
          ...(theme.accentColor && { accentColor: theme.accentColor as `#${string}` }),
          ...(theme.logo && { logo: theme.logo }),
          ...(theme.darkMode !== undefined && { theme: theme.darkMode ? 'dark' : 'light' }),
        },
      }
    }

    // Apply custom config (highest priority)
    if (config) {
      baseConfig = {
        ...baseConfig,
        ...config,
        // Deep merge appearance if both exist
        ...(config.appearance &&
          baseConfig.appearance && {
            appearance: {
              ...baseConfig.appearance,
              ...config.appearance,
            },
          }),
      }
    }

    return baseConfig
  }, [config, environment, theme])

  const finalSmartWalletConfig = useMemo(() => {
    return smartWalletConfig || biconomyPrivyConfig
  }, [smartWalletConfig])

  if (disableSmartWallet) {
    return (
      <_PrivyProvider appId={appId} clientId={clientId} config={finalConfig}>
        {children}
      </_PrivyProvider>
    )
  }

  return (
    <_PrivyProvider appId={appId} clientId={clientId} config={finalConfig}>
      <SmartWalletsProvider config={finalSmartWalletConfig}>{children}</SmartWalletsProvider>
    </_PrivyProvider>
  )
}
