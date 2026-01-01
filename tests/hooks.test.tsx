// Revert to previous test implementation for hooks
// This is a placeholder for the previous implementation
// ...existing code...
/**
 * Test to verify new hooks work correctly
 */

import React from "react";
import { render } from "@testing-library/react";
import {
  useConnectedWallets,
  useWalletAddresses,
  useIsAuthenticated,
  useAuthActions,
  useWalletBalance,
  useActiveWallet,
} from "../src/hooks/index";

// Mock Privy
jest.mock("@privy-io/react-auth", () => ({
  usePrivy: () => ({
    ready: true,
    authenticated: true,
    user: { id: "test-user" },
  }),
  useWallets: () => ({
    wallets: [
      {
        address: "0x123...abc",
        connectorType: "embedded",
        linked: true,
        chainId: "eip155:1",
        type: "ethereum",
        getEthereumProvider: jest.fn().mockResolvedValue({
          request: jest.fn().mockResolvedValue("0x0"),
        }),
      },
      {
        address: "0x123...def",
        connectorType: "injected",
        linked: true,
        chainId: "eip155:1",
        type: "ethereum",
        getEthereumProvider: jest.fn().mockResolvedValue({
          request: jest.fn().mockResolvedValue("0x0"),
        }),
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
  const { activeWallet, isWalletAuthed } = useActiveWallet();
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
      <span data-testid="active-wallet">{activeWallet?.address || "none"}</span>
      <span data-testid="wallet-authed">{isWalletAuthed ? "yes" : "no"}</span>
      <span data-testid="ethereum-balance">{ethereumBalance || "loading"}</span>
      <span data-testid="solana-balance">{solanaBalance || "loading"}</span>
      <span data-testid="balance-loading">{loading ? "yes" : "no"}</span>
      <span data-testid="balance-error">{error || "none"}</span>
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

    // Should have active wallet
    expect(
      container.querySelector('[data-testid="active-wallet"]')?.textContent
    ).toBe("0x123...abc");

    // Should show wallet is authed
    expect(
      container.querySelector('[data-testid="wallet-authed"]')?.textContent
    ).toBe("yes");
  });

  it("useActiveWallet hook works independently", () => {
    function ActiveWalletTestComponent() {
      const { activeWallet, isWalletAuthed, walletAddress } = useActiveWallet();
      return (
        <div>
          <span data-testid="active-address">{walletAddress}</span>
          <span data-testid="is-wallet-authed">
            {isWalletAuthed ? "yes" : "no"}
          </span>
        </div>
      );
    }

    const { container } = render(<ActiveWalletTestComponent />);

    expect(
      container.querySelector('[data-testid="active-address"]')?.textContent
    ).toBe("0x123...abc");

    expect(
      container.querySelector('[data-testid="is-wallet-authed"]')?.textContent
    ).toBe("yes");
  });
});
