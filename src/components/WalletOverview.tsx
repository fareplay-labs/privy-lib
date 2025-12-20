import { useMemo } from "react";
import { styled } from "styled-components";


export interface WalletOverviewProps {
  activeWallet: {
    meta: {
      name: string;
      icon?: string; 
    };
  };
  onClick?: () => void;
  fallbackIcon?: string; 
}

const SWalletOverview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  margin-right: 12px;
  height: 42px;
  border: 1px solid #222a3f;
  color: #aaaaaa;
  border-radius: 6px;
  user-select: none;
  transition: all ease-in-out 0.08s;
  &:hover {
    span {
      color: white;
    }
    border-color: #6366f1;
  }

  img {
    height: 16px;
    margin-right: 8px;
  }

  span {
    text-transform: uppercase;
    color: #aaaaaa;
  }

  @media (max-width: 760px) {
    display: flex;
    align-items: center;
    margin: 0 16px 4px;
    text-wrap: nowrap;
  }
`;

export const WalletOverview = ({
  activeWallet,
  onClick,
  fallbackIcon,
}: WalletOverviewProps) => {
  const walletIcon = useMemo(() => {
    return activeWallet?.meta.icon || fallbackIcon;
  }, [activeWallet, fallbackIcon]);

  return (
    <SWalletOverview onClick={onClick}>
      {walletIcon && (
        <img alt={activeWallet?.meta.name || "wallet"} src={walletIcon} />
      )}
      <span>{activeWallet?.meta.name}</span>
    </SWalletOverview>
  );
};
