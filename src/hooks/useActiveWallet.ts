/**
 * useActiveWallet - Active wallet management (previous stable version)
 * Based on the working pattern from your casino app
 */

import { useMemo } from "react";
import {
  usePrivy,
  useWallets,
  type ConnectedWallet,
} from "@privy-io/react-auth";

export interface IActiveWallet extends ConnectedWallet {
  getEthereumProvider: () => Promise<any>;
  getSolanaProvider?: () => Promise<any>;
}

export const useActiveWallet = () => {
  const { ready, authenticated } = usePrivy();
  const { wallets: unlinkedWallets } = useWallets();
  const wallets = useMemo(
    () => unlinkedWallets.filter((wallet) => wallet.linked),
    [unlinkedWallets]
  );

  // Previous stable pattern: select first linked wallet as active
  // Type guard for IActiveWallet
  function isActiveWallet(obj: any): obj is IActiveWallet {
    return (
      obj &&
      typeof obj.getEthereumProvider === "function" &&
      // If you need Solana, you can add:
      (typeof obj.getSolanaProvider === "function" ||
        typeof obj.getSolanaProvider === "undefined")
    );
  }

  const activeWallet = useMemo(() => {
    if (!ready || !authenticated || wallets.length === 0) return null;
    const selectedWallet = wallets[0];
    // Only return if it passes the type guard
    return isActiveWallet(selectedWallet) ? selectedWallet : null;
  }, [ready, authenticated, wallets]);

  const walletAddress = useMemo(
    () => activeWallet?.address || "",
    [activeWallet]
  );
  const isWalletAuthed = useMemo(() => Boolean(activeWallet), [activeWallet]);
  const readyAndAuth = useMemo(
    () => ready && authenticated,
    [ready, authenticated]
  );

  return useMemo(
    () => ({
      activeWallet,
      isWalletAuthed,
      walletAddress,
      ready,
      authenticated,
      readyAndAuth,
      wallets,
    }),
    [
      activeWallet,
      isWalletAuthed,
      walletAddress,
      ready,
      authenticated,
      readyAndAuth,
      wallets,
    ]
  );
};
