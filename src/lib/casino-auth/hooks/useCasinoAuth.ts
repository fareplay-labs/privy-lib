/**
 * Casino Auth Hook
 * Provides casino authentication state and utilities
 */

import { useUser, useWallets } from '@privy-io/react-auth'
import { useMemo } from 'react'
import type {
  CasinoAuthConfig,
  CasinoContext,
  CasinoUser,
  CasinoWallet,
  CasinoPermissions,
} from '../types'

export const useCasinoAuth = (config: CasinoAuthConfig): CasinoContext => {
  const { user } = useUser()
  const { wallets } = useWallets()

  // Transform Privy user to casino user
  const casinoUser: CasinoUser | null = useMemo(() => {
    if (!user) return null

    return {
      id: user.id,
      address: user.wallet?.address || '',
      privyUserId: user.id,
      profile: {
        email: user.email?.address,
      },
      stats: {
        gamesPlayed: 0, // Would come from your API
        totalWagered: 0,
        totalWon: 0,
        joinedAt: user.createdAt ? new Date(user.createdAt) : new Date(),
      },
    }
  }, [user])

  // Transform wallet state
  const casinoWallet: CasinoWallet | null = useMemo(() => {
    const activeWallet = wallets.find(w => w.connectorType !== 'embedded') || wallets[0]
    if (!activeWallet) return null

    return {
      address: activeWallet.address,
      chainId: activeWallet.chainId ? parseInt(activeWallet.chainId.split(':')[1]) : 1,
      type: activeWallet.connectorType === 'embedded' ? 'embedded' : 'external',
      provider: activeWallet.connectorType,
      isConnected: true,
      canSubmitGameTransactions: true, // or add logic to determine this value
      // balance would be fetched separately
    }
  }, [wallets])

  // Determine permissions based on config and user state
  const permissions: CasinoPermissions = useMemo(() => {
    const basePermissions: CasinoPermissions = {
      canPlay: !!casinoUser && !!casinoWallet,
      canWithdraw: !!casinoUser && !!casinoWallet,
      canDeposit: !!casinoUser && !!casinoWallet,
      canAccessCustomGames: config.features.customGames && !!casinoUser,
      canModifySettings: !!casinoUser,
    }

    return basePermissions
  }, [config.features.customGames, casinoUser, casinoWallet])

  return {
    config,
    isCustomCasino: config.slug !== 'fareplay' && config.slug !== 'main',
    user: casinoUser,
    wallet: casinoWallet,
    permissions,
  }
}
