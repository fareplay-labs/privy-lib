import React from "react";
import { ButtonEnum } from "../../components/shared/Button";
import ModalCard from "../../components/shared/Modal/Card";
import { useCallback, useState } from "react";
import { useActiveWallet } from "../../hooks/useActiveWallet";
import {
  FundPageButton,
  FundPageButtonWrapper,
  ButtonText,
  QuickplayContent,
} from "./styles";

export interface QuickPlayModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  formData: any;
  onApprove: (formData: any) => Promise<void> | void;
  currencyName?: string;
}

export const QuickPlayModal = ({
  isVisible,
  setIsVisible,
  formData,
  onApprove,
  currencyName,
}: QuickPlayModalProps) => {
  const handleClose = () => {
    setIsVisible(false);
  };
  const { activeWallet } = useActiveWallet();
  const [isApproving, setIsApproving] = useState(false);
  const displayCurrencyName = currencyName ?? "your network currency";
  const activeWalletClientType = (activeWallet as any)?.walletClientType;
  const activeWalletConnectorType = (activeWallet as any)?.connectorType;
  const isPrivyWalletActive =
    activeWalletClientType === "privy" ||
    activeWalletConnectorType === "embedded";

  const setup = useCallback(async () => {
    if (!isPrivyWalletActive) {
      return;
    }

    try {
      setIsApproving(true);
      await onApprove(formData);
      setIsVisible(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsApproving(false);
    }
  }, [formData, onApprove, setIsVisible, isPrivyWalletActive]);

  return (
    <ModalCard
      title="Setting up Quickplay"
      description="Connect to privy wallet"
      isVisible={isVisible}
      setIsVisible={handleClose}
      className="fund-modal-content"
      style={{ height: "fit-content" }}
    >
      <QuickplayContent>
        <p>
          Quickplay allows you to submit lightning fast, 1-click wagers without
          having to sign a transaction in your wallet.
        </p>
        <p>
          In order to use Quickplay, a new Privy wallet will be generated for
          you to gamble from.
        </p>
        <p>
          Only you control this wallet. Simply fund it with{" "}
          {displayCurrencyName} and start playing!
        </p>
      </QuickplayContent>
      <FundPageButton
        buttonType={ButtonEnum.BASE}
        type="button"
        disabled={isApproving || !isPrivyWalletActive}
        onClick={setup}
        isLoading={isApproving}
        loadingText={"APPROVING"}
      >
        <FundPageButtonWrapper>
          <ButtonText>APPROVE</ButtonText>
        </FundPageButtonWrapper>
      </FundPageButton>
    </ModalCard>
  );
};
