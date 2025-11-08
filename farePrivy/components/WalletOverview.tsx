import { useMemo } from 'react'
import { BORDER_COLORS, FARE_COLORS } from '@/design'
import { useActiveWallet } from '@/components/farePrivy/hooks'
import { SVGS } from '@/assets'
import { styled } from 'styled-components'
import { switchWalletState } from '@/components/farePrivy/store/switchWallet'
import { useIsBreakpoint } from '@/hooks/common/useIsBreakpoint'

const SWalletOverview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  margin-right: 12px;
  height: 42px;
  border: 1px solid ${BORDER_COLORS.one};
  color: #aaaaaa;
  border-radius: 6px;
  user-select: none;
  transition: all ease-in-out 0.08s;
  &:hover {
    span {
      color: white;
    }
    border-color: ${FARE_COLORS.blue};
  }

  img {
    height: 16px;
    margin-right: 8px;
  }

  span {
    text-transform: uppercase;
    color: #aaaaaa;
  }

  @media (max-width: 760px) {
    display: flex;
    align-items: center;
    margin: 0 16px 4px;
    text-wrap: nowrap;
  }
`

export const WalletOverview = () => {
  const { activeWallet } = useActiveWallet()
  const isTabletScreen = useIsBreakpoint('lg')
  const isMobileScreen = useIsBreakpoint('xs')

  const walletIcon = useMemo(() => {
    return activeWallet?.meta.icon ? activeWallet?.meta.icon : SVGS.privyIcon
  }, [activeWallet])

  return (
    <SWalletOverview
      onClick={() => {
        switchWalletState.isWalletModalOpen = true
      }}
    >
      <img alt={activeWallet?.meta.name || 'wallet'} src={walletIcon} />
      {isMobileScreen && <span>{activeWallet?.meta.name}</span>}
      {!isTabletScreen && <span>{activeWallet?.meta.name}</span>}
    </SWalletOverview>
  )
}
