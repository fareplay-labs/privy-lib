import { ButtonEnum } from "../components/shared/Button"
import ModalCard from "../components/shared/Modal/Card"
import { usePrivy } from '@privy-io/react-auth'
import { useSnapshot } from 'valtio'
import useCurrencyStore from '../../../../store/useCurrencyStore'
import CountUp from 'react-countup'
import { SVGS } from '../../../../assets'
import { WithdrawInput } from './WithdrawInput'
import { useNetworkStyle } from '../../../../hooks/useCurrency'
import { addAppNoti } from '../../../../store/useNotiStore'
import { usePostLog } from '../../../../lib/posthog/logging'
import { useAppChainConfigStore } from '../../../../store/useAppChainConfigStore'
import { useQuickplaySmartWallet } from '../../../../hooks/useQuickplaySmartWallet'
import { createBicoPaymasterClient } from '@biconomy/sdk'
import { encodeFunctionData, parseAbi, parseUnits } from 'viem'
import { useWithdrawPrivyModalState, withdrawPrivyModalState } from './withdrawPrivyModalState'
import { WithdrawalButton } from '../../../Modals/styles'
import { useState, useCallback, useEffect } from 'react'
import usdcIcon from "../assets/svg/usdc.svg"
import { useActiveWallet } from "../../hooks/useActiveWallet"
import {
  SBalanceContent,
  SButton,
  SButtonRow,
  SDivider,
  SExportHelper,
  SExportWalletButton,
  SInput,
  SInputWrapper,
  SModalContent,
  SModalDescription,
  SSectionDescription,
  SStepLabel,
  SSupportingText,
  SWithdrawalContent,
} from './styles'

