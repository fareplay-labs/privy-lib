import { useMemo } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useActiveWallet } from './useActiveWallet'

export const useAuthenticatedUser = () => {
  const { activeWallet, isWalletAuthed } = useActiveWallet()
  const { user } = usePrivy()

  const isConnectedUserALinkedAccount = useMemo(() => {
    if (!user || !activeWallet) return false
    return activeWallet.linked
  }, [user, activeWallet])

  return {
    isWalletAuthed,
    isConnectedUserALinkedAccount,
  }
}
