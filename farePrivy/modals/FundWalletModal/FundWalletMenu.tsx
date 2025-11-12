import { LayoutGroup, motion } from 'framer-motion'
import { FundsAccordion } from './FundsAccordion'
import { TEXT_COLORS } from "../design"
import { depositReadMoreText, transferReadMoreText } from "../constants/funding"
import { fundWalletModalState } from './FundWalletModalState'
import { modalVariants } from "../../components/SelectWalletModal"
import { SVGS } from "../assets"
import { useDepositModal } from "../hooks/useShowDepositModal"

const AccordionDetails = styled(motion.div)`
  color: ${TEXT_COLORS.two};
`
const descriptionDetails = (i: number, text: string): JSX.Element => {
  return (
    <motion.p
      key={i}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      transition={{ stiffness: 100 }}
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.25' }}
    >
      {text}
    </motion.p>
  )
}

export const FundWalletMenu = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)

  const handleAccordionToggle = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id)
  }

  const { showDepositModal } = useDepositModal()

  const setStepIdx = (step: number) => {
    fundWalletModalState.stepIdx = step
  }

  const truncatedDescription = (description: string): string => {
    return description.substring(0, 50)
  }

  return (
    <motion.div variants={modalVariants} layout>
      <LayoutGroup>
        <FundsAccordion
          id='accordion1'
          isOpen={activeAccordion === 'accordion1'}
          onToggle={handleAccordionToggle}
          next={() => setStepIdx(1)}
          title='Transfer Crypto'
          image1={SVGS.usdcIcon}
          image2={SVGS.ethIconCircle}
          image3={SVGS.tetherIcon}
          description={truncatedDescription(transferReadMoreText.join(' '))}
          fullContent={
            <AccordionDetails>
              {transferReadMoreText.map((text: string, i: number) => descriptionDetails(i, text))}
            </AccordionDetails>
          }
        ></FundsAccordion>
        <FundsAccordion
          id='accordion2'
          isOpen={activeAccordion === 'accordion2'}
          onToggle={handleAccordionToggle}
          next={showDepositModal}
          title='Card Deposit'
          image1={SVGS.visaLogo}
          image2={SVGS.mastercardLogo}
          image3={SVGS.applePayLogo}
          image4={SVGS.googlePayLogo}
          description={truncatedDescription(depositReadMoreText.join(' '))}
          fullContent={
            <AccordionDetails>
              {depositReadMoreText.map((text: string, i: number) => descriptionDetails(i, text))}
            </AccordionDetails>
          }
        ></FundsAccordion>
      </LayoutGroup>
    </motion.div>
  )
}
