import React from 'react'

export interface PrivyProviderProps {
  children: React.ReactNode
  appId?: string
  clientId?: string
  config?: any
  smartWalletConfig?: any
  disableSmartWallets?: boolean
}

/**
 * Simplified PrivyProvider for testing
 * This is a minimal implementation for package testing
 */
export const PrivyProvider: React.FC<PrivyProviderProps> = ({ 
  children,
  appId,
  clientId,
  config,
  smartWalletConfig,
  disableSmartWallets
}) => {
  console.log('PrivyProvider initialized with:', {
    appId,
    clientId,
    hasConfig: !!config,
    hasSmartWalletConfig: !!smartWalletConfig,
    disableSmartWallets
  })

  // For testing purposes, just render children
  // In production, this would wrap with actual Privy providers
  return (
    <div data-testid="privy-provider">
      {children}
    </div>
  )
}