import { useMemo, useEffect, useCallback } from 'react'
import { createWalletClient, custom, type Hex, http } from 'viem'
import useMaxValues from "../hooks/useMaxValues"
import { useActiveWallet } from "../hooks"
import { useAppChainConfigStore } from "../store/useAppChainConfigStore"
import useCurrencyStore from "../store/useCurrencyStore"
import useSUContractStore from "../store/useSUContractStore"
import {
  toNexusAccount,
  createSmartAccountClient,
  createBicoPaymasterClient,
  safeMultiplier,
  toBiconomySponsoredPaymasterContext,
  getK1NexusAddress,
} from '@biconomy/abstractjs'
import { usePrivy } from '@privy-io/react-auth'
import { createPublicClient } from 'viem'

export const PrivyQuickplaySmartWalletListener = () => {
  const { smartWalletAddress, linkedWallets } = useActiveWallet()
  const { ready, authenticated } = usePrivy()
  const {
    biconomyConfig: { bundlerUrl, paymasterUrl },
    chainDefinition,
  } = useAppChainConfigStore.use.appChainConfig()

  const { appContracts } = useAppChainConfigStore(state => ({
    appContracts: state.appContracts,
  }))

  const { smartWalletAllowance } = useCurrencyStore(state => ({
    smartWalletAllowance: state.allowances.currency,
  }))

  const { setApprovedGameState, hasApprovedSmartWalletGameContracts } = useSUContractStore(
    state => ({
      setApprovedGameState: state.setApprovedGameState,
      hasApprovedSmartWalletGameContracts: state.hasApprovedSmartWalletGameContracts,
    })
  )
  const { fetchAndSetSCMaxValues } = useMaxValues()

  const publicClient = useMemo(
    () => createPublicClient({ chain: chainDefinition, transport: http() }),
    [chainDefinition]
  )

  const checkApprovedGameContracts = useCallback(async (): Promise<boolean> => {
    if (
      !appContracts?.bankroll ||
      !appContracts?.vault ||
      !smartWalletAddress ||
      !ready ||
      !authenticated
    )
      return false

    useSUContractStore.setState({
      hasApprovedSmartWalletGameContracts: 'pending',
    })

    try {
      const isApproved = await appContracts.ws.bankroll.isValidContractForFundOwner(
        appContracts.vault.address,
        smartWalletAddress
      )

      fetchAndSetSCMaxValues(smartWalletAddress)

      setApprovedGameState(isApproved ? 'approved' : 'not-approved')
      useSUContractStore.setState({
        hasApprovedSmartWalletGameContracts: isApproved ? 'approved' : 'not-approved',
      })

      return isApproved
    } catch (err) {
      console.error(err)
      useSUContractStore.setState({
        hasApprovedSmartWalletGameContracts: 'not-approved',
      })
    }

    return false
  }, [appContracts, fetchAndSetSCMaxValues, smartWalletAddress, ready, authenticated])

  useEffect(() => {
    if (!ready || !authenticated || !smartWalletAddress) return

    useAppChainConfigStore.setState({
      hasSetupSmartWallet: Boolean(
        smartWalletAddress &&
          hasApprovedSmartWalletGameContracts === 'approved' &&
          Number(smartWalletAllowance) > 0
      ),
    })
  }, [
    hasApprovedSmartWalletGameContracts,
    smartWalletAllowance,
    smartWalletAddress,
    ready,
    authenticated,
  ])

  const paymaster = useMemo(
    () =>
      createBicoPaymasterClient({
        paymasterUrl,
      }),
    [paymasterUrl]
  )

  const paymasterContext = useMemo(
    () => toBiconomySponsoredPaymasterContext({ mode: 'SPONSORED' }),
    [appContracts]
  )

  useEffect(() => {
    const embeddedWallet = linkedWallets.find(wallet => wallet.walletClientType === 'privy')
    const externalWallet = linkedWallets.find(wallet => wallet.connectorType !== 'embedded')
    const selectedWallet = embeddedWallet || externalWallet

    if (selectedWallet) {
      ;(async () => {
        const ethereumProvider = await selectedWallet.getEthereumProvider()
        const provider = createWalletClient({
          account: selectedWallet.address as Hex,
          chain: chainDefinition,
          transport: custom(ethereumProvider),
        })
        const nexusAccount = await toNexusAccount({
          signer: provider,
          chain: chainDefinition,
          transport: http(),
        })

        getK1NexusAddress({
          signerAddress: '0x5a3e25405d7825c54fa6bf28a5ed122a30f31195',
          publicClient: publicClient,
        })
          .then(console.log)
          .catch(console.error)

        const nexusClient = createSmartAccountClient({
          account: nexusAccount,
          transport: http(bundlerUrl),
          paymaster,
          paymasterContext,
          userOperation: {
            estimateFeesPerGas: async _ => {
              const feeData = await publicClient.estimateFeesPerGas()
              return {
                maxFeePerGas: safeMultiplier(feeData.maxFeePerGas, 1.25),
                maxPriorityFeePerGas: safeMultiplier(feeData.maxPriorityFeePerGas, 1.25),
              }
            },
          },
        })
        useAppChainConfigStore.setState({ nexusClient })
      })()
    }
  }, [linkedWallets, chainDefinition, bundlerUrl, paymaster, paymasterContext])

  return null
}
