import { useCallback } from "react";
import {
  SWalletItem,
  SWalletInfo,
  SWalletAddress,
  SWalletName,
  SWalletIcon,
} from "./styles";

interface LinkWalletProps {
  linkWalletToUser: () => Promise<void>;
  icons: {
    linkWallet: string;
  };
}

export const LinkWallet = ({ linkWalletToUser, icons }: LinkWalletProps) => {
  const handleLinkNewWallet = useCallback(async () => {
    try {
      await linkWalletToUser();
    } catch (err) {
      console.error(err);
    }
  }, [linkWalletToUser]);

  return (
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
  );
};
