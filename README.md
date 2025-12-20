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

```tsx
import { PrivyProvider } from 'fare-privy-core';

function App() {
  return (
    <PrivyProvider appId="your-privy-app-id">
      <YourCasinoApp />
    </PrivyProvider>
  );
}
```

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

### Fund Wallet Modal (New)

```tsx
import { FundWalletModal } from 'fare-privy-lib/modals/FundWalletModal';

function App() {
  return (
    <div>
      <FundWalletModal />
    </div>
  );
}
```

- The modal uses your active wallet and valtio state.
- All icons and most props are now npm-friendly and have sensible defaults.
- Balances are fetched using the `useWalletBalance` hook.

---

### FundWalletModal

A ready-to-use modal for funding your wallet, with animated carousel and exchange/card options.

**Features:**
- Animated card carousel (`CardCarousel`)
- Transfer funds via exchange or card
- Uses `useWalletBalance` for live balances
- Minimal required props, npm-friendly defaults

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

```tsx
import { CasinoAuthProvider } from 'fare-privy-core/lib/casino-auth';

function CustomCasino() {
  return (
    <CasinoAuthProvider
      casinoSlug="my-casino"
      customConfig={{
        appearance: { accentColor: '#ff0000', logo: '/my-logo.png' },
        blockchain: {
          currency: 'USDC',
          primaryChain: 'ARBITRUM',
          smartWallet: {
            provider: 'biconomy',
            vaultConfig: {
              vaultAddress: '0x...',
              fareAAAddress: '0x...',
              usdcAddress: '0x...'
            }
          }
        },
        api: {
          contracts: {
            vaultAddress: '0x...',
            vrfWrapperAddress: '0x...'
          }
        }
      }}
      casinoEntity={{
        id: 'my-casino',
        username: 'mycasino',
        config: {
          title: 'My Custom Casino',
          colors: { themeColor1: '#ff0000', themeColor2: '#darkred' }
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
