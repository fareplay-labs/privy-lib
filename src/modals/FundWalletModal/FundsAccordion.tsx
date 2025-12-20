import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Button, ButtonEnum } from "../../components/shared/Button";
import {
  AccordionContainer,
  AccordionContent,
  AccordionCurrencyImgWrapper,
  AccordionDescription,
  AccordionHeader,
  AccordionTitle,
  ReadMoreButton,
} from "../styles";

interface FundsAccordionProps {
  title?: string;
  images?: string[];
  description?: React.ReactNode;
  fullContent?: React.ReactNode;
  children?: React.ReactNode;
  next: () => void;
  isOpen: boolean;
  id: string;
  onToggle: (id: string) => void;
  caretRightIcon?: string; // Pass SVG/icon as prop
  caretDownIcon?: string; // Pass SVG/icon as prop
  renderButton?: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
  ) => React.ReactNode; // Optional custom button
  style?: React.CSSProperties;
  className?: string;
}

const nextButtonVariant: Variants = {
  initial: { x: 0 },
  animate: { x: 0 },
  hover: { x: [0, 5, 0] },
};

export const FundsAccordion: React.FC<FundsAccordionProps> = ({
  title,
  images = [],
  description,
  fullContent,
  children,
  next,
  isOpen,
  id,
  onToggle,
  caretRightIcon,
  caretDownIcon,
}) => {
  return (
    <AccordionContainer
      layout
      transition={{
        layout: { duration: 0.4, type: "spring" },
      }}
      onClick={next}
    >
      <AccordionHeader>
        <AccordionTitle>
          <h1>{title}</h1>
        </AccordionTitle>
        <AccordionDescription>
          {isOpen
            ? fullContent
            : `${(description ?? "").toString().substring(0, 50)}...`}
          <Button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            buttonType={ButtonEnum.BASE}
            disabled={false}
          >
            {caretRightIcon && (
              <motion.img
                src={caretRightIcon}
                width={18}
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={nextButtonVariant}
              />
            )}
          </Button>
        </AccordionDescription>
      </AccordionHeader>
      {title !== "Buy Fare Chips" && (
        <motion.div style={{ display: "inline-flex" }}>
          <ReadMoreButton
            onClick={(e) => {
              e.stopPropagation();
              onToggle(id);
            }}
            buttonType={ButtonEnum.BASE}
            disabled={false}
          >
            {isOpen ? "Read less" : "Read more"}
            {caretDownIcon && (
              <motion.img
                src={caretDownIcon}
                width={18}
                style={{ verticalAlign: "bottom", marginLeft: "5px" }}
                animate={{ rotate: isOpen ? -180 : 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </ReadMoreButton>

          <AccordionCurrencyImgWrapper>
            {images.slice(0, 4).map((img, i) => (
              <img src={img} width={18} key={i} alt={`currency-${i}`} />
            ))}
          </AccordionCurrencyImgWrapper>
        </motion.div>
      )}
      <AnimatePresence initial={false}>
        {isOpen && (
          <AccordionContent
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </AccordionContent>
        )}
      </AnimatePresence>
    </AccordionContainer>
  );
};