export const WithdrawPrivyModal = () => {
  const { exportWallet } = usePrivy()
  const networkStyle = useNetworkStyle()
  const { isVisible } = useSnapshot(withdrawPrivyModalState)
  const { setWithdrawPrivyModal } = useWithdrawPrivyModalState()
  const { balances } = useCurrencyStore()
  const [selectedToken, setSelectedToken] = useState<'FARE' | 'USDC'>('FARE')
  const fareBalance = Number(balances.currency)
  const usdcBalance = Number(balances.usdc)
  const { privyWallet, isUsingSmartWallet } = useActiveWallet()
  const privyWalletAddress = privyWallet?.address || ''
  const [receiverAddress, setReceiverAddress] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [isSendingTx, setIsSendingTx] = useState(false)
  const { postlog } = usePostLog()
  const { appContracts, walletChainId, appChainConfig } = useAppChainConfigStore(state => ({
    appContracts: state.appContracts,
    walletChainId: state.appChainId,
    appChainConfig: state.appChainConfig,
  }))
  const { smartWalletAddress, smartWalletClient } = useQuickplaySmartWallet()

  // Token config
  const tokenConfig =
    selectedToken === 'FARE' ?
      {
        balance: fareBalance,
        decimals: networkStyle.decimals,
        name: networkStyle.currencyName,
        icon: networkStyle.currencyIcon,
        contract: appContracts?.currency?.address as `0x${string}`,
        nativeToken: 'FARE',
      }
    : {
        balance: usdcBalance,
        decimals: 6,
        name: 'USDC',
        icon: usdcIcon,
        contract: appContracts?.usdc?.address as `0x${string}`,
        nativeToken: 'USDC',
      }

  const withdrawFromWallet = useCallback(async () => {
    if (!smartWalletAddress || !appContracts || !smartWalletClient) {
      return addAppNoti({
        msg: "You don't have a quickplay wallet",
        type: 'error',
      })
    }
    if (!receiverAddress) {
      return addAppNoti({
        msg: 'Please enter address',
        type: 'error',
      })
    }
    try {
      setIsSendingTx(true)
      const amount = String(withdrawAmount)
      const contractAddress = tokenConfig.contract
      const transferTxData = encodeFunctionData({
        abi: parseAbi(['function transfer(address,uint256)']),
        functionName: 'transfer',
        args: [
          receiverAddress as any, // who
          parseUnits(String(amount), tokenConfig.decimals), // multiplier
        ],
      })
      const transferTx = {
        to: contractAddress,
        data: transferTxData,
      }
      const transferSmartWalletTx = {
        account: smartWalletClient.account,
        calls: [transferTx],
        paymaster: createBicoPaymasterClient({
          paymasterUrl: appChainConfig.biconomyConfig.paymasterUrl,
        }),
        chain: appChainConfig.chainDefinition,
      }
      const transferTxHash = await smartWalletClient.sendTransaction(transferSmartWalletTx)
      postlog(`user_withdrew_${selectedToken.toLowerCase()}_from_privy_wallet`, {
        loglevel: 'success',
        eventName: `user_withdrew_${selectedToken.toLowerCase()}_from_privy_wallet`,
        to: contractAddress,
        chainId: walletChainId,
        from: smartWalletAddress,
        amount,
        txHash: transferTxHash,
      })
      addAppNoti({
        msg: `Sent ${tokenConfig.nativeToken}`,
        type: 'success',
      })
    } catch (err) {
      console.error(err)
      addAppNoti({
        msg: 'Issue with withdraw tx',
        type: 'error',
      })
    } finally {
      setIsSendingTx(false)
    }
  }, [
    smartWalletAddress,
    appContracts,
    smartWalletClient,
    receiverAddress,
    withdrawAmount,
    tokenConfig,
    appChainConfig.biconomyConfig.paymasterUrl,
    appChainConfig.chainDefinition,
    postlog,
    walletChainId,
    selectedToken,
  ])

  // Default the withdraw address to the privy EOA wallet address on modal open
  useEffect(() => {
    if (isVisible) {
      if (privyWallet && isUsingSmartWallet && privyWalletAddress) {
        setReceiverAddress(privyWalletAddress)
      } else {
        setReceiverAddress('')
      }
    }
  }, [isVisible, privyWallet, isUsingSmartWallet, privyWalletAddress])

  if (!isVisible) return null

  return (
    <ModalCard
      title='Withdraw Quickplay Wallet Funds'
      description={
        <SModalDescription>
          You can withdraw any of your funds in your Quickplay Smart Wallet to your external wallet,
          at any time.
        </SModalDescription>
      }
      isVisible={isVisible}
      setIsVisible={setWithdrawPrivyModal}
      className='fund-modal-content'
    >
      <SModalContent>
        <SStepLabel>1. Choose currency</SStepLabel>
        <SButtonRow>
          <SButton
            buttonType={ButtonEnum.BASE}
            disabled={false}
            selectedToken={selectedToken === 'FARE'}
            onClick={() => setSelectedToken('FARE')}
          >
            FARE
          </SButton>
          <SButton
            buttonType={ButtonEnum.BASE}
            disabled={false}
            selectedToken={selectedToken === 'USDC'}
            onClick={() => setSelectedToken('USDC')}
          >
            USDC
          </SButton>
        </SButtonRow>
        <SDivider style={{ marginTop: '18px' }} />

        <SWithdrawalContent>
          <SStepLabel>2. Withdraw address</SStepLabel>
          <SInputWrapper style={{ marginBottom: 6 }}>
            <SInput
              placeholder='Withdraw address...'
              value={receiverAddress}
              onChange={event => setReceiverAddress(event.currentTarget.value)}
            />
          </SInputWrapper>
          {privyWallet && isUsingSmartWallet ?
            <SSupportingText>
              This is your Privy Wallet (non-smart wallet). You can withdraw funds from your
              Quickplay Smart Wallet to this address, or enter any other address.
            </SSupportingText>
          : <SSupportingText>Enter the address you want to withdraw to.</SSupportingText>}
          <SDivider />

          <SStepLabel style={{ marginBottom: 0 }}>3. Enter amount to withdraw</SStepLabel>
          <SBalanceContent className='balance-content-column'>
            <SSectionDescription>
              Your current balance to withdraw:
              <CountUp
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  color: 'white',
                }}
                end={tokenConfig.balance}
                decimals={2}
                duration={2}
                separator={','}
                preserveValue
              />
            </SSectionDescription>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <WithdrawInput
                decimals={tokenConfig.decimals}
                amount={withdrawAmount}
                setAmount={setWithdrawAmount}
                tokenName={tokenConfig.name}
                tokenIcon={tokenConfig.icon}
                max={tokenConfig.balance}
              />
            </div>
          </SBalanceContent>
          <SDivider />

          <SStepLabel>4. Withdraw funds</SStepLabel>
          <WithdrawalButton
            buttonType={ButtonEnum.BASE}
            type='button'
            isLoading={isSendingTx}
            onClick={withdrawFromWallet}
            disabled={withdrawAmount <= 0 || isSendingTx}
            style={{ marginTop: 8 }}
          >
            <span>
              {receiverAddress === privyWalletAddress ?
                'Withdraw to Privy Wallet'
              : 'Withdraw to Address'}
            </span>
            <img src={SVGS.depositWallet} alt='deposit wallet' />
          </WithdrawalButton>
        </SWithdrawalContent>

        {privyWallet && isUsingSmartWallet && (
          <>
            <SDivider />
            <SStepLabel>5. Export your Privy Wallet</SStepLabel>
            <SExportWalletButton
              buttonType={ButtonEnum.BASE}
              type='button'
              disabled={false}
              onClick={exportWallet}
              isLoading={false}
            >
              <span>Export Privy Wallet</span>
            </SExportWalletButton>
            <SExportHelper>
              Privy will display your wallet&apos;s private key so you can import it into another
              web3 crypto wallet, like MetaMask.
            </SExportHelper>
          </>
        )}
      </SModalContent>
    </ModalCard>
  )
}
