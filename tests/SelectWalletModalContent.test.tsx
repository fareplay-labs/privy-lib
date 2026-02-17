import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SelectWalletModalContent } from "../src/modals/SelectWalletModal/SelectWalletModalContent";
import { switchWalletState } from "../src/store/switchWallet";

jest.mock("../src/modals/SelectWalletModal/styles", () => ({
  SGradientWalletModalContent: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div data-testid="gradient-content">{children}</div>,
  SSelectWalletModalContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="modal-content">{children}</div>
  ),
  SEmbeddedWalletItem: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SUnlinkButton: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

jest.mock("../src/modals/SelectWalletModal/SelectWalletModalHeader", () => ({
  SelectWalletModalHeader: () => <div data-testid="wallet-modal-header" />,
}));

jest.mock("../src/modals/SelectWalletModal/LinkWallet", () => ({
  LinkWallet: () => <div data-testid="link-wallet" />,
}));

jest.mock("../src/modals/SelectWalletModal/SelectWalletItemList", () => ({
  SelectWalletItemList: ({
    wallet,
    onClick,
  }: {
    wallet: { walletClientType: string };
    onClick: () => void;
  }) => (
    <button data-testid={`wallet-${wallet.walletClientType}`} onClick={onClick}>
      {wallet.walletClientType}
    </button>
  ),
}));

describe("SelectWalletModalContent", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    switchWalletState.selectedConnectorType = "";
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("updates shared switchWalletState and closes modal when selecting a different wallet", () => {
    const closeModal = jest.fn();
    const setAppWalletClientType = jest.fn();

    render(
      <SelectWalletModalContent
        closeModal={closeModal}
        wallets={[
          {
            address: "0x1111111111111111111111111111111111111111",
            meta: { name: "Privy Wallet" },
            walletClientType: "privy",
            linked: true,
          },
          {
            address: "0x2222222222222222222222222222222222222222",
            meta: { name: "MetaMask" },
            walletClientType: "metamask",
            linked: true,
          },
        ]}
        appWalletClientType="privy"
        setAppWalletClientType={setAppWalletClientType}
        linkWalletToUser={jest.fn()}
        embeddedWalletLinks={[]}
        icons={{ dragBar: "", privyIcon: "", caretDown: "", linkWallet: "" }}
      />,
    );

    fireEvent.click(screen.getByTestId("wallet-metamask"));

    expect(setAppWalletClientType).toHaveBeenCalledWith("metamask");
    expect(switchWalletState.selectedConnectorType).toBe("metamask");

    jest.advanceTimersByTime(300);
    expect(closeModal).toHaveBeenCalled();
  });

  it("does not update state when selecting the currently active wallet", () => {
    const closeModal = jest.fn();
    const setAppWalletClientType = jest.fn();

    render(
      <SelectWalletModalContent
        closeModal={closeModal}
        wallets={[
          {
            address: "0x1111111111111111111111111111111111111111",
            meta: { name: "Privy Wallet" },
            walletClientType: "privy",
            linked: true,
          },
          {
            address: "0x2222222222222222222222222222222222222222",
            meta: { name: "MetaMask" },
            walletClientType: "metamask",
            linked: true,
          },
        ]}
        appWalletClientType="privy"
        setAppWalletClientType={setAppWalletClientType}
        linkWalletToUser={jest.fn()}
        embeddedWalletLinks={[]}
        icons={{ dragBar: "", privyIcon: "", caretDown: "", linkWallet: "" }}
      />,
    );

    fireEvent.click(screen.getByTestId("wallet-privy"));

    expect(setAppWalletClientType).not.toHaveBeenCalled();
    expect(switchWalletState.selectedConnectorType).toBe("");

    jest.advanceTimersByTime(300);
    expect(closeModal).not.toHaveBeenCalled();
  });
});
