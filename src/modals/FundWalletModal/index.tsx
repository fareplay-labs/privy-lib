import React, { useMemo, useRef, useState } from "react";
import { useActiveWallet } from "../../hooks/useActiveWallet";
import { CardCarousel } from "./CardCarousel";
import ModalCard from "../../components/shared/Modal/Card";
import { AnimatePresence } from "framer-motion";

export interface FundWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  stepIdx?: number;
  setStepIdx?: (idx: number) => void;
  onTransferNext?: () => void;
  onDepositNext?: () => void;
}

export const FundWalletModal: React.FC<FundWalletModalProps> = ({
  isOpen,
  onClose,
  stepIdx: controlledStepIdx,
  setStepIdx: controlledSetStepIdx,
  onTransferNext,
  onDepositNext,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { activeWallet } = useActiveWallet();
  const [internalStepIdx, setInternalStepIdx] = useState(0);
  const stepIdx =
    controlledStepIdx !== undefined ? controlledStepIdx : internalStepIdx;
  const setStepIdx = controlledSetStepIdx || setInternalStepIdx;

  const setIsVisible = (isVisible: boolean) => {
    setStepIdx(0);
    if (!isVisible) onClose();
  };

  const maxHeight = useMemo(() => {
    if (stepIdx === 2) return "92vh";
    return "650px";
  }, [stepIdx]);

  if (!activeWallet) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalCard
          maxHeight={maxHeight}
          stepIdx={stepIdx}
          setStepIdx={setStepIdx}
          isVisible={isOpen}
          setIsVisible={setIsVisible}
          ref={modalRef}
          title="Deposit Funds"
          description={
            <>
              There are 2 fast and easy ways to deposit funds.
              <br />
              No KYC. You&apos;ll be ready to play in just a few minutes!
            </>
          }
          className="fund-modal-content"
        >
          <CardCarousel
            stepIndex={stepIdx}
            setStepIdx={setStepIdx}
            onTransferNext={onTransferNext}
            onDepositNext={onDepositNext}
          />
        </ModalCard>
      )}
    </AnimatePresence>
  );
};
