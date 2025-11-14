/**
 * Test to verify new hooks work correctly
 */

import { render } from "@testing-library/react";
import {
  useConnectedWallets,
  useWalletAddresses,
  useIsAuthenticated,
  useAuthActions,
  useWalletBalance,
} from "../hooks/useWallets";

// Mock Privy
jest.mock("@privy-io/react-auth", () => ({
  usePrivy: () => ({
    ready: true,
    authenticated: true,
  }),
  useWallets: () => ({
    wallets: [
      {
        address: "0x123...abc",
        connectorType: "embedded",
        linked: true,
      },
      {
        address: "9x456...def",
        connectorType: "injected",
        linked: true,
      },
    ],
  }),
  useLogin: () => ({
    login: jest.fn(),
  }),
  useLogout: () => ({
    logout: jest.fn(),
  }),
}));

function TestComponent() {
  const { primaryWallet, isAuthenticated } = useConnectedWallets();
  const { primaryEthereumAddress } = useWalletAddresses();
  const { isAuthenticated: authCheck } = useIsAuthenticated();
  const { login, logout, isReady } = useAuthActions();
  const { ethereumBalance, solanaBalance, loading, error } = useWalletBalance();

  return (
    <div>
      <span data-testid="primary-wallet">
        {primaryWallet?.address || "none"}
      </span>
      <span data-testid="is-authenticated">
        {isAuthenticated ? "yes" : "no"}
      </span>
      <span data-testid="eth-address">{primaryEthereumAddress || "none"}</span>
      <span data-testid="auth-check">{authCheck ? "yes" : "no"}</span>
      <span data-testid="login-ready">{isReady ? "yes" : "no"}</span>
      <span data-testid="has-login">
        {typeof login === "function" ? "yes" : "no"}
      </span>
      <span data-testid="has-logout">
        {typeof logout === "function" ? "yes" : "no"}
      </span>
      <span data-testid="ethereum-balance">{ethereumBalance || "loading"}</span>
      <span data-testid="solana-balance">{solanaBalance || "loading"}</span>
      <span data-testid="balance-loading">{loading ? "yes" : "no"}</span>
    </div>
  );
}

describe("New Wallet Hooks", () => {
  it("can import and use all hooks without errors", () => {
    expect(() => {
      render(<TestComponent />);
    }).not.toThrow();
  });

  it("hooks return expected data structure", () => {
    const { container } = render(<TestComponent />);

    // Should have wallet address
    expect(
      container.querySelector('[data-testid="primary-wallet"]')?.textContent
    ).toBe("0x123...abc");

    // Should be authenticated
    expect(
      container.querySelector('[data-testid="is-authenticated"]')?.textContent
    ).toBe("yes");
    expect(
      container.querySelector('[data-testid="auth-check"]')?.textContent
    ).toBe("yes");
  });
});
