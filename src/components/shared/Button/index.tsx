import { type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

import { BaseButton, ButtonContentWrapper, LoadingBar } from "./style";

export enum ButtonEnum {
  BASE,
  PRIMARY_1,
  CONNECT_WALLET,
  WARNING,
  ERROR,
  ERROR_2,
}

// For npm: Make all props optional except buttonType and disabled, and allow theme override via props
export interface ButtonProps extends HTMLMotionProps<"button"> {
  buttonType: ButtonEnum;
  children?: ReactNode;
  disabled: boolean;
  isLoading?: boolean;
  loadingText?: string | JSX.Element;
  isMinified?: boolean;
  theme?: any; // Allow theme override for npm consumers
}

import React from "react";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      buttonType,
      disabled,
      isLoading = false,
      loadingText = "Loading",
      children,
      isMinified = false,
      theme,
      ...props
    },
    ref
  ) => {
    return (
      <BaseButton
        {...props}
        ref={ref}
        transition={{ duration: 0.25 }}
        buttonType={buttonType}
        disabled={disabled}
        isLoading={isLoading}
        $isMinified={isMinified}
        theme={theme}
      >
        <ButtonContentWrapper>
          {isLoading && (
            <LoadingBar $side="left" $buttonType={buttonType} theme={theme} />
          )}
          <div>{isLoading ? loadingText : children}</div>
          {isLoading && (
            <LoadingBar $side="right" $buttonType={buttonType} theme={theme} />
          )}
        </ButtonContentWrapper>
      </BaseButton>
    );
  }
);
