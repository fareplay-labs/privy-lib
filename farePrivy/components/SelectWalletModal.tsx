import React, { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useSnapshot } from 'valtio'
import { switchWalletState } from '@/components/farePrivy/store/switchWallet'
import * as privyReactAuth from '@privy-io/react-auth'
import { PNGS, SVGS } from '@/assets'
import { useAppChainConfigStore } from '@/store/useAppChainConfigStore'
import { FARE_GRADIENT } from '../../shared/Header/style'
import { deviceBP } from '@/design/breakpoints'
import { useIsBreakpoint } from '@/hooks/common/useIsBreakpoint'
import { useAuthWallet } from '@/components/farePrivy/hooks/useAuthWallet'
import { usePostLog } from '@/lib/posthog/logging'

const { usePrivy, useWallets } = privyReactAuth

const SSelectWalletModal = styled(motion.div)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.48);
  z-index: 999;
  backdrop-filter: blur(4px);

  @media (${deviceBP.sm}) {
    align-items: flex-end;
    height: 100svh;
  }
`

export const modalVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

const modalContentVariants: Variants = {
  initial: {
    y: -60,
  },
  animate: {
    y: 0,
  },
  exit: {
    y: -60,
  },
}

const mobileModalContentVariants: Variants = {
  initial: {
    y: '110%',
    opacity: 1,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      damping: 25,
      type: 'spring',
    },
  },
  exit: {
    y: '110%',
    opacity: 0.8,
    transition: {
      damping: 25,
      type: 'spring',
    },
  },
}

export const SGradientWalletModalContent = styled(motion.div)`
  padding: 1px;
  border-radius: 6px;
  ${FARE_GRADIENT}
`

const SSelectWalletModalContent = styled.div`
  background: #1a1a1a;
  min-width: 300px;
  border-radius: 6px;
  overflow: hidden;
  user-select: none;
  .small-text {
    font-size: 10px;
  }

  @media (${deviceBP.sm}) {
    width: 99svw;
    height: 60svh;
    background: black;
  }
`

const SWalletItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid #333;
  background: ${props => (props.$isActive ? '#2a2a2a' : '#1a1a1a')};
  transition: background 0.3s ease;
  cursor: ${props => (props.$isActive ? 'default' : 'pointer')};

  &.link-wallet-option {
    padding-right: 8px;
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover:not(:has(.accordion-button-container:hover)) {
    background: #2a2a2a;
  }

  @media (${deviceBP.sm}) {
    height: 60px;
  }
`

const SAccordionButtonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const SWalletInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const SWalletAddress = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`

const SWalletName = styled.div`
  font-size: 12px;
  color: #bbb;
`

const SWalletIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  &.large-icon {
    width: 32px;
    height: 32px;
  }
`

const SEmbeddedWalletsList = styled(motion.div)<{ $isActive: boolean }>`
  flex-direction: column;
  font-size: 12px;
  color: #bbb;
  padding-top: 6px;
  padding-bottom: 6px;
  gap: 4px;
  background: #1a1a1a;
  overflow: hidden;
`

