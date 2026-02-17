import React from "react";
import { useState, useMemo } from "react";
import { SelectWalletModalProps } from "./types";

import {
  SGradientWalletModalContent,
  SSelectWalletModalContent,
  SEmbeddedWalletItem,
  SUnlinkButton,
} from "./styles";
import { modalContentVariants, mobileModalContentVariants } from "./variants";
import { LinkWallet } from "./LinkWallet";
import { SelectWalletModalHeader } from "./SelectWalletModalHeader";
import { SelectWalletItemList } from "./SelectWalletItemList";
import { switchWalletState } from "../../store/switchWallet";

export const SelectWalletModalContent = ({
  closeModal,
  wallets,
  appWalletClientType,
  setAppWalletClientType,
  linkWalletToUser,
  embeddedWalletLinks = [],
  icons,
  isMobileScreen = false,
}: Omit<SelectWalletModalProps, "isOpen" | "onClose"> & {
  closeModal: () => void;
}) => {
  const [expandedWallets, setExpandedWallets] = useState<string[]>([]);

  const filteredWallets = useMemo(
    () => wallets.filter((wallet) => wallet.linked),
    [wallets],
  );

  const selectedWallet = useMemo(
    () =>
      wallets.find(
        (wallet) => wallet.walletClientType === appWalletClientType,
      ) || wallets[0],
    [wallets, appWalletClientType],
  );

  return (
    <SGradientWalletModalContent
      variants={
        isMobileScreen ? mobileModalContentVariants : modalContentVariants
      }
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <SSelectWalletModalContent>
        <SelectWalletModalHeader
          isMobileScreen={isMobileScreen}
          icons={icons}
        />
        {filteredWallets.map((wallet) => {
          const isSelected =
            wallet.walletClientType === selectedWallet.walletClientType;

          const onClick = () => {
            if (isSelected) return;
            setAppWalletClientType(wallet.walletClientType);
            switchWalletState.selectedConnectorType = wallet.walletClientType;
            setTimeout(closeModal, 300);
          };

          const isPrivyWallet = wallet.walletClientType === "privy";

          const embeddedWallets = embeddedWalletLinks
            ?.filter(() => isPrivyWallet)
            .map((walletLink) => {
              const displayName = walletLink.type.split("_")[0];
              const displayValue = walletLink.address || walletLink.number;

              return (
                <SEmbeddedWalletItem key={walletLink.type}>
                  <div className="wallet-info">
                    <span className="small-text">{displayName}</span>
                    <span className="small-text">{displayValue}</span>
                  </div>
                  <SUnlinkButton
                    onClick={(e) => {
                      e.stopPropagation();
                      // Unlink logic should be handled by consumer
                    }}
                  >
                    UNLINK
                  </SUnlinkButton>
                </SEmbeddedWalletItem>
              );
            });

          return (
            <SelectWalletItemList
              key={wallet.address}
              wallet={wallet}
              isSelected={isSelected}
              onClick={onClick}
              isPrivyWallet={isPrivyWallet}
              embeddedWallets={embeddedWallets}
              expandedWallets={expandedWallets}
              setExpandedWallets={setExpandedWallets}
              icons={icons}
            />
          );
        })}
        <LinkWallet linkWalletToUser={linkWalletToUser} icons={icons} />
      </SSelectWalletModalContent>
    </SGradientWalletModalContent>
  );
};
