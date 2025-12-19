import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const FARE_GRADIENT = css`
  background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);
`;

export const deviceBP = {
  sm: "max-width: 760px",
};

export const SSelectWalletModal = styled(motion.div)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.48);
  z-index: 999;
  backdrop-filter: blur(4px);

  @media (${deviceBP.sm}) {
    align-items: flex-end;
    height: 100svh;
  }
`;

export const SGradientWalletModalContent = styled(motion.div)`
  padding: 1px;
  border-radius: 6px;
  ${FARE_GRADIENT}
`;

export const SSelectWalletModalContent = styled.div`
  background: #1a1a1a;
  min-width: 300px;
  border-radius: 6px;
  overflow: hidden;
  user-select: none;
  .small-text {
    font-size: 10px;
  }

  @media (${deviceBP.sm}) {
    width: 99svw;
    height: 60svh;
    background: black;
  }
`;

export const SWalletItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: ${({ $isActive }) => ($isActive ? "#222a3f" : "transparent")};
  border-bottom: 1px solid #222a3f;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #23234a;
  }
`;

export const SAccordionButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SWalletInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SWalletAddress = styled.div`
  font-size: 12px;
  color: #aaa;
`;

export const SWalletName = styled.div`
  font-size: 14px;
  color: #fff;
  font-weight: bold;
`;

export const SWalletIcon = styled.img`
  height: 24px;
  width: 24px;
  margin-left: 12px;

  &.large-icon {
    height: 32px;
    width: 32px;
  }
`;

export const SAccordionButton = styled.button<{ $isExpanded: boolean }>`
  background: none;
  border: none;
  margin-left: 8px;
  cursor: pointer;
  transform: ${({ $isExpanded }) =>
    $isExpanded ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.2s;
`;

export const SEmbeddedWalletsList = styled(motion.div)<{ $isActive: boolean }>`
  background: #181818;
  padding: ${({ $isActive }) => ($isActive ? "6px 0" : "0")};
  overflow: hidden;
`;

export const SWalletItemList = styled.div`
  margin-bottom: 8px;
`;

export const SWalletHeader = styled.div`
  font-size: 13px;
  color: #aaa;
  padding: 12px 16px 0 16px;
  font-weight: 600;
`;

export const SEmbeddedWalletItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  border-bottom: 1px solid #23234a;

  .wallet-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
`;

export const SUnlinkButton = styled.button`
  background: none;
  border: none;
  color: #f87171;
  font-size: 11px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;

  &:hover {
    background: #2d2d2d;
  }
`;
