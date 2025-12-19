import { ButtonEnum } from ".";
import { motion } from "framer-motion";
import { css, keyframes } from "styled-components";
import styled from "styled-components";

// For npm: require consumers to provide colors and spacing via theme or props.
// Provide fallback defaults for colors and spacing.

const DEFAULT_COLORS = {
  textOne: "#fff",
  textTwo: "#aaa",
  borderOne: "#1b1d26",
  backgroundFour: "#101010",
  warning: "#fbbf24",
  error: "#ef4444",
  fareBlue: "#410dff",
  fareAqua: "#4af5d3",
};

const DEFAULT_SPACING = {
  xs: 4,
  sm: 12,
  lg: 24,
};

const flashBar = keyframes`
  0% {
    opacity: 0%;
  }
  50% {
    opacity: 100%;
  }
  100% {
    opacity: 0%;
  }
`;

export const BaseButton = styled(motion.button)<{
  buttonType?: ButtonEnum;
  isLoading?: boolean;
  $isMinified?: boolean;
  theme?: any;
}>`
  text-transform: uppercase;
  color: ${({ theme }) => theme?.textOne || DEFAULT_COLORS.textOne};
  padding: ${({ theme }) => theme?.spacing?.sm || DEFAULT_SPACING.sm}px;
  border-radius: 6px;
  cursor: pointer;
  bottom: ${({ theme }) => theme?.spacing?.lg || DEFAULT_SPACING.lg}px;
  width: auto;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid
    ${({ theme }) => theme?.borderOne || DEFAULT_COLORS.borderOne};
  transition: 0.2s all ease-in-out;
  text-wrap: nowrap;

  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  -moz-backdrop-filter: blur(2px);
  -ms-backdrop-filter: blur(2px);

  &.copy-btn {
    width: 100px;
    background-color: ${({ theme }) =>
      theme?.fareAqua || DEFAULT_COLORS.fareAqua}50;
    color: white;
    font-weight: bold;
    height: 40px;
    padding-top: 10px;
  }

  ${(props) =>
    props.$isMinified
      ? `${props.theme?.spacing?.xs || DEFAULT_SPACING.xs}px ${
          props.theme?.spacing?.sm || DEFAULT_SPACING.sm
        }px`
      : `${props.theme?.spacing?.sm || DEFAULT_SPACING.sm}px`}

  > div {
    line-height: 1px;
  }

  > img {
    margin-left: ${({ theme }) => theme?.spacing?.xs || DEFAULT_SPACING.xs}px;
    height: 18px;
  }

  > div:nth-child(2) {
    margin: 0 ${({ theme }) => theme?.spacing?.sm || DEFAULT_SPACING.sm}px;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 1200px) {
    margin-block: 5px;
    height: 3rem;
    align-items: normal;
    text-wrap: nowrap;
  }

  ${({ buttonType, isLoading, theme }) => {
    const fareBlue = theme?.fareBlue || DEFAULT_COLORS.fareBlue;
    const fareAqua = theme?.fareAqua || DEFAULT_COLORS.fareAqua;
    const warning = theme?.warning || DEFAULT_COLORS.warning;
    const error = theme?.error || DEFAULT_COLORS.error;
    const borderOne = theme?.borderOne || DEFAULT_COLORS.borderOne;
    const backgroundFour =
      theme?.backgroundFour || DEFAULT_COLORS.backgroundFour;
    const textOne = theme?.textOne || DEFAULT_COLORS.textOne;
    const textTwo = theme?.textTwo || DEFAULT_COLORS.textTwo;

    if (buttonType === ButtonEnum.BASE) {
      return `
        &:hover {
          border: 1px solid ${fareBlue};
        }
      `;
    }

    if (buttonType === ButtonEnum.PRIMARY_1) {
      return `
        border: 1px solid ${fareBlue};
        box-shadow: 0px 0px 3px ${fareBlue}, inset 0px 0px 56px ${fareBlue}00;
        background: transparent;

        &:hover {
          background: ${fareBlue}00;
          box-shadow: 0px 0px 5px ${fareBlue}, inset 0px 0px 56px ${fareBlue}75;
        }
      `;
    }

    if (buttonType === ButtonEnum.CONNECT_WALLET) {
      return `
        border: 1px solid ${fareAqua};
        box-shadow: 0px 0px 3px ${fareAqua}, inset 0px 0px 56px ${fareAqua}00;
        background: transparent;

        &:hover {
          &:not(:disabled) {
            background: ${fareAqua}00;
            box-shadow: 0px 0px 5px ${fareAqua}, inset 0px 0px 56px ${fareAqua}75;
          }
        }
      `;
    }

    if (buttonType === ButtonEnum.WARNING) {
      return `
        border: 1px solid ${warning};
        box-shadow: 0px 0px 3px ${warning};
        background: ${isLoading ? "transparent" : `${warning}35`};

        &:hover {
          background: ${warning}50;
          box-shadow: 0px 0px 5px ${warning};
        }
      `;
    }

    if (buttonType === ButtonEnum.ERROR) {
      return `
        border: 1px solid ${error};
        box-shadow: 0px 0px 3px ${error};
        background: ${isLoading ? "transparent" : `${error}35`};

        &:hover {
          background: ${error}50;
          box-shadow: 0px 0px 5px ${error};
        }
      `;
    }

    if (buttonType === ButtonEnum.ERROR_2) {
      return `
        border: 1px solid ${error};
        box-shadow: 0px 0px 3px ${error};

        &:hover {
          background: ${error}50;
          box-shadow: 0px 0px 5px ${error};
        }
      `;
    }
  }}
`;

