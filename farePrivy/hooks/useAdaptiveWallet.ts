/**
 * Adaptive Wallet Hook System
 * Provides flexible wallet hooks that can be configured for different use cases
 */

import { useMemo, useEffect, useCallback } from 'react'
import { usePrivy, useWallets, type ConnectedWallet } from '@privy-io/react-auth'
import { useAppChainConfigStore } from "../store/useAppChainConfigStore"
import type { ISmartConnectedWallet } from './useActiveWallet'

export interface WalletHookConfig {
  /**
   * Prefer smart wallets over external wallets
   */
  preferSmartWallet?: boolean
  /**
   * Filter wallets by type
   */
  walletFilter?: (wallet: ConnectedWallet) => boolean
  /**
   * Custom wallet transformation
   */
  walletTransform?: (wallet: ConnectedWallet) => ConnectedWallet | ISmartConnectedWallet
  /**
   * Include unlinked wallets
   */
  includeUnlinked?: boolean
  /**
   * Auto-connect behavior
   */
  autoConnect?: boolean
  /**
   * Custom connection validation
   */
  connectionValidator?: (wallet: ConnectedWallet) => boolean
}

export interface AdaptiveWalletResult {
  wallets: (ConnectedWallet | ISmartConnectedWallet)[]
  activeWallet: ConnectedWallet | ISmartConnectedWallet | null
  privyWallet: ConnectedWallet | null
  externalWallet: ConnectedWallet | null
  smartWallet: ISmartConnectedWallet | null
  isConnected: boolean
  isReady: boolean
  isUsingSmartWallet: boolean
  connectionCount: number
  switchWallet: (wallet: ConnectedWallet) => void
  disconnect: () => void
  connect: () => void
}

/**
 * Adaptive wallet hook that can be configured for different use cases
 */
export const useAdaptiveWallet = (config: WalletHookConfig = {}): AdaptiveWalletResult => {
  const {
    preferSmartWallet = true,
    walletFilter,
    walletTransform,
    includeUnlinked = false,
    autoConnect = false,
    connectionValidator,
  } = config

  const { ready, authenticated, connectWallet, logout } = usePrivy()
  const { wallets: allWallets } = useWallets()
  const isUsingSmartWallet = useAppChainConfigStore.use.isUsingSmartWallet()
  const smartWalletClient = useAppChainConfigStore.use.nexusClient()

  // Filter wallets based on configuration
  const filteredWallets = useMemo(() => {
    let wallets = includeUnlinked ? allWallets : allWallets.filter(wallet => wallet.linked)

    if (walletFilter) {
      wallets = wallets.filter(walletFilter)
    }

    if (connectionValidator) {
      wallets = wallets.filter(connectionValidator)
    }

    return wallets
  }, [allWallets, includeUnlinked, walletFilter, connectionValidator])

  // Transform wallets if needed
  const transformedWallets = useMemo(() => {
    if (walletTransform) {
      return filteredWallets.map(walletTransform)
    }
    return filteredWallets
  }, [filteredWallets, walletTransform])

  // Get wallet types
  const privyWallet = useMemo(() => {
    return filteredWallets.find(wallet => wallet.connectorType === 'embedded') || null
  }, [filteredWallets])

  const externalWallet = useMemo(() => {
    return filteredWallets.find(wallet => wallet.connectorType !== 'embedded') || null
  }, [filteredWallets])

  // Smart wallet handling
  const smartWallet = useMemo((): ISmartConnectedWallet | null => {
    if (!isUsingSmartWallet || !smartWalletClient || !privyWallet) return null

    const smartWalletInstance: ISmartConnectedWallet = {
      ...privyWallet,
      smartWalletAddress: smartWalletClient.account.address,
      privyWalletAddress: privyWallet.address,
      address: smartWalletClient.account.address,
      getEthereumProvider: async () => smartWalletClient,
    }

    return smartWalletInstance
  }, [isUsingSmartWallet, smartWalletClient, privyWallet])

  // Determine active wallet based on preferences
  const activeWallet = useMemo(() => {
    if (!ready || !authenticated) return null

    if (preferSmartWallet && smartWallet) {
      return smartWallet
    }

    if (externalWallet) {
      return externalWallet
    }

    if (privyWallet) {
      return privyWallet
    }

    return transformedWallets[0] || null
  }, [
    ready,
    authenticated,
    preferSmartWallet,
    smartWallet,
    externalWallet,
    privyWallet,
    transformedWallets,
  ])

  // Connection state
  const isConnected = useMemo(() => {
    return ready && authenticated && !!activeWallet
  }, [ready, authenticated, activeWallet])

  const connectionCount = useMemo(() => {
    return filteredWallets.filter(wallet => wallet.linked).length
  }, [filteredWallets])

  // Auto-connect logic
  useEffect(() => {
    if (autoConnect && ready && !authenticated && !isConnected) {
      connectWallet()
    }
  }, [autoConnect, ready, authenticated, isConnected, connectWallet])

  // Wallet actions
  const switchWallet = useCallback((wallet: ConnectedWallet) => {
    // Implementation would depend on your wallet switching logic
    console.log('Switching to wallet:', wallet.address)
  }, [])

  const disconnect = useCallback(() => {
    logout()
  }, [logout])

  const connect = useCallback(() => {
    connectWallet()
  }, [connectWallet])

  return {
    wallets: transformedWallets,
    activeWallet,
    privyWallet,
    externalWallet,
    smartWallet,
    isConnected,
    isReady: ready,
    isUsingSmartWallet,
    connectionCount,
    switchWallet,
    disconnect,
    connect,
  }
}

