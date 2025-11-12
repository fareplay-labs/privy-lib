import React from "react";
import { render, screen } from "@testing-library/react";
import { PrivyProvider } from "../PrivyProviderTest";
import { switchWalletState } from "../farePrivy/store/switchWallet";

// Mock Privy
jest.mock("@privy-io/react-auth", () => ({
  PrivyProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="privy-provider">{children}</div>
  ),
}));

describe("Package Integration Tests", () => {
  it("can use both exports together", () => {
    const TestComponent = () => {
      return (
        <div>
          <span data-testid="wallet-state">
            Wallet Modal Open: {switchWalletState.isWalletModalOpen ? "Yes" : "No"}
          </span>
          <span data-testid="connector-type">
            Connector Type: {switchWalletState.selectedConnectorType || "None"}
          </span>
        </div>
      );
    };

    render(
      <PrivyProvider appId="test-id">
        <TestComponent />
      </PrivyProvider>
    );

    expect(screen.getByTestId("privy-provider")).toBeInTheDocument();
    expect(screen.getByTestId("wallet-state")).toBeInTheDocument();
    expect(screen.getByText(/Wallet Modal Open: No/)).toBeInTheDocument();
    expect(screen.getByTestId("connector-type")).toBeInTheDocument();
    expect(screen.getByText(/Connector Type: None/)).toBeInTheDocument();
  });

  it("exports are accessible from main entry point", () => {
    // Test that imports work correctly from the main index
    expect(PrivyProvider).toBeDefined();
    expect(switchWalletState).toBeDefined();
    expect(typeof PrivyProvider).toBe("function");
    expect(typeof switchWalletState).toBe("object");
  });

  it("package has all expected exports", () => {
    // Verify main exports are present
    expect(PrivyProvider).not.toBeUndefined();
    expect(switchWalletState).not.toBeUndefined();
  });

  it("handles complex integration scenarios", () => {
    const ComplexComponent = () => {
      const modalOpen = switchWalletState.isWalletModalOpen;
      const connectorType = switchWalletState.selectedConnectorType;

      return (
        <div data-testid="complex-component">
          <span>Modal Status: {modalOpen ? "Open" : "Closed"}</span>
          <span>Connector: {connectorType || "Unset"}</span>
        </div>
      );
    };

    render(
      <PrivyProvider appId="integration-test">
        <ComplexComponent />
      </PrivyProvider>
    );

    expect(screen.getByText(/Modal Status: Closed/)).toBeInTheDocument();
    expect(screen.getByText(/Connector: Unset/)).toBeInTheDocument();
  });

  it("wallet state properties can be modified", () => {
    // Test that the state is reactive and can be updated
    const StateComponent = () => {
      return (
        <div>
          <span data-testid="modal-state">
            {switchWalletState.isWalletModalOpen ? "Modal Open" : "Modal Closed"}
          </span>
          <button
            onClick={() => {
              switchWalletState.isWalletModalOpen = true;
              switchWalletState.selectedConnectorType = "metamask";
            }}
            data-testid="open-modal"
          >
            Open Modal
          </button>
        </div>
      );
    };

    render(
      <PrivyProvider appId="state-test">
        <StateComponent />
      </PrivyProvider>
    );

    // Initial state
    expect(screen.getByText(/Modal Closed/)).toBeInTheDocument();

    // Modify state
    switchWalletState.isWalletModalOpen = true;
    switchWalletState.selectedConnectorType = "metamask";

    // Verify state changed
    expect(switchWalletState.isWalletModalOpen).toBe(true);
    expect(switchWalletState.selectedConnectorType).toBe("metamask");

    // Reset state for other tests
    switchWalletState.isWalletModalOpen = false;
    switchWalletState.selectedConnectorType = "";
  });
});
