import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QuickPlayModal } from "../src/modals/QuickPlayModal";

const mockUseActiveWallet = jest.fn();

jest.mock("../src/hooks/useActiveWallet", () => ({
  useActiveWallet: () => mockUseActiveWallet(),
}));

describe("QuickPlayModal", () => {
  beforeEach(() => {
    mockUseActiveWallet.mockReturnValue({
      activeWallet: {
        walletClientType: "privy",
        connectorType: "embedded",
      },
    });
  });

  it("renders provided currency name", () => {
    render(
      <QuickPlayModal
        isVisible={true}
        setIsVisible={jest.fn()}
        formData={{}}
        onApprove={jest.fn()}
        currencyName="ETH"
      />,
    );

    expect(screen.getByText(/simply fund it with/i)).toHaveTextContent("ETH");
  });

  it("renders fallback currency text when currencyName is not provided", () => {
    render(
      <QuickPlayModal
        isVisible={true}
        setIsVisible={jest.fn()}
        formData={{}}
        onApprove={jest.fn()}
      />,
    );

    expect(screen.getByText(/simply fund it with/i)).toHaveTextContent(
      "your network currency",
    );
  });

  it("calls onApprove with formData and closes modal on success", async () => {
    const setIsVisible = jest.fn();
    const formData = { amount: 10, game: "quickplay" };
    const onApprove = jest.fn().mockResolvedValue(undefined);

    render(
      <QuickPlayModal
        isVisible={true}
        setIsVisible={setIsVisible}
        formData={formData}
        onApprove={onApprove}
        currencyName="USDC"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /approve/i }));

    await waitFor(() => {
      expect(onApprove).toHaveBeenCalledWith(formData);
      expect(setIsVisible).toHaveBeenCalledWith(false);
    });
  });

  it("does not close modal when onApprove rejects", async () => {
    const setIsVisible = jest.fn();
    const formData = { amount: 25 };
    const onApprove = jest.fn().mockRejectedValue(new Error("approve failed"));
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    render(
      <QuickPlayModal
        isVisible={true}
        setIsVisible={setIsVisible}
        formData={formData}
        onApprove={onApprove}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /approve/i }));

    await waitFor(() => {
      expect(onApprove).toHaveBeenCalledWith(formData);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    expect(setIsVisible).not.toHaveBeenCalledWith(false);
    consoleErrorSpy.mockRestore();
  });

  it("disables approve button when active wallet is not privy", () => {
    mockUseActiveWallet.mockReturnValue({
      activeWallet: {
        walletClientType: "metamask",
        connectorType: "injected",
      },
    });

    const onApprove = jest.fn();

    render(
      <QuickPlayModal
        isVisible={true}
        setIsVisible={jest.fn()}
        formData={{ amount: 10 }}
        onApprove={onApprove}
      />,
    );

    const approveButton = screen.getByRole("button", { name: /approve/i });
    expect(approveButton).toBeDisabled();

    fireEvent.click(approveButton);
    expect(onApprove).not.toHaveBeenCalled();
  });
});
