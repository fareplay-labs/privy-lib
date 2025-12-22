import React, { useCallback, useMemo } from "react";
import { addAppNoti } from "../../../store/useNotiStore";
import { Button, ButtonEnum } from "../../../components/shared/Button";
import { SClickTextToCopy, SClickToCopy } from "./styles";

interface CopyToClipboardProps {
  value: string;
  children?: React.ReactNode;
  buttonType?: ButtonEnum;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  style?: React.CSSProperties;
  asButton?: boolean;
  asText?: boolean;
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  value,
  children,
  buttonType = ButtonEnum.CONNECT_WALLET,
  disabled = false,
  className,
  ariaLabel = "Copy to clipboard",
  style,
  asButton = false,
  asText = false,
}) => {
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      addAppNoti({
        type: "success",
        msg: "Copied to clipboard",
      });
    } catch (err) {
      addAppNoti({
        type: "error",
        msg: "Failed to copy",
      });
    }
  }, [value]);

  const elem = useMemo(
    () => (typeof children === "string" ? <span>{children}</span> : children),
    [children]
  );

  if (asText) {
    return (
      <SClickTextToCopy onClick={copyToClipboard}>{elem}</SClickTextToCopy>
    );
  }

  if (asButton) {
    return (
      <Button
        type="button"
        buttonType={buttonType}
        onClick={copyToClipboard}
        disabled={disabled}
        className={className}
        aria-label={ariaLabel}
        style={style}
      >
        {children}
      </Button>
    );
  }

  return (
    <SClickToCopy
      onClick={copyToClipboard}
      className={className}
      aria-label={ariaLabel}
      style={style}
    >
      {elem}
    </SClickToCopy>
  );
};
