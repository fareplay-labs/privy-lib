import { useMemo } from "react";
import  styled  from "styled-components";


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
  color: #aaaaaa;
  user-select: none;

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
