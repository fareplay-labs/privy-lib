# fare-privy-core

A React library for Privy authentication and wallet management.

## 🚀 Current Features (v1.1.0)

- **🔐 Authentication**: Privy Auth integration  
- **💼 Wallet Management**: Wallet switching state management
- **⚡ TypeScript**: Full TypeScript support
- **🧪 Tested**: Complete test suite

## 📦 Installation

```bash
npm install fare-privy-core
# or
pnpm add fare-privy-core
```

## 💻 Quick Start

```tsx
import { PrivyProvider } from 'fare-privy-core';

function App() {
  return (
    <PrivyProvider appId="your-privy-app-id">
      <YourApp />
    </PrivyProvider>
  );
}
```

## 📚 API Reference

### PrivyProvider

Main authentication provider component.

**Props:**
- `appId` (string): Your Privy application ID
- `config` (optional): Custom Privy configuration
- `children` (ReactNode): Child components

### Wallet State Management

```tsx
import { switchWalletState } from '@fare-privy/core';
// Access wallet switching state
```

## 🔄 Roadmap

- v1.2.0: Configuration utilities
- v1.3.0: Hook exports  
- v1.4.0: UI components
- v2.0.0: Full feature set

## 📄 License

ISC License - see LICENSE file for details.