import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import numeral from 'numeral'
import { SVGS } from '@/assets'
import { FARE_COLORS, FONT_STYLES, SPACING, TEXT_COLORS } from '@/design'
import { deviceBP } from '@/design/breakpoints'
import { useActiveWallet } from '@/components/farePrivy/hooks'
import { noUserSelect } from '@/style'
import useCurrencyStore from '../../../../store/useCurrencyStore'
import { CopyWalletInput } from '@/components/Modals/OnboardingModal/CopyWalletInput'

const DepositBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1c1c1e;
  ${noUserSelect}

  @media ${deviceBP.sm} {
    width: 100%;
  }

  .balance-received {
    color: ${FARE_COLORS.aqua};
  }

  .balance-display {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 12px;
  }
`

const DepositTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: white;
  line-height: 1.25;
  font-family: system-ui, sans-serif;
  margin-bottom: ${SPACING.md}px;

  @media ${deviceBP.sm} {
    font-size: 18px;
    margin-inline: 12px;
  }
`
const BubbleWrapper = styled.div`
  display: inline-flex;
  gap: ${SPACING.xs}px;
  background-color: rgba(118, 118, 128, 0.18);
  padding: ${SPACING.xs}px ${SPACING.sm}px;
  border-radius: 10rem;
  width: fit-content;
  align-items: center;
  justify-content: center;
  font-size: ${FONT_STYLES.sm};

  &.arbitrumBubble,
  &.currencyBubble {
    font-family: system-ui, sans-serif;
    padding: 4px 8px;
    gap: 4px;
    margin: 2px 0 0 8px;
  }
  &.arbitrumBubble {
    @media ${deviceBP.sm} {
      margin-left: 0;
    }
  }
`

const DepositContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 16px 16px 0;
  font-size: 16px;
  gap: ${SPACING.xs}px;
  color: ${TEXT_COLORS.two};
  line-height: 1.25;

  p {
    margin: 8px 0;
    font-family: system-ui, sans-serif;
  }

  @media ${deviceBP.sm} {
    font-size: ${FONT_STYLES.sm};
    margin-inline: 12px;
    word-wrap: break-word;
  }
`

const SBalanceDisplay = styled.div`
  font-family: system-ui, sans-serif;
  margin-block: 12px;
`

export const TransferModalFunds = () => {
  const { appChainConfig } = useActiveWallet()
  const { networkStyle } = appChainConfig
  const selectedCurrencyBalance = useCurrencyStore(state => state.balances.currency)
  const [prevBalance, setPrevBalance] = useState(selectedCurrencyBalance)
  const [balanceDifference, setBalanceDifference] = useState('0.00')

  useEffect(() => {
    if (selectedCurrencyBalance !== prevBalance) {
      setBalanceDifference(
        numeral(selectedCurrencyBalance)
          .subtract(prevBalance || '0')
          .format('0,0.00')
      )
      setPrevBalance(selectedCurrencyBalance)
    }
  }, [selectedCurrencyBalance, prevBalance])

  return (
    <DepositBoxWrapper>
      <DepositTitle>Deposit {networkStyle.currencyName} (Arbitrum)</DepositTitle>
      <BubbleWrapper>
        <img src={SVGS.coinbaseCoinLogo} width={18} alt='coinbase logo' />
        <img src={SVGS.binanceCircleIcon} width={18} alt='binance logo' />
        <img src={SVGS.krakenIcon} width={18} alt='kraken logo' />
      </BubbleWrapper>
      <DepositContent>
        <p>
          Buy {networkStyle.currencyName} on Coinbase, Binance, or another exchange.
          <BubbleWrapper className='currencyBubble'>
            <img src={networkStyle.currencyIcon} width={14} alt={networkStyle.currencyName} />{' '}
            {networkStyle.currencyName}
          </BubbleWrapper>
        </p>
        <p>
          Send/Withdraw {networkStyle.currencyName} to the address below and select ARBITRUM as the
          network.
          <BubbleWrapper className='arbitrumBubble'>
            <img src={networkStyle.networkLogo} width={14} alt='network logo' />
            ARBITRUM
          </BubbleWrapper>
        </p>
      </DepositContent>
      <div className='balance-received'>
        {balanceDifference !== '0.00' &&
          `Received: ${balanceDifference} ${networkStyle.currencyName}`}
      </div>
      <CopyWalletInput />
      <SBalanceDisplay>
        {networkStyle.currencyName} balance: {numeral(selectedCurrencyBalance).format('0,0.00')}
      </SBalanceDisplay>
    </DepositBoxWrapper>
  )
}