/**
 * Preset configurations for common use cases
 */
export const WALLET_HOOK_PRESETS = {
  /**
   * Gaming-focused wallet hook
   */
  gaming: (): WalletHookConfig => ({
    preferSmartWallet: true,
    autoConnect: false,
    connectionValidator: wallet => wallet.linked,
    walletFilter: wallet =>
      ['metamask', 'coinbase_wallet', 'rainbow', 'wallet_connect'].includes(wallet.connectorType),
  }),

  /**
   * Mobile-optimized wallet hook
   */
  mobile: (): WalletHookConfig => ({
    preferSmartWallet: true,
    autoConnect: true,
    includeUnlinked: false,
    walletFilter: wallet =>
      ['embedded', 'metamask', 'coinbase_wallet', 'wallet_connect'].includes(wallet.connectorType),
  }),

  /**
   * Desktop-focused wallet hook
   */
  desktop: (): WalletHookConfig => ({
    preferSmartWallet: false,
    autoConnect: false,
    includeUnlinked: true,
    connectionValidator: wallet => wallet.linked,
  }),

  /**
   * DeFi-focused wallet hook
   */
  defi: (): WalletHookConfig => ({
    preferSmartWallet: false,
    autoConnect: false,
    walletFilter: wallet =>
      ['metamask', 'rainbow', 'safe', 'zerion'].includes(wallet.connectorType),
  }),

  /**
   * Simple wallet hook for basic use cases
   */
  simple: (): WalletHookConfig => ({
    preferSmartWallet: true,
    autoConnect: true,
    includeUnlinked: false,
    walletFilter: wallet =>
      wallet.connectorType === 'embedded' || wallet.connectorType === 'metamask',
  }),

  /**
   * Enterprise wallet hook with strict validation
   */
  enterprise: (): WalletHookConfig => ({
    preferSmartWallet: false,
    autoConnect: false,
    includeUnlinked: false,
    connectionValidator: wallet => wallet.linked,
    walletFilter: wallet => ['metamask', 'coinbase_wallet', 'safe'].includes(wallet.connectorType),
  }),
}

/**
 * Convenience hooks for common use cases
 */
export const useGamingWallet = () => useAdaptiveWallet(WALLET_HOOK_PRESETS.gaming())
export const useMobileWallet = () => useAdaptiveWallet(WALLET_HOOK_PRESETS.mobile())
export const useDesktopWallet = () => useAdaptiveWallet(WALLET_HOOK_PRESETS.desktop())
export const useDefiWallet = () => useAdaptiveWallet(WALLET_HOOK_PRESETS.defi())
export const useSimpleWallet = () => useAdaptiveWallet(WALLET_HOOK_PRESETS.simple())
export const useEnterpriseWallet = () => useAdaptiveWallet(WALLET_HOOK_PRESETS.enterprise())
