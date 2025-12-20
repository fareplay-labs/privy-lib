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
}

export const FundWalletMenu: React.FC<FundWalletMenuProps> = ({
  onTransferNext = () => {},
  onDepositNext = () => {},
}) => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const handleAccordionToggle = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const truncatedDescription = (description: string): string => {
    return description.substring(0, 50);
  };

  // Hardcoded images for typical exchanges/cards
  const images = [
    "/icons/coinbase.svg",
    "/icons/binance.svg",
    "/icons/kraken.svg",
    "/icons/card.svg",
  ];

  return (
    <motion.div layout>
      <LayoutGroup>
        <FundsAccordion
          id="accordion1"
          isOpen={activeAccordion === "accordion1"}
          onToggle={handleAccordionToggle}
          next={onTransferNext}
          title="Transfer Crypto"
          images={images.slice(0, 3)}
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
          images={images.slice(0, 4)}
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
