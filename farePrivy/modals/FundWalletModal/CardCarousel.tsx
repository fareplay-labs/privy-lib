import { useSnapshot } from 'valtio'
import { AnimatePresence, motion } from 'framer-motion'
import { fundWalletModalState } from './FundWalletModalState'
import { FundWalletMenu } from './FundWalletMenu'
import { TransferModalFunds } from './TransferFunds'
import { ButtonEnum } from "../components/shared/Button"
import { SVGS } from "../assets"
import { useIsBreakpoint } from "../hooks/common/useIsBreakpoint"
import {
  ButtonText,
  Container,
  ContentWrapper,
  FundPageButton,
  FundPageButtonWrapper,
  FundPageFooter,
} from '../../../Modals/styles'

const cards = [<FundWalletMenu key={0} />, <TransferModalFunds key={1} />]

export const CardCarousel = () => {
  const { stepIdx } = useSnapshot(fundWalletModalState)
  const isMobileScreen = useIsBreakpoint('xs')

  const selectedCardElem = useMemo(() => cards[stepIdx], [stepIdx])

  return (
    <Container>
      <ContentWrapper>
        <AnimatePresence>
          <motion.div
            layout
            transition={{
              layout: { duration: 0.2, type: 'spring' },
            }}
          >
            {selectedCardElem}
          </motion.div>
        </AnimatePresence>
      </ContentWrapper>
      {!isMobileScreen && (
        <>
          <FundPageButton
            type='button'
            buttonType={ButtonEnum.BASE}
            onClick={() => {
              window.location.href = '/settings'
            }}
            disabled={false}
          >
            <FundPageButtonWrapper>
              <ButtonText>View all options</ButtonText>
              <img
                style={{ position: 'absolute', right: 0 }}
                src={SVGS.arrowRight}
                alt='Arrow right'
                width={40}
              />
            </FundPageButtonWrapper>
          </FundPageButton>
          <FundPageFooter>Go to funding in settings</FundPageFooter>
        </>
      )}
    </Container>
  )
}
