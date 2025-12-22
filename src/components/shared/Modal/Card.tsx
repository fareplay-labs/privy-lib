import { modalVariants } from "../../../modals/SelectWalletModal/variants";
import { SGradientWalletModalContent } from "../../../modals/SelectWalletModal/styles";
import {
  SModalBody,
  SModalContent,
  SModalOverlayContainer,
  SModalWrapper,
} from "./styles";
import { modalOverlayVarient } from "./animations";
import { type ModalCardProps } from "./types";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";
import { forwardRef, useEffect } from "react";

// For npm: Accept icons as props and remove path aliases
const ModalCard = forwardRef<HTMLDivElement, ModalCardProps>(
  (
    {
      title,
      description,
      children,
      submit,
      onClose,
      isVisible,
      setIsVisible = () => {},
      className,
      stepIdx = 0,
      setStepIdx = () => {},
      style,
      caretLeftIcon,
      isMobileScreen,
      maxHeight
    },
    ref
  ) => {
    useEffect(() => {
      if (!isVisible) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsVisible(false);
          onClose?.();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isVisible, setIsVisible, onClose]);

    if (!isVisible) {
      return null;
    }

    const renderContent = () => (
      <SModalContent className={className} style={{ ...style, maxHeight }}>
        <ModalHeader
          title={title}
          description={description}
          className={className}
          onClose={onClose}
          setIsVisible={setIsVisible}
          isMobileScreen={isMobileScreen}
        />
        <SModalBody>{children}</SModalBody>
        {className === "offer-modal" ? null : (
          <ModalFooter
            stepIdx={stepIdx}
            setStepIdx={setStepIdx}
            submit={submit}
            // caretLeftIcon={caretLeftIcon} // Pass down caretLeftIcon
          />
        )}
      </SModalContent>
    );

    return (
      <SModalOverlayContainer
        variants={modalOverlayVarient}
        initial="initial"
        animate="animate"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-desc" : undefined}
      >
        <SModalWrapper
          ref={ref}
          variants={modalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {className === "fund-modal-content" ? (
            renderContent()
          ) : (
            <SGradientWalletModalContent>
              {renderContent()}
            </SGradientWalletModalContent>
          )}
        </SModalWrapper>
      </SModalOverlayContainer>
    );
  }
);

export default ModalCard;
