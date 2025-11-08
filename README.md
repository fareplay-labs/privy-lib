# @zynkah/privy-lib

A comprehensive React library for Privy authentication and wallet management with casino gaming features. This library provides a complete authentication and wallet management system built around Privy Auth with custom casino configurations and Smart Wallet support.

## 🚀 Features

- **🔐 Authentication**: Complete Privy Auth integration with casino-specific configurations
- **💼 Wallet Management**: Advanced wallet operations with smart wallet support
- **🎮 Casino Integration**: Gaming-specific authentication and wallet features
- **⚡ Smart Wallets**: Built-in support for Biconomy and other smart wallet providers
- **🎨 UI Components**: Pre-built React components for wallet operations
- **🔧 Configuration**: Flexible configuration system with builder patterns
- **📱 Responsive**: Mobile-first design for wallet interactions

## 📦 Installation

```bash
npm install @zynkah/privy-lib
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-dom @privy-io/react-auth styled-components framer-motion valtio
```

## 🔧 Quick Setup

### Basic Setup

```tsx
import React from 'react'
import { PrivyProvider } from '@zynkah/privy-lib'

function App() {
  return (
    <PrivyProvider appId="your-privy-app-id">
      {/* Your app content */}
    </PrivyProvider>
  )
}

export default App
```

### Advanced Configuration

```tsx
import React from 'react'
import { PrivyProvider, ConfigBuilder } from '@zynkah/privy-lib'

const customConfig = new ConfigBuilder()
  .setAppearance({
    theme: 'dark',
    accentColor: '#6366f1'
  })
  .setLoginMethods(['email', 'wallet'])
  .setEmbeddedWallets({ createOnLogin: 'users-without-wallets' })
  .build()

function App() {
  return (
    <PrivyProvider 
      appId="your-privy-app-id"
      config={customConfig}
    >
      {/* Your app content */}
    </PrivyProvider>
  )
}
```

## 🎯 Core Components

### Authentication Provider

```tsx
import { PrivyProvider } from '@zynkah/privy-lib'

<PrivyProvider
  appId="your-app-id"
  clientId="your-client-id" // optional
  config={customConfig} // optional
  smartWalletConfig={smartWalletConfig} // optional
  disableSmartWallets={false} // optional
>
  <YourApp />
</PrivyProvider>
```

### Casino Auth Provider

```tsx
import { CasinoAuthProvider, useCasinoAuth } from '@zynkah/privy-lib'

function CasinoApp() {
  return (
    <CasinoAuthProvider config={casinoConfig}>
      <GameInterface />
    </CasinoAuthProvider>
  )
}

function GameInterface() {
  const { user, login, logout } = useCasinoAuth()
  
  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login to Play</button>
      )}
    </div>
  )
}
```

## 🪝 Hooks

### useActiveWallet

```tsx
import { useActiveWallet } from '@zynkah/privy-lib'

function WalletInfo() {
  const { wallet, address, chainId, switchWallet } = useActiveWallet()
  
  return (
    <div>
      <p>Address: {address}</p>
      <p>Chain: {chainId}</p>
      <button onClick={() => switchWallet()}>Switch Wallet</button>
    </div>
  )
}
```

## 🎨 UI Components

### WalletOverview

```tsx
import { WalletOverview } from '@zynkah/privy-lib'

function Dashboard() {
  return (
    <div>
      <h1>My Dashboard</h1>
      <WalletOverview />
    </div>
  )
}
```

## ⚙️ Configuration

### ConfigBuilder

```tsx
import { ConfigBuilder } from '@zynkah/privy-lib'

const config = new ConfigBuilder()
  .setAppearance({
    theme: 'dark',
    accentColor: '#6366f1',
    logo: 'https://your-logo-url.com/logo.png'
  })
  .setLoginMethods(['email', 'google', 'wallet'])
  .setEmbeddedWallets({
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: true
  })
  .setLegalAcceptanceRequired(true)
  .build()
```

## 📚 API Reference

```tsx
// Main exports
export {
  PrivyProvider,
  CasinoAuthProvider,
  ConfigBuilder,
  ConfigManager
} from '@zynkah/privy-lib'

// Hooks
export {
  useActiveWallet,
  useAdaptiveWallet,
  useAuthWallet,
  useBlockExplorerUrl,
  useIsUserAuthenticated,
  usePrivyService,
  useCasinoAuth
} from '@zynkah/privy-lib'

// Components
export {
  SelectWalletModal,
  WalletOverview,
  FundWalletModal,
  WithdrawPrivyModal
} from '@zynkah/privy-lib'
```

## 🔨 Development

### Building the Library

```bash
# Build for production
npm run build

# Build and watch for changes
npm run dev

# Type checking
npm run type-check

# Clean build artifacts
npm run clean
```

### Project Structure

```
@zynkah/privy-lib/
├── farePrivy/               # Main library code
│   ├── components/          # React components
│   ├── hooks/              # Custom hooks
│   ├── config/             # Configuration system
│   ├── modals/             # Modal components
│   ├── lib/                # Core libraries
│   └── utility/            # Utility components
├── dist/                   # Built output
└── index.ts               # Main entry point
```

## 📝 License

ISC License - see [LICENSE](./LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- 📧 Email: [Create an issue](https://github.com/Zynkah/privy-lib/issues)
- 📖 Documentation: [GitHub README](https://github.com/Zynkah/privy-lib#readme)
- 🐛 Bug Reports: [GitHub Issues](https://github.com/Zynkah/privy-lib/issues)

## 🏆 Acknowledgments

- Built with [Privy](https://privy.io/) authentication
- Powered by [React](https://reactjs.org/)
- Styled with [styled-components](https://styled-components.com/)
- Animated with [Framer Motion](https://framer.com/motion/)