/**
 * Simplified wallet hooks for casino clients
 * No external dependencies - ready to use!
 */

import { useMemo, useState, useEffect } from "react";
import {
  usePrivy,
  useWallets as usePrivyWallets,
  useLogin,
  useLogout,
  type ConnectedWallet,
} from "@privy-io/react-auth";

/**
 * Get active/connected wallets
 * Works with both Ethereum and Solana wallets
 */
export const useConnectedWallets = () => {
  const { ready, authenticated } = usePrivy();
  const { wallets } = usePrivyWallets();

  const connectedWallets = useMemo(
    () => wallets.filter((wallet) => wallet.linked),
    [wallets]
  );

  const primaryWallet = useMemo(() => {
    if (!ready || !authenticated || connectedWallets.length === 0) return null;
    return connectedWallets[0];
  }, [ready, authenticated, connectedWallets]);

  const embeddedWallet = useMemo(() => {
    return (
      connectedWallets.find((wallet) => wallet.connectorType === "embedded") ||
      null
    );
  }, [connectedWallets]);

  const externalWallet = useMemo(() => {
    return (
      connectedWallets.find((wallet) => wallet.connectorType !== "embedded") ||
      null
    );
  }, [connectedWallets]);

  return {
    /** All connected/linked wallets */
    connectedWallets,
    /** Primary wallet (first connected) */
    primaryWallet,
    /** Embedded Privy wallet if exists */
    embeddedWallet,
    /** External wallet (MetaMask, Phantom, etc.) if exists */
    externalWallet,
    /** Whether user is authenticated */
    isAuthenticated: authenticated && ready,
    /** Whether Privy is ready */
    isReady: ready,
  };
};

/**
 * Get wallet addresses by chain type
 */
export const useWalletAddresses = () => {
  const { connectedWallets } = useConnectedWallets();

  const ethereumAddresses = useMemo(
    () =>
      connectedWallets
        .filter((w) => (w as any).chainType === "ethereum")
        .map((w) => w.address),
    [connectedWallets]
  );

  const solanaAddresses = useMemo(
    () =>
      connectedWallets
        .filter((w) => (w as any).chainType === "solana")
        .map((w) => w.address),
    [connectedWallets]
  );

  return {
    /** All Ethereum wallet addresses */
    ethereumAddresses,
    /** All Solana wallet addresses */
    solanaAddresses,
    /** Primary Ethereum address */
    primaryEthereumAddress: ethereumAddresses[0] || null,
    /** Primary Solana address */
    primarySolanaAddress: solanaAddresses[0] || null,
  };
};

/**
 * Check if user is authenticated with wallet
 */
export const useIsAuthenticated = () => {
  const { user, ready, authenticated } = usePrivy();
  const { connectedWallets } = useConnectedWallets();

  const hasWallet = connectedWallets.length > 0;
  const isFullyAuthenticated = authenticated && ready && hasWallet;

  return {
    /** User is authenticated and has wallet connected */
    isAuthenticated: isFullyAuthenticated,
    /** User object from Privy */
    user,
    /** Number of connected wallets */
    walletCount: connectedWallets.length,
    /** Privy ready state */
    isReady: ready,
  };
};

/**
 * Handle user login - perfect for casino entry buttons
 */
export const useAuthActions = () => {
  const { login } = useLogin();
  const { logout } = useLogout();
  const { ready, authenticated } = usePrivy();

  return {
    /** Login function - opens Privy modal */
    login,
    /** Logout function - disconnects user */
    logout,
    /** Whether actions are ready to use */
    isReady: ready,
    /** Whether user is currently authenticated */
    isAuthenticated: authenticated,
  };
};

/**
 * Get wallet balances for Ethereum and Solana
 * Fetches native currency balances (ETH, SOL)
 */
export const useWalletBalance = () => {
  const { primaryEthereumAddress, primarySolanaAddress } = useWalletAddresses();
  const [balances, setBalances] = useState<{
    ethereum: string | null;
    solana: string | null;
    loading: boolean;
    error: string | null;
  }>({
    ethereum: null,
    solana: null,
    loading: false,
    error: null,
  });

  const fetchEthereumBalance = async (address: string) => {
    try {
      // Use a public RPC endpoint for Ethereum mainnet
      const response = await fetch("https://eth.llamarpc.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_getBalance",
          params: [address, "latest"],
          id: 1,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      // Convert from wei to ETH
      const balanceInWei = BigInt(data.result);
      const balanceInEth = Number(balanceInWei) / 1e18;
      return balanceInEth.toFixed(6);
    } catch (error) {
      console.error("Error fetching Ethereum balance:", error);
      throw error;
    }
  };

  const fetchSolanaBalance = async (address: string) => {
    try {
      // Use a public RPC endpoint for Solana mainnet
      const response = await fetch("https://api.mainnet-beta.solana.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getBalance",
          params: [address],
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      // Convert from lamports to SOL
      const balanceInLamports = data.result.value;
      const balanceInSol = balanceInLamports / 1e9;
      return balanceInSol.toFixed(6);
    } catch (error) {
      console.error("Error fetching Solana balance:", error);
      throw error;
    }
  };

  const refreshBalances = async () => {
    if (!primaryEthereumAddress && !primarySolanaAddress) return;

    setBalances((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const promises: Promise<void>[] = [];

      if (primaryEthereumAddress) {
        promises.push(
          fetchEthereumBalance(primaryEthereumAddress)
            .then((balance) => {
              setBalances((prev) => ({ ...prev, ethereum: balance }));
            })
            .catch((error) => {
              setBalances((prev) => ({ ...prev, error: error.message }));
            })
        );
      }

      if (primarySolanaAddress) {
        promises.push(
          fetchSolanaBalance(primarySolanaAddress)
            .then((balance) => {
              setBalances((prev) => ({ ...prev, solana: balance }));
            })
            .catch((error) => {
              setBalances((prev) => ({ ...prev, error: error.message }));
            })
        );
      }

      await Promise.allSettled(promises);
    } catch (error) {
      setBalances((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Unknown error",
      }));
    } finally {
      setBalances((prev) => ({ ...prev, loading: false }));
    }
  };

  // Auto-fetch balances when addresses change
  useEffect(() => {
    if (primaryEthereumAddress || primarySolanaAddress) {
      refreshBalances();
    }
  }, [primaryEthereumAddress, primarySolanaAddress]);

  return {
    /** Ethereum balance in ETH (formatted to 6 decimals) */
    ethereumBalance: balances.ethereum,
    /** Solana balance in SOL (formatted to 6 decimals) */
    solanaBalance: balances.solana,
    /** Whether balance fetch is in progress */
    loading: balances.loading,
    /** Error message if balance fetch failed */
    error: balances.error,
    /** Manually refresh balances */
    refreshBalances,
    /** Whether any balances are available */
    hasBalances: !!(balances.ethereum || balances.solana),
  };
};
