import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { FundWalletModal } from "../src/modals/FundWalletModal/index";
jest.mock("../src/hooks/useActiveWallet", () => ({
  useActiveWallet: () => ({
    walletAddress: "0x123",
    activeWallet: { address: "0x123" },
  }),
}));
jest.mock("@privy-io/react-auth", () => ({
  useFundWallet: () => ({ fundWallet: jest.fn() }),
}));

const mockChainDefinition = { id: 1, name: "Ethereum" };

describe("FundWalletModal integration (controlled)", () => {
  it("should call onDepositNext when deposit action is triggered", async () => {
    const onDepositNext = jest.fn();
    const onClose = jest.fn();

    const { getByText, getAllByText } = render(
      <FundWalletModal
        isOpen={true}
        onClose={onClose}
        onDepositNext={onDepositNext}
        stepIdx={0}
      />
    );

    // Find the 'Card Deposit' heading and open the accordion
    const cardDepositHeading = getByText(/card deposit/i);
    fireEvent.click(cardDepositHeading);

    // Find the '>' button for Card Deposit and click it
    const nextButtons = getAllByText(
      (content, element) => element?.textContent?.trim() === ">",
      { selector: "button" }
    );
    // Assume the first '>' button after opening the accordion is the deposit trigger
    const cardDepositButton = nextButtons[0];
    fireEvent.click(cardDepositButton);

    await waitFor(() => {
      expect(onDepositNext).toHaveBeenCalled();
    });
  });
});
