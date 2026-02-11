import React from "react";
import { AnimatePresence } from "framer-motion";
import { SelectWalletModalProps } from "./types";
import { SSelectWalletModal } from "./styles";
import { modalVariants } from "./variants";
import { SelectWalletModalContent } from "./SelectWalletModalContent";

export const SelectWalletModal = (props: SelectWalletModalProps) => {
  const { isOpen, onClose, isMobileScreen = false, ...rest } = props;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <SSelectWalletModal
          variants={modalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={handleOverlayClick}
          {...(isMobileScreen && {
            drag: "y",
            dragConstraints: { top: 0, bottom: 0 },
            dragElastic: 0.5,
            onDragEnd: (_, info) => {
              if (info.offset.y > 100) onClose();
            },
          })}
        >
          <SelectWalletModalContent
            closeModal={onClose}
            isMobileScreen={isMobileScreen}
            {...rest}
          />
        </SSelectWalletModal>
      ) : null}
    </AnimatePresence>
  );
};
