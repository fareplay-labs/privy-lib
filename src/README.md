# FarePrivy Authentication & Wallet Management System

This folder contains the complete authentication and wallet management system for the Fareplay application, built around Privy Auth with custom casino configurations and Smart Wallet support.

## 📁 Folder Structure

```
farePrivy/
├── components/               # UI components for wallet management
│   ├── SelectWalletModal.tsx
│   └── WalletOverview.tsx
├── config/                  # Configuration files
│   ├── privy.config.ts
│   ├── ConfigBuilder.ts     # ⭐ NEW: Fluent API configuration builder
│   ├── constants.ts         # ⭐ NEW: Central configuration constants
│   ├── ConfigManager.ts     # ⭐ NEW: Runtime configuration management
│   ├── usage-examples.ts    # ⭐ NEW: Configuration usage examples
│   └── vite-auto-import.ts  # Auto-import configuration
├── hooks/                   # Custom hooks for wallet operations
│   ├── index.ts
│   ├── useActiveWallet.ts
│   ├── useAuthWallet.ts
│   ├── useBlockExplorerUrl.ts
│   ├── usePrivyService.ts
│   └── useAdaptiveWallet.ts # ⭐ NEW: Adaptive wallet hooks system
├── lib/                     # Modular libraries
│   └── casino-auth/         # Casino authentication library
│       ├── CasinoAuthProvider.tsx
│       ├── config-factory.ts
│       ├── ExtendedConfigBuilder.ts  # ⭐ NEW: Advanced casino config builder
│       ├── hooks/
│       │   └── useCasinoAuth.ts
│       ├── index.ts
│       ├── types.ts         # ⭐ ENHANCED: Full integration with chains, games, and USDC vault
│       └── utils.ts
├── modals/                  # Modal components
│   ├── FundWalletModal/
│   └── WithdrawPrivyModal/
├── store/                   # State management
│   └── switchWallet.ts
├── styles/                  # Styling and themes
│   └── privy-theme-override.css
├── utility/                 # Utility components
│   └── PrivyQuickplaySmartWalletListener.tsx
├── PrivyProvider.tsx        # Main provider wrapper
├── README.md               # This comprehensive documentation
├── ADAPTABILITY.md         # ⭐ NEW: Detailed adaptability features guide
└── CONFIGURATION_ABSTRACTION.md # ⭐ NEW: Configuration abstraction guide
```

## 🔧 Core Components

### PrivyProvider.tsx
The main provider component that wraps the entire application with Privy authentication capabilities.

```tsx
export const PrivyProvider = ({ children }: { children: React.ReactNode }) => (
  <_PrivyProvider appId={PRIVY_APP_ID} clientId={PRIVY_APP_CLIENT_ID} config={privyConfig}>
    <SmartWalletsProvider config={biconomyPrivyConfig}>{children}</SmartWalletsProvider>
  </_PrivyProvider>
)
```

**Features:**
- Wraps the app with Privy authentication
- Integrates Biconomy Smart Wallet support
- Provides authentication context throughout the app

### Casino Auth Library (`lib/casino-auth/`)

A modular authentication library that allows for different casino configurations. This is the newest addition that enables custom casino setups.

#### Key Files:

**`types.ts`** - Comprehensive type definitions with full integration:
- `CasinoAuthConfig`: Main configuration interface with USDC Vault integration
- `CasinoAppearanceConfig`: Theming and UI configuration
- `CasinoContext`: Runtime context with user, wallet, permissions, and game state
- `CasinoUser`, `CasinoWallet`, `CasinoPermissions`: Enhanced user and wallet state types
- `VaultTrialData`, `VaultConfig`: USDC Vault integration types
- `SponsorshipRule`: Advanced gas sponsorship with VRF cost limits
- `CasinoGameConfig`: Game-specific configuration with trial limits
- `GameTransactionStatus`, `GameAction`: Game state tracking types
- Integration with `AppGameName`, `ChainName`, `CurrencyName` from chains library

**`config-factory.ts`** - Enhanced configuration factory with presets:
- `CASINO_PRESETS`: Pre-configured casino setups with USDC Vault integration
- `CasinoConfigFactory`: Factory class for creating configurations
- Enhanced validation with chain and game compatibility checks
- Support for multiple casino types with vault-specific configurations

