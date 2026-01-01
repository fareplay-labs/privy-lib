import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FundWalletMenu } from "./FundWalletMenu";
import { TransferModalFunds } from "./TransferFunds";
import { Container, ContentWrapper } from "../styles";
import { useWalletBalance } from "../../hooks/useWalletBalance";

/**
 * CardCarousel - Animated card carousel for wallet funding flows.
 *
 * Props:
 *   stepIndex: number - Index of the currently visible card (0 or 1)
 *   className?: string - Optional for styled-components
 *   style?: React.CSSProperties
 *   footer?: React.ReactNode - Optional footer below the carousel
 *
 * Usage:
 * <CardCarousel stepIndex={step} />
 */

export interface CardCarouselProps {
  stepIndex: number;
  setStepIdx?: (idx: number) => void;
  onTransferNext?: () => void;
  onDepositNext?: () => void;
  className?: string;
  style?: React.CSSProperties;
  footer?: React.ReactNode;
  chainDefinition?: string;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({
  stepIndex,
  setStepIdx,
  onDepositNext,
  className,
  style,
  footer,
}) => {
  const { ethereumBalance } = useWalletBalance();

  const handleTransferNext = () => setStepIdx?.(1);

  const cards = useMemo(
    () => [
      <FundWalletMenu
        key={0}
        onTransferNext={handleTransferNext}
        onDepositNext={onDepositNext}
        setStepIdx={setStepIdx}
      />,
      <TransferModalFunds
        key={1}
        selectedCurrencyBalance={ethereumBalance ?? 0}
      />,
    ],
    [ethereumBalance, setStepIdx]
  );

  const selectedCardElem = useMemo(() => cards[stepIndex], [cards, stepIndex]);

  return (
    <Container className={className} style={style}>
      <ContentWrapper>
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            layout
            transition={{ layout: { duration: 0.2, type: "spring" } }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {selectedCardElem}
          </motion.div>
        </AnimatePresence>
      </ContentWrapper>
      {footer && <div>{footer}</div>}
    </Container>
  );
};
