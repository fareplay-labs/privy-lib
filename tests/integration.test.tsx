import React from "react";
import { render, screen, act } from "@testing-library/react";
import { useSnapshot } from "valtio";
import { PrivyProvider } from "../PrivyProviderTest";
import { switchWalletState } from "../src/store/switchWallet";

// Mock Privy
jest.mock("@privy-io/react-auth", () => ({
  PrivyProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="privy-provider">{children}</div>
  ),
}));

jest.mock("@privy-io/react-auth/smart-wallets", () => ({
  SmartWalletsProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="smart-wallets-provider">{children}</div>
  ),
}));

describe("Package Integration Tests", () => {
  it("can use both exports together", () => {
    const TestComponent = () => {
      const snap = useSnapshot(switchWalletState);
      return (
        <div>
          <span data-testid="wallet-state">
            Wallet Modal Open: {snap.isWalletModalOpen ? "Yes" : "No"}
          </span>
          <span data-testid="connector-type">
            Connector Type: {snap.selectedConnectorType || "None"}
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
      const snap = useSnapshot(switchWalletState);
      return (
        <div data-testid="complex-component">
          <span>
            Modal Status: {snap.isWalletModalOpen ? "Open" : "Closed"}
          </span>
          <span>Connector: {snap.selectedConnectorType || "Unset"}</span>
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
      const snap = useSnapshot(switchWalletState);
      return (
        <div>
          <span data-testid="modal-state">
            {snap.isWalletModalOpen ? "Modal Open" : "Modal Closed"}
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
    act(() => {
      switchWalletState.isWalletModalOpen = true;
      switchWalletState.selectedConnectorType = "metamask";
    });
    // Verify state changed
    expect(switchWalletState.isWalletModalOpen).toBe(true);
    expect(switchWalletState.selectedConnectorType).toBe("metamask");

    // Reset state for other tests
    switchWalletState.isWalletModalOpen = false;
    switchWalletState.selectedConnectorType = "";
  });
});