**`ExtendedConfigBuilder.ts`** - ⭐ NEW: Advanced casino configuration builder:
- `ExtendedCasinoConfigBuilder`: Fluent API for complex configurations
- `CASINO_PLUGINS`: Plugin system for analytics, compliance, theming
- Environment-specific configurations (dev/staging/production)
- Device-responsive configurations (mobile/tablet/desktop)
- Regional compliance configurations
- Advanced branding and theming options

**`config-factory.ts`** - Configuration factory with presets:
- `CASINO_PRESETS`: Pre-configured casino setups
- `CasinoConfigFactory`: Factory class for creating configurations
- Supports multiple casino types: 'fareplay-main', 'custom-basic', 'custom-premium', etc.

**`CasinoAuthProvider.tsx`** - Main provider for casino-specific auth:
- Configurable authentication provider
- Casino-specific configuration validation
- Context providers for configuration and casino state

**`hooks/useCasinoAuth.ts`** - Enhanced main hook for casino authentication:
- Transforms Privy user data to casino user format with USDC Vault integration
- Manages wallet state and permissions with smart wallet support
- Handles user tiers and gaming permissions with game-specific limits
- Tracks active trials and transaction states
- Integrates with VRF and gas sponsorship systems

**`utils.ts`** - Enhanced utility functions:
- Configuration validation with chain and vault compatibility
- Casino slug generation and validation
- Environment-specific configuration helpers
- USDC Vault integration utilities
- Game state validation and transformation helpers

## 🎯 Key Features

### 1. Multi-Casino Support with USDC Vault Integration
The casino-auth library enables the application to support multiple casino configurations:
- Different branding and themes per casino
- Custom authentication flows with vault-specific configurations
- Configurable game access permissions with trial limits
- Flexible API endpoints per casino
- USDC Vault integration for on-chain game trials
- VRF-based randomness generation
- Gas sponsorship with precise cost calculations

### 2. Enhanced Smart Wallet Integration
- **Biconomy Integration**: Gasless transactions and sponsored operations
- **USDC Vault Support**: Direct integration with FareAA account abstraction
- **Smart Wallet Abstraction**: Abstract away wallet complexity for users
- **Embedded Wallets**: Create wallets for users who don't have one
- **External Wallet Support**: Support for MetaMask, Coinbase, Rainbow, etc.
- **Transaction Tracking**: Track game trials and on-chain transactions
- **Gas Cost Management**: Precise gas sponsorship based on VRF and AA costs

### 3. Comprehensive Authentication with Game State Integration
- **Social Login**: Google, Twitter, Discord integration
- **Email/SMS**: Traditional authentication methods
- **Wallet Connect**: Direct wallet connection
- **Multi-method**: Users can choose their preferred login method
- **Game State Awareness**: Track active games and trial states
- **Transaction Lifecycle**: Full tracking from trial registration to resolution

### 4. Advanced User Management
- **User Tiers**: Free, Premium, VIP user classifications
- **Permissions System**: Role-based access control with vault roles
- **Gaming Statistics**: Track user gaming activity and trial history
- **Profile Management**: User profiles with customizable data
- **Active Trials**: Track ongoing USDC Vault trials
- **Transaction History**: Comprehensive transaction and trial tracking

### 5. Enhanced Wallet Management
- **Multi-wallet Support**: Handle multiple connected wallets
- **Wallet Switching**: Easy switching between wallets
- **Balance Tracking**: Real-time balance updates
- **Transaction History**: Track wallet transactions and game trials
- **Smart Wallet Deployment**: Track smart wallet deployment status
- **Game Transaction Capabilities**: Manage game-specific transaction permissions

### 6. Advanced Adaptability Features ⭐ ENHANCED
- **Configuration Builder**: Fluent API for building custom configurations
- **Extended Config Builder**: Advanced casino-specific configuration builder
- **Environment-Specific Configs**: Different settings for dev/staging/production
- **Device-Responsive**: Adaptive configurations for mobile/tablet/desktop
- **User Tier-Based**: Different features based on user classification
- **Regional Compliance**: Jurisdiction-specific configurations
- **Plugin System**: Extensible architecture for custom functionality
- **Theme System**: Multiple theme configurations with vault-aware styling
- **Preset Configurations**: Pre-built configurations for common use cases
- **Adaptive Wallet Hooks**: Flexible wallet hooks for different use cases
- **Game State Integration**: Full integration with game lifecycle management
- **USDC Vault Integration**: Complete integration with on-chain gaming infrastructure