export const LoadingBar = styled.div<{
  $side: "left" | "right";
  $buttonType: ButtonEnum;
  theme?: any;
}>`
  position: absolute;
  width: 2px;
  height: 20px;
  opacity: 0;
  animation: 2s ${flashBar} infinite;
  top: 0px;

  ${({ $buttonType, theme }) => {
    const fareBlue = theme?.fareBlue || DEFAULT_COLORS.fareBlue;
    const fareAqua = theme?.fareAqua || DEFAULT_COLORS.fareAqua;

    if ($buttonType === ButtonEnum.PRIMARY_1) {
      return `
        opacity: 1;
        border: 1px solid ${fareBlue};
        box-shadow: inset 0px 0px 10px ${fareBlue}99;
      `;
    }

    if ($buttonType === ButtonEnum.CONNECT_WALLET) {
      return `
        border: 1px solid ${fareAqua};
        box-shadow: inset 0px 0px 10px ${fareAqua}99;
      `;
    }
  }}

  ${({ $side }) => css`
    ${$side}: -8px;
  `}
`;

export const ModeButton = styled.button<{ $isActive?: boolean; theme?: any }>`
  height: 30px;
  min-width: 40px;
  border-radius: 4px;
  background: transparent;
  transition: 0.2s all ease-in-out;
  cursor: pointer;

  &:focus-visible {
    outline: none;
  }
  &:hover {
    border: 1px solid
      ${({ theme }) => theme?.fareBlue || DEFAULT_COLORS.fareBlue}99 !important;
  }

  > span {
    font-family: "GohuUppercase", monospace;
    line-height: 10px;
  }

  &:has(span) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          border: 1px solid ${theme?.fareBlue || DEFAULT_COLORS.fareBlue} !important;
          color: ${theme?.textOne || DEFAULT_COLORS.textOne};
          background: ${theme?.backgroundFour || DEFAULT_COLORS.backgroundFour};
        `
      : css`
          border: 1px solid ${theme?.borderOne || DEFAULT_COLORS.borderOne};
          color: ${theme?.textTwo || DEFAULT_COLORS.textTwo};
        `};
`;

export const ButtonContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
