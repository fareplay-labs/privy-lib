import { useState, useMemo, useCallback } from "react";
import { SelectWalletModalProps } from "./types";

import {
  SGradientWalletModalContent,
  SSelectWalletModalContent,
  SWalletItem,
  SAccordionButtonContainer,
  SWalletInfo,
  SWalletAddress,
  SWalletName,
  SWalletIcon,
  SAccordionButton,
  SEmbeddedWalletsList,
  SWalletItemList,
  SWalletHeader,
  SEmbeddedWalletItem,
  SUnlinkButton,
} from "./styles";
import {
  modalContentVariants,
  mobileModalContentVariants,
  embeddedWalletsListVariants,
} from "./variants";

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

  const handleLinkNewWallet = useCallback(async () => {
    try {
      await linkWalletToUser();
    } catch (err) {
      console.error(err);
    }
  }, [linkWalletToUser]);

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
        {filteredWallets.map((wallet) => {
          const isSelected =
            wallet.walletClientType === selectedWallet.walletClientType;

          const onClick = () => {
            if (isSelected) return;
            setAppWalletClientType(wallet.walletClientType);
            setTimeout(closeModal, 300);
          };

          const isPrivyWallet = wallet.walletClientType === "privy";
          const embeddedWallets = embeddedWalletLinks
            ?.filter(() => isPrivyWallet)
            .map((walletLink) => {
              const displayName = walletLink.type.split("_")[0];
              const displayValue = walletLink.address || walletLink.number;
              return (
                <>
                  <SWalletHeader>SELECT OR LINK A WALLET</SWalletHeader>
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
                </>
              );
            });

          return (
            <SWalletItemList key={wallet.address}>
              {isMobileScreen && (
                <img
                  style={{ marginInline: "auto" }}
                  src={icons.dragBar}
                  alt="drag bar"
                  width={32}
                />
              )}
              <SWalletItem
                key={wallet.address}
                $isActive={isSelected}
                onClick={onClick}
              >
                <SWalletInfo>
                  <SWalletAddress>
                    {wallet.address.substring(0, 10)}...{" "}
                    {isSelected && (
                      <span className="small-text">(selected)</span>
                    )}
                  </SWalletAddress>
                  <SWalletName>{wallet.meta.name}</SWalletName>
                </SWalletInfo>
                <SAccordionButtonContainer className="accordion-button-container">
                  <SWalletIcon
                    src={wallet.meta.icon || icons.privyIcon}
                    alt={wallet.meta.name}
                  />
                  {isPrivyWallet &&
                    embeddedWallets &&
                    embeddedWallets.length > 0 && (
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
                        <img src={icons.caretDown} alt="accordion icon" />
                      </SAccordionButton>
                    )}
                </SAccordionButtonContainer>
              </SWalletItem>
              {isPrivyWallet &&
                embeddedWallets &&
                embeddedWallets.length > 0 && (
                  <SEmbeddedWalletsList
                    $isActive={isSelected}
                    initial="closed"
                    animate={
                      expandedWallets.includes(wallet.address)
                        ? "open"
                        : "closed"
                    }
                    variants={embeddedWalletsListVariants}
                  >
                    {embeddedWallets}
                  </SEmbeddedWalletsList>
                )}
            </SWalletItemList>
          );
        })}
        <SWalletItem
          key="link-wallet"
          className="link-wallet-option"
          $isActive={false}
          onClick={handleLinkNewWallet}
        >
          <SWalletInfo>
            <SWalletAddress>LINK A WALLET</SWalletAddress>
            <SWalletName>New Wallet</SWalletName>
          </SWalletInfo>
          <SWalletIcon
            className="large-icon"
            src={icons.linkWallet}
            alt={"link wallet"}
          />
        </SWalletItem>
      </SSelectWalletModalContent>
    </SGradientWalletModalContent>
  );
};