### 8. Game State & Trial Management ⭐ NEW
- **Trial Lifecycle Tracking**: Track trials from registration to resolution
- **VRF Integration**: Chainlink VRF for provably fair randomness
- **Gas Sponsorship**: Intelligent gas sponsorship based on game type
- **Game State Synchronization**: Real-time game state updates
- **Transaction Monitoring**: Monitor pending and completed game transactions
- **Role-Based Permissions**: Vault-specific permissions for resolvers and admins
- **Centralized Constants**: All configuration values in one place (`constants.ts`)
- **Runtime Configuration Management**: Dynamic configuration with `ConfigManager`
- **Environment-Specific Configs**: Different settings for dev/staging/production
- **User Tier-Based Configs**: Configuration based on user classification (free/premium/vip)
- **Device-Specific Configs**: Adaptive configurations for mobile/tablet/desktop
- **Region-Specific Configs**: Jurisdiction-specific configurations (US/EU/APAC/LATAM)
- **Configuration Overrides**: Runtime overrides without code changes
- **Context-Specific Configs**: Create configurations for specific use cases
- **Type-Safe Configuration**: Full TypeScript support for all configuration options
- **Configuration Examples**: Comprehensive usage examples and documentation
- **Trial Lifecycle Tracking**: Track trials from registration to resolution
- **VRF Integration**: Chainlink VRF for provably fair randomness
- **Gas Sponsorship**: Intelligent gas sponsorship based on game type
- **Game State Synchronization**: Real-time game state updates
- **Transaction Monitoring**: Monitor pending and completed game transactions
- **Role-Based Permissions**: Vault-specific permissions for resolvers and admins

## 🪝 Custom Hooks

### useActiveWallet()
The primary hook for wallet management:
- Returns the currently active wallet
- Handles Smart Wallet vs External Wallet logic
- Provides wallet connection status
- Manages wallet switching
- Tracks smart wallet deployment status

```typescript
const { activeWallet, privyWallet, externalWallet } = useActiveWallet()
```

### useAdaptiveWallet() ⭐ NEW
Advanced wallet hook system for different use cases:
- Configurable wallet preferences and filters
- Auto-connection and validation
- Device-specific wallet optimization
- Gaming-specific wallet configurations

```typescript
const { activeWallet, isConnected, connect, disconnect } = useAdaptiveWallet({
  preferSmartWallet: true,
  autoConnect: true,
  walletFilter: wallet => wallet.connectorType !== 'unknown'
})
```

### Specialized Wallet Hooks ⭐ NEW
- **useGamingWallet()**: Gaming-optimized wallet with smart wallet preference
- **useMobileWallet()**: Mobile-optimized wallet with simplified interface
- **useDesktopWallet()**: Desktop-optimized wallet with advanced features

### useBlockExplorerUrl()
Generates block explorer URLs for transactions and addresses based on the current chain.

### useAuthWallet()
Manages authentication-specific wallet operations.

### usePrivyService()
Provides access to Privy service methods and utilities.

## 🎨 Styling & Theming

### privy-theme-override.css
Custom CSS variables that override Privy's default styling:
- Dark theme configuration
- Custom color palette
- Fareplay branding colors
- Modal and component styling

```css
:root {
  --privy-color-accent: #7d00ff;
  --privy-color-background: #1c1c1e;
  --privy-color-foreground: #fff;
  /* ... more theme variables */
}
```

## 🔄 State Management

### switchWallet.ts
Uses Valtio proxy for wallet switching state:
- `isWalletModalOpen`: Controls wallet selection modal
- `selectedConnectorType`: Tracks selected wallet type

## 🛠️ Configuration

### privy.config.ts
Main configuration file that defines:
- **App Credentials**: Privy App ID and Client ID
- **Login Methods**: Supported authentication methods
- **Wallet List**: Supported wallet providers
- **Appearance**: Theme and branding settings
- **Smart Wallet Config**: Biconomy configuration with USDC Vault integration

