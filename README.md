# @zynkah/privy-lib

A lightweight React library for wallet selection and wallet overview UI components.  
Designed for easy integration, full portability, and consumer-provided icons and styles.

---

## ✨ Features

- **SelectWalletModal**: Animated, responsive modal for selecting and linking wallets.
- **WalletOverview**: Displays the active wallet’s name and icon.
- **No asset or config imports**: Consumers provide their own icons and wallet data.
- **Styled with [styled-components](https://styled-components.com/)**

---

## 🚀 Installation

```bash
npm install @zynkah/privy-lib styled-components framer-motion
```

---

## 🧩 Usage

### SelectWalletModal

```tsx
import { SelectWalletModal } from "@zynkah/privy-lib";

<SelectWalletModal
  isOpen={isWalletModalOpen}
  onClose={() => setWalletModalOpen(false)}
  wallets={wallets} // Array of wallet objects
  appWalletClientType={appWalletClientType}
  setAppWalletClientType={setAppWalletClientType}
  linkWalletToUser={linkWalletToUser}
  embeddedWalletLinks={embeddedWalletLinks}
  icons={{
    dragBar: "/icons/drag-bar.svg",
    privyIcon: "/icons/privy.svg",
    caretDown: "/icons/caret-down.svg",
    linkWallet: "/icons/link-wallet.svg",
  }}
  isMobileScreen={isMobileScreen}
/>
```

### WalletOverview

```tsx
import { WalletOverview } from "@zynkah/privy-lib";

<WalletOverview
  activeWallet={{
    meta: { name: "Privy Wallet", icon: "/icons/privy.svg" }
  }}
  onClick={() => setWalletModalOpen(true)}
  fallbackIcon="/icons/default-wallet.svg"
  isTabletScreen={false}
  isMobileScreen={true}
/>
```

---

## 📝 Props

### SelectWalletModal

| Prop                  | Type                                                                 | Description                                                                                 |
|-----------------------|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| `isOpen`              | `boolean`                                                            | Controls modal visibility.                                                                  |
| `onClose`             | `() => void`                                                         | Function to close the modal.                                                                |
| `wallets`             | `Array<{ address, meta, walletClientType, linked }>`                 | List of wallet objects to display.                                                          |
| `appWalletClientType` | `string`                                                             | The currently selected wallet client type.                                                  |
| `setAppWalletClientType` | `(type: string) => void`                                          | Function to set the selected wallet client type.                                            |
| `linkWalletToUser`    | `() => Promise<void>`                                                | Function to link a new wallet to the user.                                                  |
| `embeddedWalletLinks` | `Array<{ type, address?, number? }>`                                 | (Optional) List of embedded wallet links for the privy wallet.                              |
| `icons`               | `{ dragBar, privyIcon, caretDown, linkWallet: string }`              | Object containing icon URLs or paths for modal UI.                                          |
| `isMobileScreen`      | `boolean`                                                            | (Optional) If true, enables mobile-specific modal behavior and layout.                      |

### WalletOverview

| Prop            | Type                                  | Description                                                      |
|-----------------|---------------------------------------|------------------------------------------------------------------|
| `activeWallet`  | `{ meta: { name: string, icon?: string } }` | The wallet object with metadata including name and optional icon URL. |
| `onClick`       | `() => void`                          | Optional click handler for the component.                        |
| `fallbackIcon`  | `string`                              | Optional fallback icon URL if `activeWallet.meta.icon` is not provided. |
| `isTabletScreen`| `boolean`                             | Optional. If true, hides the wallet name on tablet screens.      |
| `isMobileScreen`| `boolean`                             | Optional. If true, shows the wallet name on mobile screens.      |

---

## 🎨 Styling & Customization

- Uses `styled-components` for all styles.
- Consumers can override styles via a theme or by extending the styled components.
- No direct asset imports; all icons are provided by the consumer.

---

## 📋 License

MIT

---

## 🤝 Contributing

Pull requests and issues are welcome!