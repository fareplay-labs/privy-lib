/**
 * useWalletAddresses - Address extraction by chain type
 * Get wallet addresses organized by blockchain
 */

import { useMemo, useEffect } from "react";
import { useConnectedWallets } from "./useConnectedWallets";

// Define a wallet shape for type safety
interface Wallet {
  chainType?: string;
  walletClientType?: string;
  connectorType?: string;
  address: string;
}

export const useWalletAddresses = () => {
  const { connectedWallets } = useConnectedWallets();

  const ethereumAddresses = useMemo(() => {
    return (connectedWallets as Wallet[])
      .filter((w) => {
        // Multiple ways to check for Ethereum wallets
        const { chainType, walletClientType, connectorType } = w;
        return (
          chainType === "ethereum" ||
          walletClientType === "ethereum" ||
          connectorType === "embedded" || // Embedded wallets are usually Ethereum
          connectorType === "injected" || // MetaMask, etc.
          !chainType // Default to Ethereum if no chain type specified
        );
      })
      .map((w) => w.address);
  }, [connectedWallets]);

  const solanaAddresses = useMemo(() => {
    return (connectedWallets as Wallet[])
      .filter((w) => {
        const { chainType, walletClientType } = w;
        return chainType === "solana" || walletClientType === "solana";
      })
      .map((w) => w.address);
  }, [connectedWallets]);

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
