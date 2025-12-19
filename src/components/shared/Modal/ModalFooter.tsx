import { SModalFooter, SFundModalButton } from "./styles";
import { ButtonEnum } from "../../shared/Button";
import { motion } from "framer-motion";
import React from "react";
import { type ModalCardProps } from "./types";
import { prevButtonVariant } from "./animations";

// For npm: Accept icons as props instead of importing assets directly
export interface ModalFooterProps
  extends Pick<ModalCardProps, "stepIdx" | "setStepIdx" | "submit"> {
  caretLeftIcon: string; // URL or import provided by consumer
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  stepIdx = 0,
  setStepIdx = () => {},
  submit,
  caretLeftIcon,
}) => {
  const goBack = () => setStepIdx(0);
  return (
    <SModalFooter>
      {stepIdx > 0 && stepIdx !== 2 && (
        <SFundModalButton
          onClick={goBack}
          aria-label="Go back"
          buttonType={ButtonEnum.BASE}
          disabled={false}
        >
          <motion.img
            src={caretLeftIcon}
            width={18}
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={prevButtonVariant}
          />
        </SFundModalButton>
      )}
      <div className="submit-button">{submit}</div>
    </SModalFooter>
  );
};