### ConfigBuilder.ts ⭐ NEW
Fluent API configuration builder:
- **PrivyConfigBuilder**: Easy configuration creation
- **Preset Configurations**: Pre-built configurations for common use cases
- **Environment-Specific**: Different configurations for different environments
- **Device-Responsive**: Adaptive configurations for different devices
- **Chainable API**: Fluent interface for building complex configurations

### ExtendedConfigBuilder.ts ⭐ NEW
Advanced casino configuration builder:
- **ExtendedCasinoConfigBuilder**: Complex casino configurations
- **Plugin System**: Extensible plugin architecture
- **Compliance Configurations**: Jurisdiction-specific compliance settings
- **Advanced Branding**: Complex branding and theming options
- **Game Integration**: Deep integration with game systems and USDC Vault

## 📱 UI Components

### WalletOverview.tsx
Displays current wallet information:
- Active wallet address
- Wallet type and provider
- Connection status
- Click to switch wallets

### SelectWalletModal.tsx
Modal for wallet selection and switching:
- List of available wallets
- Connection status indicators
- Wallet switching functionality

## 🔗 Integration Points

### Enhanced Smart Wallet Listener ⭐ ENHANCED
`PrivyQuickplaySmartWalletListener.tsx` handles:
- Smart wallet address monitoring
- Contract approvals for gaming
- Biconomy paymaster integration
- Transaction sponsorship rules
- USDC Vault integration
- Game trial monitoring
- VRF callback handling

### Modals
- **FundWalletModal**: Deposit funds into wallet
- **WithdrawPrivyModal**: Withdraw funds from wallet

## 🚀 Usage Examples

### Basic Setup
```tsx
import { PrivyProvider } from '@/components/farePrivy'

function App() {
  return (
    <PrivyProvider>
      <YourApp />
    </PrivyProvider>
  )
}
```

### Advanced Provider Configuration
```tsx
import { PrivyProvider } from '@/components/farePrivy'
import { PRIVY_PRESETS } from '@/components/farePrivy/config/ConfigBuilder'

function App() {
  return (
    <PrivyProvider
      config={PRIVY_PRESETS.gaming().build()}
      theme={{
        accentColor: '#ff6b35',
        logo: '/custom-logo.png',
        darkMode: true,
      }}
      environment="production"
      disableSmartWallet={false}
    >
      <YourApp />
    </PrivyProvider>
  )
}
```

### Using Configuration Builder
```tsx
import { createPrivyConfig } from '@/components/farePrivy/config/ConfigBuilder'

const customConfig = createPrivyConfig()
  .forGaming()
  .withAccentColor('#ff6b35')
  .withLogo('/custom-logo.png')
  .enableEmbeddedWallets()
  .forEnvironment('production')
  .build()

function App() {
  return (
    <PrivyProvider config={customConfig}>
      <YourApp />
    </PrivyProvider>
  )
}
```

### Enhanced Casino Auth with USDC Vault Integration ⭐ ENHANCED
```tsx
import { CasinoAuthProvider } from '@/components/farePrivy/lib/casino-auth'

function CustomCasino() {
  return (
    <CasinoAuthProvider 
      casinoSlug="my-casino" 
      customConfig={{
        appearance: {
          accentColor: '#ff0000',
          logo: '/my-logo.png'
        },
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
          colors: {
            themeColor1: '#ff0000',
            themeColor2: '#darkred'
          }
        }
      }}
    >
      <CasinoApp />
    </CasinoAuthProvider>
  )
}
```

### Using Extended Casino Config Builder
```tsx
import { createCasinoConfigBuilder, CASINO_PLUGINS } from '@/components/farePrivy/lib/casino-auth/ExtendedConfigBuilder'

const casinoConfig = createCasinoConfigBuilder('custom-premium')
  .forEnvironment('production')
  .forDevice('desktop')
  .forRegion('US')
  .withBranding({
    name: 'Elite Casino',
    logo: '/elite-logo.png',
    colors: {
      primary: '#gold',
      accent: '#darkgold'
    }
  })
  .withPlugin(CASINO_PLUGINS.analytics({
    trackingId: 'GA-123456',
    events: ['login', 'deposit', 'withdraw']
  }))
  .build()

function EliteCasino() {
  return (
    <CasinoAuthProvider casinoSlug="elite-casino" customConfig={casinoConfig}>
      <CasinoApp />
    </CasinoAuthProvider>
  )
}
```

