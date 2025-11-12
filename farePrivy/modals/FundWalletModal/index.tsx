import { useRef, useMemo } from 'react'
import { useActiveWallet } from "../../hooks"
import { CardCarousel } from './CardCarousel'
import { useSnapshot } from 'valtio'
import ModalCard from "../components/shared/Modal/Card"
import { AnimatePresence } from 'framer-motion'
import { fundWalletModalState } from './FundWalletModalState'

export const FundWalletModal = () => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { activeWallet } = useActiveWallet()
  const { isFundModalShowing, stepIdx } = useSnapshot(fundWalletModalState)

  const setIsVisible = (isVisible: boolean) => {
    fundWalletModalState.stepIdx = 0
    fundWalletModalState.isFundModalShowing = isVisible
  }
  const setStepIdx = (idx: number) => {
    fundWalletModalState.stepIdx = idx
  }

  const maxHeight = useMemo(() => {
    if (stepIdx === 2) return '92vh'

    return '650px'
  }, [stepIdx])

  if (!activeWallet) {
    return null
  }

  return (
    <AnimatePresence>
      {isFundModalShowing && (
        <ModalCard
          maxHeight={maxHeight}
          stepIdx={stepIdx}
          setStepIdx={setStepIdx}
          isVisible={isFundModalShowing}
          setIsVisible={setIsVisible}
          ref={modalRef}
          title='Deposit Funds'
          description={
            <>
              There are 2 fast and easy ways to deposit funds.
              <br />
              No KYC. You&apos;ll be ready to play in just a few minutes!
            </>
          }
          className='fund-modal-content'
        >
          <CardCarousel />
        </ModalCard>
      )}
    </AnimatePresence>
  )
}
