/**
 * Casino Auth Provider
 * Main provider component that wraps applications with casino-specific configuration
 */

import React, { createContext, useContext, useMemo, type ReactNode } from 'react'
import { PrivyProvider as _PrivyProvider } from '@privy-io/react-auth'
import { SmartWalletsProvider } from '@privy-io/react-auth/smart-wallets'
import { type CasinoAuthConfig, type CasinoContext, type CasinoEntityRef } from './types'
import { CasinoConfigFactory } from './config-factory'
import { useCasinoAuth } from './hooks/useCasinoAuth'
import { biconomyPrivyConfig, PRIVY_APP_CLIENT_ID, PRIVY_APP_ID } from '../../config/privy.config'
import { COLORS } from '../../config/constants'
import { addAppNoti } from "../store/useNotiStore"

// Context for casino configuration
const CasinoConfigContext = createContext<CasinoAuthConfig | null>(null)
const CasinoContext = createContext<CasinoContext | null>(null)

interface CasinoAuthProviderProps {
  children: ReactNode
  casinoSlug: string
  customConfig?: Partial<CasinoAuthConfig>
  /** Optional casino entity for custom casinos */
  casinoEntity?: CasinoEntityRef
}

/**
 * Main provider that sets up authentication for a specific casino
 */
export const CasinoAuthProvider: React.FC<CasinoAuthProviderProps> = ({
  children,
  casinoSlug,
  customConfig,
  casinoEntity,
}) => {
  // Generate configuration for this casino
  const config = useMemo(() => {
    try {
      // If we have a casino entity, merge its theming into customConfig
      const entityConfig =
        casinoEntity ?
          {
            metadata: {
              displayName: casinoEntity.config.title,
            },
            privy: {
              appearance: {
                accentColor: casinoEntity.config.colors?.themeColor1 || COLORS.PRIMARY.BLUE,
                backgroundColor: casinoEntity.config.colors?.themeColor2,
              },
            },
          }
        : {}

      const mergedConfig = { ...entityConfig, ...customConfig }
      return CasinoConfigFactory.forCasino(casinoSlug, mergedConfig as Partial<CasinoAuthConfig>)
    } catch (error) {
      console.error('Failed to create casino config:', error)
      // Fallback to basic config
      return CasinoConfigFactory.fromPreset('custom-basic', {
        id: casinoSlug,
        slug: casinoSlug,
        name: casinoEntity?.config.title || `${casinoSlug} Casino`,
        ...customConfig,
      })
    }
  }, [casinoSlug, customConfig, casinoEntity])

  // Validate configuration
  const validation = useMemo(() => CasinoConfigFactory.validate(config), [config])

  if (!validation.isValid) {
    console.error('Invalid casino configuration:', validation.errors)
    const errorMessage = validation.errors.join(', ')

    // Show notification for configuration error
    addAppNoti({
      type: 'error',
      msg: `Casino Configuration Error: ${errorMessage}`,
    })

    return (
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#1a1a1a',
          color: 'white',
          borderRadius: '8px',
          border: '1px solid #ff4444',
        }}
      >
        <h3 style={{ color: '#ff4444', marginBottom: '16px' }}>Casino Configuration Error</h3>
        <p style={{ color: '#cccccc', textAlign: 'center', maxWidth: '400px' }}>{errorMessage}</p>
      </div>
    )
  }

  return (
    <CasinoConfigContext.Provider value={config}>
      <_PrivyProvider
        appId={config.privy.appId || PRIVY_APP_ID}
        clientId={config.privy.clientId || PRIVY_APP_CLIENT_ID}
        config={{
          defaultChain: config.blockchain.defaultChain,
          supportedChains: config.blockchain.supportedChains,
          loginMethods: config.privy.loginMethods,
          appearance: {
            theme:
              config.privy.appearance?.theme === 'custom' ? 'dark' : config.privy.appearance?.theme,
            accentColor:
              config.privy.appearance?.accentColor?.startsWith('#') ?
                (config.privy.appearance.accentColor as `#${string}`)
              : COLORS.PRIMARY.BLUE,
            logo: config.privy.appearance?.logo,
            walletList: config.privy.walletList,
            walletChainType:
              config.privy.appearance?.walletChainType === 'all-chains' ?
                'ethereum-and-solana'
              : config.privy.appearance?.walletChainType,
            showWalletLoginFirst: config.privy.appearance?.showWalletLoginFirst,
          },
          embeddedWallets: config.privy.embeddedWallets,
          externalWallets: config.privy.externalWallets,
        }}
      >
        {config.blockchain.smartWallet ?
          <SmartWalletsProvider
            config={config.blockchain.smartWallet.config || biconomyPrivyConfig}
          >
            <CasinoContextProvider config={config}>{children}</CasinoContextProvider>
          </SmartWalletsProvider>
        : <CasinoContextProvider config={config}>{children}</CasinoContextProvider>}
      </_PrivyProvider>
    </CasinoConfigContext.Provider>
  )
}

/**
 * Inner provider that sets up casino context with auth state
 */
const CasinoContextProvider: React.FC<{ children: ReactNode; config: CasinoAuthConfig }> = ({
  children,
  config,
}) => {
  const casinoAuth = useCasinoAuth(config)

  return <CasinoContext.Provider value={casinoAuth}>{children}</CasinoContext.Provider>
}

/**
 * Hook to access casino configuration
 */
export const useCasinoConfig = (): CasinoAuthConfig => {
  const config = useContext(CasinoConfigContext)
  if (!config) {
    throw new Error('useCasinoConfig must be used within a CasinoAuthProvider')
  }
  return config
}

/**
 * Hook to access casino context (auth state, user, wallet, etc.)
 */
export const useCasinoContext = (): CasinoContext => {
  const context = useContext(CasinoContext)
  if (!context) {
    throw new Error('useCasinoContext must be used within a CasinoAuthProvider')
  }
  return context
}

/**
 * HOC for components that need casino context
 */
export const withCasinoAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedComponent = (props: P) => {
    const context = useCasinoContext()
    return <Component {...props} casinoContext={context} />
  }
  WrappedComponent.displayName = `withCasinoAuth(${Component.displayName || Component.name || 'Component'})`
  return WrappedComponent
}
