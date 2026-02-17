import React from "react";
import {
  SWalletItem,
  SAccordionButtonContainer,
  SWalletInfo,
  SWalletAddress,
  SWalletName,
  SWalletIcon,
  SAccordionButton,
  SEmbeddedWalletsList,
  SWalletItemList,
} from "./styles";
import { embeddedWalletsListVariants } from "./variants";
interface Wallet {
  address: string;
  meta: { name: string; icon?: string };
  walletClientType: string;
  linked: boolean;
}

interface ListItemProps {
  wallet: Wallet;
  isSelected: boolean;
  onClick: () => void;
  isPrivyWallet: boolean;
  embeddedWallets: JSX.Element[];
  expandedWallets: string[];
  setExpandedWallets: React.Dispatch<React.SetStateAction<string[]>>;
  icons: {
    privyIcon: string;
    caretDown: string;
  };
}

export const SelectWalletItemList = ({
  wallet,
  isSelected,
  onClick,
  isPrivyWallet,
  embeddedWallets,
  expandedWallets,
  setExpandedWallets,
  icons,
}: ListItemProps) => {
  return (
    <SWalletItemList key={wallet.address}>
      <SWalletItem
        key={wallet.address}
        $isActive={isSelected}
        onClick={onClick}
      >
        <SWalletInfo>
          <SWalletAddress>
            {wallet.address.substring(0, 10)}...{" "}
            {isSelected && <span className="small-text">(selected)</span>}
          </SWalletAddress>
          <SWalletName>{wallet.meta.name}</SWalletName>
        </SWalletInfo>
        <SAccordionButtonContainer className="accordion-button-container">
          <SWalletIcon
            src={wallet.meta.icon || icons.privyIcon}
            alt={wallet.meta.name}
          />
          {isPrivyWallet && embeddedWallets && embeddedWallets.length > 0 && (
            <SAccordionButton
              $isExpanded={expandedWallets.includes(wallet.address)}
              onClick={(e) => {
                e.stopPropagation();
                setExpandedWallets((prev) =>
                  prev.includes(wallet.address)
                    ? prev.filter((addr) => addr !== wallet.address)
                    : [...prev, wallet.address],
                );
              }}
            >
              <img src={icons.caretDown} alt="accordion icon" width={32} />
            </SAccordionButton>
          )}
        </SAccordionButtonContainer>
      </SWalletItem>
      {isPrivyWallet && embeddedWallets && embeddedWallets.length > 0 && (
        <SEmbeddedWalletsList
          $isActive={isSelected}
          initial="closed"
          animate={expandedWallets.includes(wallet.address) ? "open" : "closed"}
          variants={embeddedWalletsListVariants}
        >
          {embeddedWallets}
        </SEmbeddedWalletsList>
      )}
    </SWalletItemList>
  );
};
