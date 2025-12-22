# FarePrivy Authentication & Wallet Management System

FarePrivy is a robust, scalable React library for authentication, wallet management, and casino-specific integrations, built around Privy Auth with advanced configuration, smart wallet, and USDC Vault support.

---

## 📦 Installation

```bash
npm install fare-privy-core @privy-io/react-auth styled-components@^5.3.0 valtio@^1.12.0
# or
pnpm add fare-privy-core @privy-io/react-auth styled-components@^5.3.0 valtio@^1.12.0
```

**Important:**
- Use `styled-components` v5.x (not v6.x)
- Use `valtio` v1.x (not v2.x)

---

## 🏗️ Folder Structure (Key Modules)

```
src/
├── components/
│   ├── SelectWalletModal.tsx
│   └── WalletOverview.tsx
├── config/
│   ├── privy.config.ts
│   ├── ConfigBuilder.ts
│   ├── constants.ts
│   ├── ConfigManager.ts
│   └── usage-examples.ts
├── hooks/
│   ├── useActiveWallet.ts
│   ├── useAuthActions.ts
│   ├── useConnectedWallets.ts
│   ├── useIsAuthenticated.ts
│   ├── useWalletAddresses.ts
│   ├── useWalletBalance.ts
│   └── common/
├── lib/
│   └── casino-auth/
│       ├── CasinoAuthProvider.tsx
│       ├── config-factory.ts
│       ├── ExtendedConfigBuilder.ts
│       └── hooks/
├── modals/
├── store/
├── styles/
└── utility/
```

---

## 🚀 Quick Start


### Basic Casino Setup

// Example biconomyConfig definition (see Advanced Configuration for more details)
const biconomyConfig = {
  chainId: 42161, // required, e.g. Arbitrum One
  bundlerUrl: 'https://bundler.biconomy.io/api/v2/42161/abc...', // required
  paymasterUrl: 'https://paymaster.biconomy.io/api/v1/42161/xyz...', // required
  // Optional fields:
  entryPointAddress: '0x...', // optional, default provided by SDK
  // ...add any other supported Biconomy config keys
};

```tsx
import { PrivyProvider } from 'fare-privy-core';

function App() {
  return (
    <PrivyProvider appId="your-privy-app-id" smartWalletConfig={biconomyConfig}>
      <YourCasinoApp />
    </PrivyProvider>
  );
}
```
// For more details on biconomyConfig, see the Advanced Configuration section below.

### With Custom Branding

```tsx
<PrivyProvider
  appId="your-privy-app-id"
  theme={{ accentColor: '#ff6b35', logo: '/logo.png', darkMode: true }}
  config={{ loginMethods: ['email', 'wallet', 'google'] }}
>
  <CasinoGames />
</PrivyProvider>
```

### With Smart Wallets

```tsx
<PrivyProvider
  appId="your-privy-app-id"
  smartWalletConfig={biconomyConfig}
>
  <CasinoWithGaslessTransactions />
</PrivyProvider>
```

### Multi-Chain Support

```tsx
<PrivyProvider
  appId="your-privy-app-id"
  config={{ appearance: { walletChainType: 'ethereum-and-solana' } }}
>
  <CrossChainCasino />
</PrivyProvider>
```

---

## 🧩 UI Components

### SelectWalletModal

Animated, responsive modal for selecting and linking wallets. You provide wallet data and icons.

**Props:**

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

Displays the active wallet’s name and icon.

**Props:**

| Prop            | Type                                  | Description                                                      |
|-----------------|---------------------------------------|------------------------------------------------------------------|
| `activeWallet`  | `{ meta: { name: string, icon?: string } }` | The wallet object with metadata including name and optional icon URL. |
| `onClick`       | `() => void`                          | Optional click handler for the component.                        |
| `fallbackIcon`  | `string`                              | Optional fallback icon URL if `activeWallet.meta.icon` is not provided. |

---

### FundWalletModal

A ready-to-use modal for funding your wallet, with animated carousel and exchange/card options.

**Features:**
- Animated card carousel (`CardCarousel`)
- Transfer funds via exchange or card
- Uses `useWalletBalance` for live balances
- Fully customizable images, navigation, and step control
- Minimal required props, npm-friendly defaults

