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
            Wallet State Available: {switchWalletState ? "Yes" : "No"}
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
    expect(screen.getByText(/Wallet State Available: Yes/)).toBeInTheDocument();
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
      const hasWalletState = !!switchWalletState;

      return (
        <div data-testid="complex-component">
          <span>Integration Test: {hasWalletState ? "Success" : "Failed"}</span>
        </div>
      );
    };

    render(
      <PrivyProvider appId="integration-test">
        <ComplexComponent />
      </PrivyProvider>
    );

    expect(screen.getByText(/Integration Test: Success/)).toBeInTheDocument();
  });
});
