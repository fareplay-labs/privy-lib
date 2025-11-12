import { SVGS } from "../assets"
import { TEXT_COLORS } from "../design"
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Button, ButtonEnum } from "../components/shared/Button"
import { deviceBP } from "../design/breakpoints"
import styled from 'styled-components'
interface FundsAccordionProps {
  title?: string
  image1?: string
  image2?: string
  image3?: string
  image4?: string
  description?: React.ReactNode
  fullContent?: React.ReactNode
  children?: React.ReactNode
  next: () => void
  isOpen: boolean
  id: string
  onToggle: (id: string) => void
}

const nextButtonVariant: Variants = {
  initial: { x: 0 },
  animate: { x: 0 },
  hover: { x: [0, 5, 0] },
}

const AccordionContainer = styled(motion.div)`
  text-align: left;
  overflow: hidden;
  background-color: #2c2c2e;
  border-radius: 0.75rem;
  margin-bottom: 16px;
  padding: 1rem;
  text-align: justify;
  cursor: pointer;

  @media ${deviceBP.sm} {
    padding: 0.5rem;
  }
`

const AccordionHeader = styled(motion.div)`
  padding: 10px 10px 0px;
`

const AccordionCurrencyImgWrapper = styled.div`
  margin-left: 8px;
  display: inline-flex;
  gap: 8px;
  background-color: rgba(118, 118, 128, 0.18);
  padding: 8px 16px;
  border-radius: 10rem;
  height: 1.25rem;
  margin: 5px;
`

const AccordionTitle = styled.div`
  display: inline-flex;
  align-items: center;

  > h1 {
    display: flex;
    font-size: 20px;
    margin-block: 0;
    font-family: system-ui, sans-serif;

    @media ${deviceBP.sm} {
      font-size: 18px;
    }
  }

  > div {
    position: relative;
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
  }
`

const AccordionDescription = styled.p`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${TEXT_COLORS.two};
  font-family: system-ui, sans-serif;
  margin-block: 0;
`

const AccordionContent = styled(motion.div)`
  padding: 0px 10px;
  display: block;
  width: 85%;
`

const ReadMoreButton = styled(Button)`
  display: flex;
  justify-content: flex-end;
  border: none;
  border-radius: 10rem;
  padding: 0.5rem;
  padding-inline: 1rem;
  height: 2.25rem;
  margin: 5px;
  background-color: rgba(118, 118, 128, 0.18);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  -moz-backdrop-filter: blur(0px);
  -ms-backdrop-filter: blur(0px);

  span {
    font-family: system-ui, sans-serif;
    font-size: 12px;
  }

  &:hover {
    border: none;
    background-color: rgba(118, 118, 128, 0.24);
  }
`

export const FundsAccordion = ({
  title,
  image1,
  image2,
  image3,
  image4,
  description,
  fullContent,
  children,
  next,
  isOpen,
  id,
  onToggle,
}: FundsAccordionProps) => {
  return (
    <AccordionContainer
      layout
      transition={{
        layout: { duration: 0.4, type: 'spring' },
      }}
      onClick={next}
    >
      <AccordionHeader>
        <AccordionTitle>
          <h1>{title}</h1>
        </AccordionTitle>
        <AccordionDescription>
          {isOpen ? fullContent : `${(description ?? '').toString().substring(0, 50)}...`}
          <Button
            style={{ border: 'none', backgroundColor: 'transparent' }}
            onClick={next}
            buttonType={ButtonEnum.BASE}
            disabled={false}
          >
            <motion.img
              src={SVGS.caretRight}
              width={18}
              initial='initial'
              animate='animate'
              whileHover='hover'
              variants={nextButtonVariant}
            />
          </Button>
        </AccordionDescription>
      </AccordionHeader>
      {title !== 'Buy Fare Chips' && (
        <motion.div style={{ display: 'inline-flex' }}>
          <ReadMoreButton
            onClick={e => {
              e.stopPropagation()
              onToggle(id)
            }}
            buttonType={ButtonEnum.BASE}
            disabled={false}
          >
            {isOpen ? 'Read less' : 'Read more'}
            <motion.img
              src={SVGS.caretDown}
              width={18}
              style={{ verticalAlign: 'bottom', marginLeft: '5px' }}
              animate={{ rotate: isOpen ? -180 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </ReadMoreButton>

          <AccordionCurrencyImgWrapper>
            {image1 && <img src={image1} width={18} />}
            {image2 && <img src={image2} width={18} />}
            {image3 && <img src={image3} width={18} />}
            {image4 && <img src={image4} width={18} />}
          </AccordionCurrencyImgWrapper>
        </motion.div>
      )}
      <AnimatePresence initial={false}>
        {isOpen && (
          <AccordionContent
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </AccordionContent>
        )}
      </AnimatePresence>
    </AccordionContainer>
  )
}