**Props:**
| Prop           | Type                       | Description                                 |
|----------------|----------------------------|---------------------------------------------|
| `isOpen`       | `boolean`                  | Controls modal visibility                   |
| `onClose`      | `() => void`               | Function to close the modal                 |
| `images`       | `string[]`                 | Custom images for exchanges/cards           |
| `stepIdx`      | `number`                   | (Optional) Current step index (carousel)    |
| `setStepIdx`   | `(idx: number) => void`    | (Optional) Handler to change step index     |
| `onTransferNext` | `() => void`             | (Optional) Handler for transfer next action |
| `onDepositNext` | `() => void`              | (Optional) Handler for deposit next action  |

**Basic Usage Example:**
```tsx
import React, { useState } from "react";
import { FundWalletModal } from "fare-privy-core";

export function FundWalletModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Fund Wallet Modal</button>
      <FundWalletModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
```

**Advanced Usage Example (Custom images, step control, handlers):**
```tsx
import React, { useState } from "react";
import { FundWalletModal } from "fare-privy-core";

const customImages = [
  "/custom/coinbase.svg",
  "/custom/binance.svg",
  "/custom/kraken.svg",
  "/custom/card.svg",
];

export function CustomFundWalletModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const handleTransferNext = () => setStepIdx(1);
  const handleDepositNext = () => setStepIdx(1);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Fund Wallet Modal</button>
      <FundWalletModal
        isOpen={isOpen}
        onClose={() => { setIsOpen(false); setStepIdx(0); }}
        images={customImages}
        stepIdx={stepIdx}
        setStepIdx={setStepIdx}
        onTransferNext={handleTransferNext}
        onDepositNext={handleDepositNext}
      />
    </>
  );
}
```

You can fully control the modal's images, navigation, and step logic from your app. The modal will call `onClose` when the user closes it.
---

## 🪝 Hooks Overview

- `useAuthActions()` – Login/logout control
- `useConnectedWallets()` – All wallet info
- `useActiveWallet()` – Get active wallet
- `useWalletAddresses()` – Get addresses by chain
- `useIsAuthenticated()` – Simple auth check
- `useWalletBalance()` – Native currency balances

See [HOOKS.md](./HOOKS.md) for full details and advanced usage.

---

## 🛠️ Advanced Configuration & Casino Features

- **ConfigBuilder & ExtendedConfigBuilder**: Fluent APIs for building complex, environment/device/region-specific configs
- **CasinoAuthProvider**: Modular provider for casino-specific authentication, USDC Vault, and advanced permissions
- **Smart Wallet Integration**: Biconomy and embedded wallet support, gas sponsorship, VRF, and trial management
- **Adaptability**: Device-responsive, user-tier, and region-specific configuration
- **State Management**: Valtio-powered wallet switching and modal state
- **Styling**: Fully themeable with `styled-components` and CSS variable overrides

---


## 📚 Example: Enhanced Casino Auth with USDC Vault

// Legend: // required, // optional, // default: ...
// Note: casinoSlug and casinoEntity.id should match for consistency, but can differ if you support multiple brands. Required fields are marked, optional fields and defaults are noted. See docs for mutually exclusive options.

```tsx
import { CasinoAuthProvider } from 'fare-privy-core/lib/casino-auth';

function CustomCasino() {
  return (
    <CasinoAuthProvider
      casinoSlug="my-casino" // required, should match casinoEntity.id
      customConfig={{
        appearance: { // optional
          accentColor: '#ff0000', // optional
          logo: '/my-logo.png' // optional
        },
        blockchain: { // required
          currency: 'USDC', // required
          primaryChain: 'ARBITRUM', // required
          smartWallet: { // optional
            provider: 'biconomy', // required if smartWallet used
            vaultConfig: { // required if using smartWallet
              vaultAddress: '0x...', // required
              fareAAAddress: '0x...', // required
              usdcAddress: '0x...' // required
            }
          }
        },
        api: { // optional
          contracts: {
            vaultAddress: '0x...', // required if using vault features
            vrfWrapperAddress: '0x...' // optional, required for VRF
          }
        }
      }}
      casinoEntity={{
        id: 'my-casino', // required, should match casinoSlug
        username: 'mycasino', // required
        config: {
          title: 'My Custom Casino', // required
          colors: { // optional
            themeColor1: '#ff0000', // optional
            themeColor2: '#darkred' // optional
          }
        }
      }}
    >
      <CasinoApp />
    </CasinoAuthProvider>
  );
}
```

---

## 🎨 Styling & Theming

- Uses `styled-components` for all styles
- Theme via provider or CSS variables (see `styles/privy-theme-override.css`)
- No direct asset imports; all icons are provided by the consumer

---

## 📄 License

ISC License - see LICENSE file for details.

---

## 🤝 Contributing

Pull requests and issues are welcome!
