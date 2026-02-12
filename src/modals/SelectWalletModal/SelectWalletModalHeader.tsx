import { SWalletHeader } from "./styles";

interface HeaderProps {
  isMobileScreen: boolean;
  icons: {
    dragBar: string;
  };
}

export const SelectWalletModalHeader = ({
  isMobileScreen,
  icons,
}: HeaderProps) => {
  return (
    <>
      {isMobileScreen && (
        <img
          style={{ marginInline: "auto" }}
          src={icons.dragBar}
          alt="drag bar"
          width={32}
        />
      )}
      <SWalletHeader>SELECT OR LINK A WALLET</SWalletHeader>
    </>
  );
};