### Using Adaptive Wallet Hooks
```tsx
import { useAdaptiveWallet, useGamingWallet, useMobileWallet } from '@/components/farePrivy/hooks/useAdaptiveWallet'

// Basic adaptive wallet
function WalletComponent() {
  const { activeWallet, isConnected, connect, disconnect } = useAdaptiveWallet({
    preferSmartWallet: true,
    autoConnect: true,
    walletFilter: wallet => wallet.connectorType !== 'unknown'
  })
  
  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected: {activeWallet.address}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connect}>Connect</button>
      )}
    </div>
  )
}

// Gaming-specific wallet
function GamingWalletComponent() {
  const { activeWallet, smartWallet, isUsingSmartWallet } = useGamingWallet()
  
  return (
    <div>
      <p>Gaming Wallet: {activeWallet?.address}</p>
      {isUsingSmartWallet && <p>Smart Wallet: {smartWallet?.smartWalletAddress}</p>}
    </div>
  )
}

// Mobile-optimized wallet
function MobileWalletComponent() {
  const { activeWallet, connectionCount } = useMobileWallet()
  
  return (
    <div>
      <p>Mobile Wallet: {activeWallet?.address}</p>
      <p>Connected Wallets: {connectionCount}</p>
    </div>
  )
}
```

### Enhanced Casino Auth Hook Usage ⭐ ENHANCED
```tsx
import { useCasinoContext } from '@/components/farePrivy/lib/casino-auth'

function CasinoGameComponent() {
  const { user, wallet, permissions, gameState } = useCasinoContext()
  
  // Check if user can play a specific game
  const canPlayDice = permissions.gamePermissions?.dice?.canPlay
  const maxDiceMultiplier = permissions.gamePermissions?.dice?.maxTrialMultiplier
  
  // Check vault roles
  const canResolveTrials = permissions.vaultRoles?.hasResolverRole
  
  // Check active game state
  const pendingTrials = gameState?.pendingTransactions || 0
  const canStartNewGame = gameState?.canSubmitNewGame
  
  // Check active trials
  const activeTrials = user?.activeTrials || []
  const diceTrials = activeTrials.filter(trial => trial.gameType === 'dice')
  
  return (
    <div>
      <p>User: {user?.profile.username}</p>
      <p>Wallet: {wallet?.address}</p>
      <p>Smart Wallet: {wallet?.smartWalletAddress}</p>
      <p>Can Play Dice: {canPlayDice ? 'Yes' : 'No'}</p>
      <p>Max Dice Multiplier: {maxDiceMultiplier?.toString()}</p>
      <p>Active Dice Trials: {diceTrials.length}</p>
      <p>Pending Transactions: {pendingTrials}</p>
      <p>Can Start New Game: {canStartNewGame ? 'Yes' : 'No'}</p>
      
      {canResolveTrials && (
        <button>Resolve Trials (Admin)</button>
      )}
    </div>
  )
}
```

## 🔐 Enhanced Security Features

- **Secure Authentication**: Privy-powered authentication with industry standards
- **Wallet Security**: Non-custodial wallet management with smart wallet support
- **Permission System**: Role-based access control with vault-specific roles
- **Transaction Validation**: Smart contract interaction validation with VRF verification
- **Environment Separation**: Different configurations for dev/staging/prod
- **Gas Sponsorship Security**: Controlled gas sponsorship
- **Trial Validation**: On-chain trial validation with randomness verification
- **Role-Based Vault Access**: Resolver and admin roles for USDC Vault operations
- **Multi-Signature Support**: Support for multi-signature wallet operations
- **Compliance Integration**: Automated compliance checking and reporting

## 📊 Casino-Specific Features

### Enhanced Gaming Permissions with USDC Vault Integration ⭐ ENHANCED
- `canPlay`: General gaming access
- `canWithdraw`: Withdrawal permissions
- `canDeposit`: Deposit permissions
- `canAccessCustomGames`: Custom game access
- `canModifySettings`: Account settings modification
- `vaultRoles`: USDC Vault-specific roles (resolver, admin)
- `gamePermissions`: Per-game permissions with trial limits
- `maxTrialMultiplier`: Maximum bet multiplier per game
- `maxConcurrentTrials`: Limit on simultaneous trials

