import { SModalFooter, SFundModalButton } from "./styles";
import { ButtonEnum } from "../../shared/Button";
import React from "react";
import { type ModalCardProps } from "./types";

export interface ModalFooterProps
  extends Pick<ModalCardProps, "stepIdx" | "setStepIdx" | "submit"> {
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  stepIdx = 0,
  setStepIdx = () => {},
  submit,
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
          style={{ fontSize: 16, lineHeight: 1 }}
        >
          &lt;
        </SFundModalButton>
      )}
      <div className="submit-button">{submit}</div>
    </SModalFooter>
  );
};
