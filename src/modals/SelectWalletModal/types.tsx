export interface SelectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallets: Array<{
    address: string;
    meta: { name: string; icon?: string };
    walletClientType: string;
    linked: boolean;
  }>;
  appWalletClientType: string;
  setAppWalletClientType: (type: string) => void;
  linkWalletToUser: () => Promise<void>;
  embeddedWalletLinks?: Array<{
    type: string;
    address?: string;
    number?: string;
  }>;
  icons: {
    dragBar: string;
    privyIcon: string;
    caretDown: string;
    linkWallet: string;
  };
  isMobileScreen?: boolean;
}