### Enhanced Sponsorship Rules with VRF Integration ⭐ ENHANCED
Smart wallet sponsorship for gasless transactions:
- Game-specific sponsorship rules
- Cooldown periods for sponsored transactions
- Maximum sponsored amounts
- VRF cost limits and callback gas limits
- AA cost multipliers and thresholds
- Chain-specific sponsorship rules

### Enhanced Development Guidelines with USDC Vault Integration

### Adding New Casino Configurations
1. Add preset to `CASINO_PRESETS` in `config-factory.ts`
2. Define casino-specific appearance and features
3. Configure USDC Vault integration settings
4. Create custom validation rules if needed
5. Test with `CasinoAuthProvider`

### Extending Authentication with Game Integration
1. Add new login methods to `privyLoginMethods`
2. Update `CasinoAuthConfig` types if needed
3. Configure appearance settings
4. Add game-specific authentication rules
5. Test authentication flow with game trials

### Custom Wallet Support with Smart Wallet Integration
1. Add wallet to `privyWalletList`
2. Configure wallet-specific settings
3. Add smart wallet deployment logic
4. Update `useActiveWallet` if special handling needed
5. Test wallet connection and switching with game transactions

### USDC Vault Integration ⭐ NEW
1. Configure vault contract addresses in `api.contracts`
2. Set up VRF configuration in `api.vrfConfig`
3. Configure smart wallet with vault settings
4. Set up sponsorship rules for game transactions
5. Test trial registration and resolution flow

### Game State Integration ⭐ NEW
1. Add game types to `AppGameName` enum
2. Configure game-specific permissions
3. Set up trial limits and multipliers
4. Configure VRF parameters for game
5. Test game lifecycle from start to resolution

### Creating Enhanced Casino Configurations with USDC Vault ⭐ ENHANCED
```tsx
// Using Extended Configuration Builder
import { createCasinoConfigBuilder } from '@/components/farePrivy/lib/casino-auth/ExtendedConfigBuilder'

const casinoConfig = createCasinoConfigBuilder('custom-premium')
  .forEnvironment('production')
  .forDevice('desktop')
  .withBranding({
    name: 'Elite Casino',
    logo: '/elite-logo.png',
    colors: { primary: '#gold', accent: '#darkgold' }
  })
  .withVaultIntegration({
    vaultAddress: '0x...',
    fareAAAddress: '0x...',
    usdcAddress: '0x...',
    vrfConfig: {
      keyHash: '0x...',
      subscriptionId: 123n,
      callbackGasLimit: 300000
    }
  })
  .withGameConfig({
    enabled: ['dice', 'coinFlip', 'roulette'],
    trialLimits: {
      maxMultiplier: 1000n,
      maxConcurrentTrials: 5
    }
  })
  .build()
```

### Creating Enhanced Custom Plugins with USDC Vault Support ⭐ ENHANCED
```tsx
import type { CasinoPlugin } from '@/components/farePrivy/lib/casino-auth/ExtendedConfigBuilder'

const gameAnalyticsPlugin: CasinoPlugin = {
  name: 'gameAnalytics',
  version: '1.0.0',
  configure: (config) => ({
    ...config,
    features: {
      ...config.features,
      gameAnalytics: true,
    },
    api: {
      ...config.api,
      gameEndpoints: {
        ...config.api.gameEndpoints,
        analytics: '/api/game-analytics'
      }
    }
  }),
  validate: (config) => {
    if (!config.features.gameAnalytics) return ['Game analytics is required']
    if (!config.api.gameEndpoints?.analytics) return ['Analytics endpoint is required']
    return true
  }
}

const vaultCompliancePlugin: CasinoPlugin = {
  name: 'vaultCompliance',
  version: '1.0.0',
  configure: (config) => ({
    ...config,
    features: {
      ...config.features,
      vaultCompliance: true,
    },
    api: {
      ...config.api,
      contracts: {
        ...config.api.contracts,
        complianceContract: '0x...'
      }
    }
  }),
  validate: (config) => {
    if (!config.api.contracts?.vaultAddress) return ['Vault address is required for compliance']
    return true
  }
}

// Use the plugins
const config = createCasinoConfigBuilder()
  .withPlugin(gameAnalyticsPlugin)
  .withPlugin(vaultCompliancePlugin)
  .build()
```

