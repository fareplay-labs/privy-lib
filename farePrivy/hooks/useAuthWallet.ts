import * as Sentry from '@sentry/react'
import { useRef, useState, useEffect, useCallback } from 'react'
import {
  useConnectWallet,
  useLinkAccount,
  useLogin,
  useLogout,
  usePrivy,
} from '@privy-io/react-auth'

import { usePrivyService } from './usePrivyService'
import { useActiveWallet } from './useActiveWallet'
import { useAuthenticatedUser } from './useIsUserAuthenticated'
import { useAppChainConfigStore } from "../store/useAppChainConfigStore"
import { usePostLog } from "../lib/posthog/logging"
import { useSupportModal } from "../hooks/useSupportModal"

export const useAuthWallet = () => {
  const { activeWallet } = useActiveWallet()
  const { isWalletAuthed, isConnectedUserALinkedAccount } = useAuthenticatedUser()
  const sessionVerifyState = useAppChainConfigStore.use.sessionVerifyState()
  const { user } = usePrivy()
  const { privyFareLogout } = usePrivyService()
  const shouldPromptLoginRef = useRef(false)
  const [shouldPromptLogin, setShouldPromptLogin] = useState(false)
  const { postlog } = usePostLog()
  const { showSupportModal } = useSupportModal()
  const { login: privyAppLogin } = useLogin({
    onComplete(...privyLoginParams) {
      postlog(`privy_login_complete`, {
        loglevel: 'success',
        eventName: `privy_login_complete`,
        privyLoginParams,
      })

      if (privyLoginParams[0].user.wallet) {
        Sentry.setUser({
          id: privyLoginParams[0].user.wallet.address,
        })

        // Trigger addressable event for wallet connection
        window.__adrsbl.run('privy_wallet_connected', true, [
          { name: 'walletAddress', value: privyLoginParams[0].user.wallet.address },
          {
            name: 'smartWalletAddress',
            value: privyLoginParams[0].user.smartWallet?.address || null,
          },
          { name: 'loginMethod', value: 'privy_login' },
          { name: 'pageUrl', value: location.pathname },
        ])

        window.__adrsbl.run(`privy_${privyLoginParams[0].loginMethod}_login`, true, [
          { name: 'walletAddress', value: privyLoginParams[0].user.wallet.address },
          {
            name: 'smartWalletAddress',
            value: privyLoginParams[0].user.smartWallet?.address || null,
          },
          { name: 'loginMethod', value: privyLoginParams[0].loginMethod },
          { name: 'pageUrl', value: location.pathname },
        ])
      }
    },
    onError(privyError) {
      postlog(`privy_login_error`, {
        loglevel: 'error',
        eventName: `privy_login_error`,
        privyError,
      })
      showSupportModal()
    },
  })

  useConnectWallet({
    onSuccess: wallet => {
      postlog(`privy_connected_external_wallet`, {
        loglevel: 'success',
        eventName: `privy_connected_external_wallet`,
        wallet,
      })

      // Trigger addressable event for wallet connection
      window.__adrsbl.run('privy_wallet_connected', true, [
        { name: 'walletAddress', value: wallet.wallet.address },
        { name: 'loginMethod', value: 'external_wallet' },
        { name: 'pageUrl', value: location.pathname },
      ])
    },
    onError: error => {
      // Any logic you'd like to execute after a user exits the connection flow or there is an error
      postlog(`privy_connect_wallet_error`, {
        loglevel: 'error',
        eventName: `privy_connect_wallet_error`,
        error,
      })
      showSupportModal()
    },
  })

  const { logout: privyAppLogout } = useLogout({
    onSuccess() {
      if (shouldPromptLoginRef.current) {
        shouldPromptLoginRef.current = false
        setShouldPromptLogin(true)
      }
    },
  })

  const { linkWallet } = useLinkAccount({
    onSuccess: ({ user, linkMethod, linkedAccount }) => {
      // Any logic you'd like to execute if the user successfully links an account while this
      // component is mounted
      postlog(`privy_linked_account`, {
        loglevel: 'success',
        eventName: `privy_linked_account`,
        user,
        linkMethod,
        linkedAccount,
      })

      window.__adrsbl.run('privy_wallet_linked', true, [
        { name: 'walletAddress', value: user.wallet?.address || null },
        { name: 'smartWalletAddress', value: user.smartWallet?.address || null },
        { name: 'loginMethod', value: 'privy_link_account' },
        { name: 'pageUrl', value: location.pathname },
      ])
    },
    onError: (error, details) => {
      if (details.linkMethod === 'siwe' && error === 'linked_to_another_user') {
        shouldPromptLoginRef.current = true
        privyAppLogout()
      }
      postlog(`privy_link_account_error`, {
        loglevel: 'error',
        eventName: `privy_link_account_error`,
        error,
        details,
      })
      showSupportModal()
    },
  })

  useEffect(() => {
    if (shouldPromptLogin) {
      setShouldPromptLogin(false)
      privyAppLogin()
    }
  }, [shouldPromptLogin, privyAppLogin])

  const logout = useCallback(async () => {
    await privyAppLogout()
    await privyFareLogout()
    useAppChainConfigStore.getState().setSessionVerifyState('pending')
  }, [privyAppLogout, privyFareLogout])

  const linkWalletToUser = useCallback(async () => {
    try {
      if (activeWallet) {
        try {
          linkWallet()
        } catch (err) {
          console.error(err)
          showSupportModal()
        }
      }
    } catch (err) {
      console.error(err)
      showSupportModal()
    }
  }, [activeWallet, linkWallet, showSupportModal])

  const linkOrLoginWallet = useCallback(async () => {
    try {
      if (activeWallet && isConnectedUserALinkedAccount) {
        try {
          shouldPromptLoginRef.current = true
          privyAppLogout()
        } catch (err) {
          console.error(err)
        }
      } else if (activeWallet && !isConnectedUserALinkedAccount) {
        shouldPromptLoginRef.current = true
        privyAppLogout()
      } else if (!activeWallet && !isConnectedUserALinkedAccount && user) {
        shouldPromptLoginRef.current = true
        privyAppLogout()
      } else {
        privyAppLogin()
      }
    } catch (err) {
      console.error(err)
    }
  }, [activeWallet, isConnectedUserALinkedAccount, privyAppLogout, user, privyAppLogin])

  return {
    logout,
    linkOrLoginWallet,
    linkWalletToUser,
    isWalletAuthed,
    sessionVerifyState,
  }
}
