# FarePrivy Authentication & Wallet Management System

FarePrivy is a robust, scalable React library for authentication, wallet management, and casino-specific integrations, built around Privy Auth with advanced configuration, smart wallet, and USDC Vault support.

## 🆕 What's New (v1.9.15)

- `WalletOverview` now supports `fallbackIcon` so you can provide a default icon when the active wallet has no icon metadata

- Added `QuickPlayModal` as a fully npm-friendly export
- QuickPlay approve is now enabled only when the active wallet is Privy
- QuickPlay now shows clear disabled-state guidance when a non-Privy wallet is active (`Connect Privy Wallet` + helper message)
- Removed automatic wallet switching from QuickPlay approve flow
- `useActiveWallet` now respects selected connector preference from shared wallet state
- `useActiveWallet` wallet matching is now case-insensitive across selected connector type, wallet client type, and connector type
- `SelectWalletModal` now updates shared `switchWalletState` so wallet selection is reflected globally

## 🗒️ Changelog

### v1.9.15
- Added `fallbackIcon` support to `WalletOverview` so consumers can render a default icon when `activeWallet.meta.icon` is missing

### v1.9.14
- Added disabled-state UX guidance to `QuickPlayModal` (`Connect Privy Wallet` label, helper message, and accessibility hinting)
- Made `useActiveWallet` connector/client matching case-insensitive for reliable wallet selection
- Consolidated test/build-only packages under `devDependencies`

### v1.9.13
- Added `QuickPlayModal` export and Privy-gated approval behavior
- Synced `SelectWalletModal` wallet selection with shared `switchWalletState`

---

## 📦 Installation

```bash
npm install fare-privy-core @privy-io/react-auth styled-components@^5.3.0 valtio@^1.12.0 react-dom@^18.3.1
# or
pnpm add fare-privy-core @privy-io/react-auth styled-components@^5.3.0 valtio@^1.12.0 react-dom@^18.3.1
```

**Important:**
- Use `styled-components` v5.x (not v6.x). v6.x is not supported and will break theming and modal styles.
- Use `valtio` v1.x (not v2.x)
- Use `react-dom` version matching your `react` version (recommended: `^18.3.1`).

**Troubleshooting:**
- If you see errors or broken styles related to styled-components, ensure you are using v5.x and not v6.x.
- If you see React rendering or hydration errors, ensure `react-dom` matches your `react` version.

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

Animated, responsive modal for selecting and linking wallets. Header rendering fixed in v1.9.7. You provide wallet data and icons.

**Architecture (v1.9.7):**
- **Fully modular component structure** with dedicated, focused sub-components:
  - `SelectWalletModalContent` - Main content container and orchestration
  - `SelectWalletModalHeader` - Header with drag bar support (rendered once inside content container)
  - `SelectWalletItemList` - Individual wallet item with accordion and embedded wallets
  - `LinkWallet` - Separate component for wallet linking functionality
- **Fixed rendering** - Header now correctly renders once at the top of the content container
- **Type definitions** in dedicated `types.tsx` for better type safety
- **Clean separation of concerns** - each component has a single, well-defined responsibility
- **Improved maintainability** - easier to customize, extend, and test individual pieces

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
| `onDepositNext` | `() => void`              | (Recommended) Handler for deposit next action. Pass the fundWallet function from useFundWallet (see below). |

**Recommended Usage:**
```tsx
import React, { useState } from "react";
import { FundWalletModal } from "fare-privy-core";
import { useFundWallet } from "@privy-io/react-auth";

export function FundWalletModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const { fundWallet } = useFundWallet();
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Fund Wallet Modal</button>
      <FundWalletModal isOpen={isOpen} onClose={() => setIsOpen(false)} onDepositNext={fundWallet} />
    </>
  );
}
```

**Advanced Usage Example (Custom images, step control, handlers):**
```tsx
import React, { useState } from "react";
import { FundWalletModal } from "fare-privy-core";
import { useFundWallet } from "@privy-io/react-auth";

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
  const { fundWallet } = useFundWallet();
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
        onDepositNext={fundWallet}
      />
    </>
  );
}
```

You can fully control the modal's images, navigation, and step logic from your app. The modal will call `onClose` when the user closes it.
---

### QuickPlayModal

A controlled modal for enabling quickplay setup with a consumer-provided approval flow.

**Features:**
- npm-friendly and app-agnostic (no app-level config dependencies)
- uses your own `onApprove` logic for setup/transactions
- approve button is enabled only when the currently active wallet is Privy
- clear disabled-state guidance for non-Privy active wallets (`Connect Privy Wallet` label + helper text)
- optional `currencyName` display override

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `isVisible` | `boolean` | Controls modal visibility |
| `setIsVisible` | `(isVisible: boolean) => void` | Visibility state setter |
| `formData` | `any` | Data passed into your approve handler |
| `onApprove` | `(formData: any) => Promise<void> \| void` | Called when user clicks APPROVE |
| `currencyName` | `string` | (Optional) Currency label shown in the modal body |

**Usage Example:**
```tsx
import React, { useState } from "react";
import { QuickPlayModal } from "fare-privy-core";

export function QuickPlayModalDemo() {
  const [isVisible, setIsVisible] = useState(false);

  const handleApprove = async (formData: { amount: number; game: string }) => {
    // perform your app-specific quickplay setup/transaction logic
    await Promise.resolve(formData);
  };

  return (
    <>
      <button onClick={() => setIsVisible(true)}>Open QuickPlay Modal</button>
      <QuickPlayModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        formData={{ amount: 10, game: "quickplay" }}
        onApprove={handleApprove}
        currencyName="ETH"
      />
    </>
  );
}
```

`APPROVE` is disabled unless the active wallet is Privy. If not, the button displays `CONNECT PRIVY WALLET` and a helper message explains how to proceed.
---

## 🪝 Hooks Overview

- `useAuthActions()` – Login/logout control
- `useConnectedWallets()` – All wallet info
- `useActiveWallet()` – Get active wallet (respects selected connector preference)
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

## 🗒️ Changelog Format

Use this structure for future release notes:

```md
## 🆕 What's New (vX.Y.Z)

- Added:
  - ...
- Changed:
  - ...
- Fixed:
  - ...
- Notes:
  - Migration steps, breaking changes, or upgrade tips
```

Example:

```md
## 🆕 What's New (v1.9.13)

- Added:
  - QuickPlayModal export for npm consumers
  - SelectWalletModalContent test coverage for shared-state update behavior
- Changed:
  - QuickPlay approve is now gated by active Privy wallet
  - useActiveWallet now respects selected connector preference
  - SelectWalletModal selection now writes to shared switchWalletState
- Fixed:
  - Removed unintended wallet auto-switch side effect during QuickPlay approve
  - SelectWallet selection now updates active wallet outside modal scope
```

---

## 📄 License

ISC License - see LICENSE file for details.

---

## 🤝 Contributing

Pull requests and issues are welcome!
