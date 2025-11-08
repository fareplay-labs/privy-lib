import { useMemo } from 'react'
import { appChainIdMap, DEFAULT_APP_CHAIN_ID } from '@/chains'
import { type SupportedAppChainId } from '@/chains/types'
import { useAppChainConfigStore } from '@/store/useAppChainConfigStore'
import { type ConnectedWallet, usePrivy, useWallets } from '@privy-io/react-auth'
export interface ISmartConnectedWallet extends ConnectedWallet {
  smartWalletAddress?: string
  privyWalletAddress?: string
  getEthereumProvider: () => Promise<any>
}

export const useActiveWallet = () => {
  const { ready, authenticated } = usePrivy()
  const { wallets: unlinkedWallets } = useWallets()
  const wallets = useMemo(() => unlinkedWallets.filter(wallet => wallet.linked), [unlinkedWallets])
  const isUsingSmartWallet = useAppChainConfigStore.use.isUsingSmartWallet()
  const smartWalletClient = useAppChainConfigStore.use.nexusClient()
  const isWrongNetwork = useAppChainConfigStore.use.isWrongNetwork()
  const linkedWallets = useMemo(() => wallets.filter(wallet => wallet.linked), [wallets])

  const privyWallet = useMemo(() => {
    if (!ready || !authenticated) return null

    const wallet = linkedWallets.find(wallet => wallet.connectorType === 'embedded')

    return wallet || null
  }, [linkedWallets, ready, authenticated])

  const externalWallet = useMemo((): ConnectedWallet | null => {
    if (!ready || !authenticated) return null

    const wallet = linkedWallets.find(wallet => wallet.connectorType !== 'embedded')
    return wallet || null
  }, [linkedWallets, ready, authenticated])
  const activeWallet = useMemo(() => {
    if (!ready || !authenticated) return null
    if (!smartWalletClient && isUsingSmartWallet) return null

    let selectedWallet: ISmartConnectedWallet | null | undefined =
      externalWallet ? ({ ...externalWallet } as any) : null

    if (isUsingSmartWallet) {
      selectedWallet = privyWallet ? ({ ...privyWallet } as any) : null
      if (selectedWallet && smartWalletClient) {
        selectedWallet.smartWalletAddress = smartWalletClient.account.address
        selectedWallet.privyWalletAddress = selectedWallet.address
        selectedWallet.address = smartWalletClient.account.address
      }
    }

    return selectedWallet || null
  }, [linkedWallets, ready, authenticated, smartWalletClient, isUsingSmartWallet])

  const walletChainId = useMemo(
    () => (activeWallet ? Number(activeWallet.chainId.split(':')[1]) : 0),
    [activeWallet]
  )

  const isWalletAuthed = useMemo(() => Boolean(activeWallet), [activeWallet])

  const walletAddress = useMemo(() => activeWallet?.address || '', [activeWallet])

  const smartWalletAddress = useMemo(() => smartWalletClient?.account.address, [smartWalletClient])

  const appChainConfig = useMemo(
    () =>
      appChainIdMap[walletChainId as SupportedAppChainId] || appChainIdMap[DEFAULT_APP_CHAIN_ID],
    [walletChainId]
  )

  const readyAndAuth = useMemo(() => ready && authenticated, [ready, authenticated])

  return useMemo(
    () => ({
      privyWallet,
      externalWallet,
      activeWallet,
      walletChainId,
      isWalletAuthed,
      walletAddress,
      appChainConfig,
      smartWalletAddress,
      smartWalletClient,
      isWrongNetwork,
      isUsingSmartWallet,
      ready,
      authenticated,
      readyAndAuth,
      linkedWallets,
    }),
    [
      privyWallet,
      externalWallet,
      activeWallet,
      walletChainId,
      isWalletAuthed,
      walletAddress,
      appChainConfig,
      smartWalletAddress,
      smartWalletClient,
      isWrongNetwork,
      isUsingSmartWallet,
      ready,
      authenticated,
      readyAndAuth,
      linkedWallets,
    ]
  )
}

export const usePrivyTwitterData = () => {
  const { user } = usePrivy()

  return useMemo(() => {
    return user?.twitter
  }, [user?.twitter])
}
