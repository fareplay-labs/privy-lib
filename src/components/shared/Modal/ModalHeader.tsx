import {
  SModalHeader,
  SModalTitle,
  SModalButton,
  SModalDescription,
} from "./styles";
import { ButtonEnum } from "../../shared/Button";
import React from "react";
import { type ModalCardProps } from "./types";

// For npm: Accept closeIcon as a prop instead of importing assets or using path aliases
export interface ModalHeaderProps
  extends Pick<
    ModalCardProps,
    "title" | "description" | "className" | "onClose" | "setIsVisible"
  > {
  closeIcon: string; // URL or import provided by consumer
  isMobileScreen?: boolean; // Optionally allow consumer to control breakpoint
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  description,
  className,
  onClose,
  setIsVisible = () => {},
  closeIcon,
  isMobileScreen,
}) => {
  // Optionally allow consumer to control breakpoint, otherwise fallback to false
  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };
  return (
    <SModalHeader
      style={
        className === "fund-modal-content"
          ? { width: "100%", padding: "0px" }
          : className === "offer-modal"
          ? { width: isMobileScreen ? "100%" : "50%" }
          : {}
      }
    >
      <SModalTitle
        id="modal-title"
        style={
          className === "fund-modal-content"
            ? {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#1c1c1e",
                marginBlock: 0,
                fontFamily: "system-ui, sans-serif",
              }
            : {}
        }
      >
        {title}
        {className === "fund-modal-content" && (
          <SModalButton
            buttonType={ButtonEnum.BASE}
            aria-label="Close modal"
            disabled={false}
            onClick={handleClose}
          >
            <img src={closeIcon} alt="close" width={28} />
          </SModalButton>
        )}
      </SModalTitle>
      {description && (
        <SModalDescription
          id="modal-desc"
          style={
            className === "fund-modal-content"
              ? {
                  fontFamily: "system-ui, sans-serif",
                  lineHeight: "1.25",
                }
              : {}
          }
        >
          {description}
        </SModalDescription>
      )}
    </SModalHeader>
  );
};
