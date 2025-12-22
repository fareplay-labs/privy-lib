import { CopyInputWrapper, InputAddress } from "./styles";
import { ButtonEnum } from "../../../components/shared/Button";
import { useActiveWallet } from "../../../hooks/useActiveWallet";
import { CopyToClipboard } from "./CopyToClipboard";

export const CopyWalletInput = () => {
  const { walletAddress } = useActiveWallet();

  return (
    <CopyInputWrapper>
      <InputAddress value={walletAddress} disabled />
      <CopyToClipboard
        value={walletAddress}
        buttonType={ButtonEnum.BASE}
        ariaLabel="Copy wallet address"
        style={{
          backgroundColor: "transparent",
          border: "none",
        }}
        asButton
      >
        📋
      </CopyToClipboard>
    </CopyInputWrapper>
  );
};
