import { LayoutGroup, motion } from "framer-motion";
import { FundsAccordion } from "./FundsAccordion";
import { useState } from "react";
import { AccordionDetails } from "../styles";
import {
  depositReadMoreText,
  descriptionDetails,
  transferReadMoreText,
} from "./DescriptionDetails";

/**
 * Simplified and npm-friendly FundWalletMenu.
 * Only requires optional handlers for next actions.
 * Images are hardcoded for typical use.
 */
export interface FundWalletMenuProps {
  onTransferNext?: () => void;
  onDepositNext?: () => void;
  setStepIdx?: (idx: number) => void;
}

export const FundWalletMenu: React.FC<FundWalletMenuProps> = ({
  onTransferNext = () => {},
  onDepositNext = () => {},
  setStepIdx,
}) => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const handleAccordionToggle = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const truncatedDescription = (description: string): string => {
    if (description.length <= 50) return description;
    return description.substring(0, 50).trim() + "...";
  };


  return (
    <motion.div layout>
      <LayoutGroup>
        <FundsAccordion
          id="accordion1"
          isOpen={activeAccordion === "accordion1"}
          onToggle={handleAccordionToggle}
          next={onTransferNext}
          title="Transfer Crypto"
          description={truncatedDescription(transferReadMoreText.join(" "))}
          fullContent={
            <AccordionDetails>
              {transferReadMoreText.map((text: string, i: number) =>
                descriptionDetails(i, text)
              )}
            </AccordionDetails>
          }
        />
        <FundsAccordion
          id="accordion2"
          isOpen={activeAccordion === "accordion2"}
          onToggle={handleAccordionToggle}
          next={onDepositNext}
          title="Card Deposit"
          description={truncatedDescription(depositReadMoreText.join(" "))}
          fullContent={
            <AccordionDetails>
              {depositReadMoreText.map((text: string, i: number) =>
                descriptionDetails(i, text)
              )}
            </AccordionDetails>
          }
        />
      </LayoutGroup>
    </motion.div>
  );
};