const embeddedWalletsListVariants: Variants = {
  open: {
    opacity: 1,
    height: 'auto',
    paddingTop: 6,
    paddingBottom: 6,
  },
  closed: {
    opacity: 0,
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
}

const SAccordionButton = styled.button<{ $isExpanded: boolean }>`
  background: transparent;
  border: none;
  color: #fff;
  background: #121212;
  cursor: pointer;
  padding: 0;
  display: flex;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  align-items: center;
  transition:
    transform 0.3s ease,
    background 0.3s ease;
  margin-left: 8px;
  width: 24px;
  transform: ${props => (props.$isExpanded ? 'rotate(180deg)' : 'rotate(0)')};
  &:focus {
    outline: none;
  }
  &:hover {
    background: #2a2a2a;
  }
  img {
    height: 20px;
    width: 20px;
  }
`

const SEmbeddedWalletItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px;
  background: #121212;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  margin-left: 18px;
  .wallet-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &:last-child {
    padding-bottom: 6px;
  }
  span {
    text-transform: uppercase;
    &:first-child {
      margin-bottom: 2px;
      color: #fff;
    }
  }
`

const SUnlinkButton = styled.button`
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const SWalletItemList = styled.div`
  display: flex;
  flex-direction: column;
`

const SWalletHeader = styled.div`
  margin: auto;
  padding: 10px 0;
  text-transform: uppercase;
  font-size: 16px;

  @media (${deviceBP.sm}) {
    padding: 0px 0 20px 0;
  }
`

const SelectWalletModalContent = ({ closeModal }: { closeModal: () => void }) => {
  const isMobileScreen = useIsBreakpoint('xs')
  const { user, ...privy } = usePrivy()
  const { linkWalletToUser } = useAuthWallet()
  const { wallets } = useWallets()
  const { postlog } = usePostLog()
  const setAppWalletClientType = useAppChainConfigStore.use.setAppWalletClientType()
  const appWalletClientType = useAppChainConfigStore.use.appWalletClientType()
  const [expandedWallets, setExpandedWallets] = useState<string[]>([])
  const embeddedWalletLinks = useMemo(
    () => user?.linkedAccounts.filter(linkedAccount => !(linkedAccount as any).walletClientType),
    [user]
  )

  const filteredWallets = useMemo(() => wallets.filter(wallet => wallet.linked), [wallets])
  const selectedWallet = useMemo(
    () => wallets.find(wallet => wallet.walletClientType === appWalletClientType) || wallets[0],
    [wallets, appWalletClientType]
  )

  const linkNewWallet = useCallback(async () => {
    try {
      await linkWalletToUser()
    } catch (err) {
      console.error(err)
    }
  }, [linkWalletToUser])

  return (
    <SGradientWalletModalContent
      variants={isMobileScreen ? mobileModalContentVariants : modalContentVariants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <SSelectWalletModalContent>
        {filteredWallets.map(wallet => {
          const isSelected = wallet.walletClientType === selectedWallet.walletClientType

          const onClick = async () => {
            if (isSelected) return

            setAppWalletClientType(wallet.walletClientType)
            setTimeout(closeModal, 300)
          }

          const isPrivyWallet = wallet.walletClientType === 'privy'
          const embeddedWallets = embeddedWalletLinks
            ?.filter(() => isPrivyWallet)
            .map(walletLink => {
              const displayName = walletLink.type.split('_')[0]
              const linkUntyped = walletLink as any
              const displayValue = linkUntyped.address || linkUntyped.number
              return (
                <SEmbeddedWalletItem key={walletLink.type}>
                  <div className='wallet-info'>
                    <span className='small-text'>{displayName}</span>
                    <span className='small-text'>{displayValue}</span>
                  </div>
                  <SUnlinkButton
                    onClick={e => {
                      e.stopPropagation()
                      const capitalizedDisplayName =
                        displayName.charAt(0).toUpperCase() + displayName.slice(1)

                      ;(privy as any)[`unlink${capitalizedDisplayName}` as any]?.(displayValue)
                      postlog('wallet_unlinked', {
                        walletType: displayName,
                        walletAddress: displayValue,
                        eventName: 'wallet_unlink_success',
                      })
                    }}
                  >
                    UNLINK
                  </SUnlinkButton>
                </SEmbeddedWalletItem>
              )
            })

          return (
            <SWalletItemList key={wallet.address}>
              {isMobileScreen && (
                <img
                  style={{ marginInline: 'auto' }}
                  src={SVGS.dragBar}
                  alt='drag bar'
                  width={32}
                />
              )}
              <SWalletHeader>SELECT OR LINK A WALLET</SWalletHeader>
              <SWalletItem key={wallet.address} $isActive={isSelected} onClick={onClick}>
                <SWalletInfo>
                  <SWalletAddress>
                    {wallet.address.substring(0, 10)}...{' '}
                    {isSelected && <span className='small-text'>(selected)</span>}
                  </SWalletAddress>
                  <SWalletName>{wallet.meta.name}</SWalletName>
                </SWalletInfo>
                <SAccordionButtonContainer className='accordion-button-container'>
                  <SWalletIcon src={wallet.meta.icon || SVGS.privyIcon} alt={wallet.meta.name} />
                  {isPrivyWallet && embeddedWallets && embeddedWallets.length > 0 && (
                    <SAccordionButton
                      $isExpanded={expandedWallets.includes(wallet.address)}
                      onClick={e => {
                        e.stopPropagation()
                        setExpandedWallets(prev =>
                          prev.includes(wallet.address) ?
                            prev.filter(addr => addr !== wallet.address)
                          : [...prev, wallet.address]
                        )
                      }}
                    >
                      <img src={SVGS.caretDown} alt='accordion icon' />
                    </SAccordionButton>
                  )}
                </SAccordionButtonContainer>
              </SWalletItem>
              {isPrivyWallet && embeddedWallets && embeddedWallets.length > 0 && (
                <SEmbeddedWalletsList
                  $isActive={isSelected}
                  initial='closed'
                  animate={expandedWallets.includes(wallet.address) ? 'open' : 'closed'}
                  variants={embeddedWalletsListVariants}
                >
                  {embeddedWallets}
                </SEmbeddedWalletsList>
              )}
            </SWalletItemList>
          )
        })}
        <SWalletItem
          key='link-wallet'
          className='link-wallet-option'
          $isActive={false}
          onClick={linkNewWallet}
        >
          <SWalletInfo>
            <SWalletAddress>LINK A WALLET</SWalletAddress>
            <SWalletName>New Wallet</SWalletName>
          </SWalletInfo>
          <SWalletIcon className='large-icon' src={PNGS.simpleWalletIcon1} alt={'link wallet'} />
        </SWalletItem>
      </SSelectWalletModalContent>
    </SGradientWalletModalContent>
  )
}

export const SelectWalletModal = () => {
  const state = useSnapshot(switchWalletState)
  const isMobileScreen = useIsBreakpoint('xs')
  const closeModal = (_p0?: boolean) => (switchWalletState.isWalletModalOpen = false)

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <AnimatePresence>
      {state.isWalletModalOpen ?
        <SSelectWalletModal
          variants={modalVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          onClick={handleOverlayClick}
          {...(isMobileScreen && {
            drag: 'y',
            dragConstraints: { top: 0, bottom: 0 },
            dragElastic: 0.5,
            onDragEnd: (_, info) => {
              if (info.offset.y > 100) closeModal(!state.isWalletModalOpen)
            },
          })}
        >
          <SelectWalletModalContent closeModal={closeModal} />
        </SSelectWalletModal>
      : null}
    </AnimatePresence>
  )
}