### Creating Custom Wallet Hook Configurations
```tsx
import { useAdaptiveWallet, type WalletHookConfig } from '@/components/farePrivy/hooks/useAdaptiveWallet'

const myCustomWalletConfig: WalletHookConfig = {
  preferSmartWallet: true,
  autoConnect: false,
  walletFilter: wallet => wallet.connectorType === 'metamask',
  connectionValidator: wallet => wallet.linked && wallet.chainId === 1,
  walletTransform: wallet => ({
    ...wallet,
    customProperty: 'value'
  })
}

function MyComponent() {
  const { activeWallet } = useAdaptiveWallet(myCustomWalletConfig)
  return <div>{activeWallet?.address}</div>
}
```

### Environment-Specific Configurations
```tsx
// Development
const devConfig = createPrivyConfig()
  .forEnvironment('development')
  .withLoginMethods(['email', 'wallet'])
  .build()

// Production
const prodConfig = createPrivyConfig()
  .forEnvironment('production')
  .withLoginMethods(['wallet', 'google', 'twitter'])
  .build()

// Use based on environment
const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig
```

### Device-Responsive Configurations
```tsx
import { useIsBreakpoint } from '@/hooks/common/useIsBreakpoint'

function ResponsiveApp() {
  const isMobile = useIsBreakpoint('xs')
  const isTablet = useIsBreakpoint('md')
  
  const config = createPrivyConfig()
    .forDevice(isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop')
    .build()
  
  return (
    <PrivyProvider config={config}>
      <YourApp />
    </PrivyProvider>
  )
}
```

## 📈 Future Enhancements

The architecture supports future additions:
- **Multiple Casino Instances**: Run multiple casinos simultaneously
- **White-Label Solutions**: Complete casino-as-a-service platform
- **Custom Game Integrations**: Plugin system for custom games
- **Enhanced Analytics**: Advanced tracking and user behavior analysis
- **Mobile Wallet Support**: Native mobile wallet integration
- **Web3 Social Features**: Social login and sharing capabilities
- **AI-Powered Recommendations**: Intelligent game and feature recommendations
- **Multi-Chain Support**: Cross-chain wallet and transaction support
- **Advanced Compliance**: Automated compliance checking and reporting
- **Real-Time Notifications**: WebSocket-based real-time updates
- **Decentralized Identity**: Self-sovereign identity integration
- **Advanced Security**: Multi-factor authentication and fraud detection
- **Internationalization**: Multi-language and multi-currency support
- **Advanced Theming**: Dynamic theme switching and customization
- **Performance Optimization**: Lazy loading and code splitting
- **Accessibility Features**: Enhanced accessibility compliance
- **Testing Framework**: Comprehensive testing utilities
- **Documentation Generator**: Auto-generated API documentation
- **Migration Tools**: Automated configuration migration utilities
- **Advanced VRF Integration**: Multiple VRF providers and fallback mechanisms ⭐ NEW
- **Cross-Chain Gaming**: Multi-chain game trials and settlements ⭐ NEW
- **Advanced Gas Optimization**: ML-based gas price prediction and optimization ⭐ NEW
- **Game State Persistence**: Persistent game state across sessions ⭐ NEW
- **Advanced Trial Analytics**: Deep analytics on game trial performance ⭐ NEW
- **Smart Contract Upgrades**: Seamless smart contract upgrade management ⭐ NEW
- **Advanced Randomness**: Multiple randomness sources and verification ⭐ NEW
- **Liquidity Management**: Advanced liquidity pool management ⭐ NEW
- **Risk Management**: Advanced risk assessment and mitigation ⭐ NEW
- **Regulatory Compliance**: Automated regulatory compliance checking ⭐ NEW

---

This enhanced system provides a robust, scalable foundation for authentication and wallet management in the Fareplay ecosystem, with deep integration with USDC Vault infrastructure, comprehensive game state management, and advanced adaptability features. The system is designed to support complex gaming scenarios with provably fair randomness, gas-optimized transactions, and comprehensive trial lifecycle management.
