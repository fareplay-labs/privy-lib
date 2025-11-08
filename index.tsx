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

Get the currently active wallet with enhanced functionality:

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

### useAdaptiveWallet

Adaptive wallet management for different platforms:

```tsx
import { useAdaptiveWallet } from '@zynkah/privy-lib'

function AdaptiveWalletComponent() {
  const { 
    connectWallet, 
    isMobile, 
    isEmbedded, 
    preferredWalletType 
  } = useAdaptiveWallet()
  
  return (
    <button onClick={connectWallet}>
      Connect {preferredWalletType} Wallet
    </button>
  )
}
```

### useAuthWallet

Authentication-specific wallet operations:

```tsx
import { useAuthWallet } from '@zynkah/privy-lib'

function AuthComponent() {
  const { 
    login, 
    logout, 
    isAuthenticated, 
    user 
  } = useAuthWallet()
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  )
}
```

## 🎨 UI Components

### WalletOverview

Display wallet information and balances:

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

### SelectWalletModal

Modal for wallet selection:

```tsx
import { SelectWalletModal } from '@zynkah/privy-lib'

function App() {
  const [showWalletModal, setShowWalletModal] = useState(false)
  
  return (
    <div>
      <button onClick={() => setShowWalletModal(true)}>
        Select Wallet
      </button>
      {showWalletModal && <SelectWalletModal />}
    </div>
  )
}
```

### Fund & Withdraw Modals

```tsx
import { FundWalletModal, WithdrawPrivyModal } from '@zynkah/privy-lib'

function WalletActions() {
  const [showFund, setShowFund] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)
  
  return (
    <div>
      <button onClick={() => setShowFund(true)}>Fund Wallet</button>
      <button onClick={() => setShowWithdraw(true)}>Withdraw</button>
      
      {showFund && <FundWalletModal />}
      {showWithdraw && <WithdrawPrivyModal />}
    </div>
  )
}
```

## ⚙️ Configuration

### ConfigBuilder

Build custom Privy configurations:

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

### ConfigManager

Manage configurations at runtime:

```tsx
import { ConfigManager } from '@zynkah/privy-lib'

// Get current config
const currentConfig = ConfigManager.getConfig()

// Update config
ConfigManager.updateConfig({
  appearance: { theme: 'light' }
})

// Reset to defaults
ConfigManager.resetConfig()
```

## 🎮 Casino Features

### Casino Authentication

```tsx
import { 
  CasinoAuthProvider, 
  useCasinoAuth,
  type CasinoAuthConfig 
} from '@zynkah/privy-lib'

const casinoConfig: CasinoAuthConfig = {
  gameId: 'your-game-id',
  casino: {
    name: 'Your Casino',
    theme: 'neon'
  },
  wallet: {
    requireSmartWallet: true,
    sponsoredTransactions: true
  }
}

function CasinoApp() {
  return (
    <CasinoAuthProvider config={casinoConfig}>
      <GameLobby />
    </CasinoAuthProvider>
  )
}
```

## 📚 API Reference

### Types

```tsx
// Re-exported from @privy-io/react-auth
export type {
  PrivyClientConfig,
  User,
  ConnectedWallet,
  SmartWallet,
  EmbeddedWallet,
} from '@privy-io/react-auth'

// Library-specific types
export type {
  PrivyProviderProps,
  CasinoAuthConfig,
  CasinoUser,
  // ... other types
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