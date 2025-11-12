/**
 * Casino Auth Library Types
 * Defines configuration interfaces for different casino authentication setups
 */

import type { PrivyClientConfig, WalletListEntry } from '@privy-io/react-auth'
import type { Chain } from 'viem'
import type {
  SupportedAppChainId,
  ChainName,
  CurrencyName,
  AppGameName,
  AppChainConfig,
  AppBiconomyConfig,
} from "../chains/types"

// Game state types for transaction tracking
export type GameTransactionStatus = 'pending' | 'confirmed' | 'failed'
export type GameAction = 'IDLE' | 'START' | 'RESOLVE' | 'ERROR' | 'RESET'

// Forward declaration for CasinoEntity (from custom casino types)
export interface CasinoEntityRef {
  id: string
  username: string
  config: {
    title: string
    colors?: {
      themeColor1?: string
      themeColor2?: string
    }
  }
}

// Base casino configuration interface
export interface CasinoAuthConfig {
  id: string
  name: string
  slug: string
  environment: 'production' | 'staging' | 'development'

  // Privy configuration
  privy: {
    appId: string
    clientId?: string
    loginMethods: PrivyClientConfig['loginMethods']
    walletList: WalletListEntry[]
    appearance: CasinoAppearanceConfig
    embeddedWallets: PrivyClientConfig['embeddedWallets']
    externalWallets?: PrivyClientConfig['externalWallets']
  }

  // Blockchain configuration
  blockchain: {
    defaultChain: Chain
    supportedChains: Chain[]
    supportedChainIds: SupportedAppChainId[]
    primaryChain: ChainName
    currency: CurrencyName
    smartWallet?: SmartWalletConfig
    appChainConfig?: AppChainConfig
  }

  // API endpoints
  api: {
    baseUrl: string
    authEndpoint?: string
    gameEndpoints?: Record<string, string>
    // USDC Vault contract integration
    contracts?: {
      vaultAddress: string
      usdcAddress: string
      fareAAAddress: string
      vrfWrapperAddress: string
      vrfCoordinatorAddress: string
    }
    // VRF configuration
    vrfConfig?: {
      keyHash: string
      subscriptionId: bigint
      minimumRequestConfirmations: number
      callbackGasLimit: number
      useNativePayment: boolean
    }
  }

  // Feature flags
  features: {
    socialLogin: boolean
    embeddedWallets: boolean
    smartWallets: boolean
    customGames: boolean
    analytics: boolean
  }

  // Optional casino-specific metadata
  metadata?: CasinoMetadata
}

// Appearance configuration for casino theming
export interface CasinoAppearanceConfig {
  theme: 'light' | 'dark' | 'custom'
  accentColor: string
  backgroundColor?: string
  textColor?: string
  logo: string
  favicon?: string
  walletChainType?: 'ethereum-only' | 'solana-only' | 'all-chains'
  showWalletLoginFirst?: boolean
  customCSS?: string
}

// Smart wallet configuration
export interface SmartWalletConfig {
  provider: 'biconomy' | 'safe' | 'custom'
  config: Record<string, any>
  biconomyConfig?: AppBiconomyConfig
  // USDC Vault integration
  vaultConfig?: {
    fareAAAddress: string
    usdcAddress: string
    vaultAddress: string
    aaCostMultiplier: number
    evThreshold: bigint
  }
  paymasterOptions?: {
    mode: 'sponsored' | 'erc20' | 'manual'
    sponsorshipRules?: SponsorshipRule[]
  }
}

// Sponsorship rules for gas-less transactions
export interface SponsorshipRule {
  gameType?: AppGameName
  maxAmount?: number
  cooldownPeriod?: number
  chainId?: SupportedAppChainId
  currency?: CurrencyName
  // USDC Vault gas cost integration
  gasLimits?: {
    maxVrfCost: bigint
    maxAACost: bigint
    maxTotalCost: bigint
  }
  // VRF-specific limits
  vrfLimits?: {
    maxCallbackGas: number
    maxRequestConfirmations: number
  }
}

// Casino metadata for branding and configuration
export interface CasinoMetadata {
  description?: string
  website?: string
  social?: {
    twitter?: string
    discord?: string
    telegram?: string
  }
  legal?: {
    termsOfService?: string
    privacyPolicy?: string
    jurisdiction?: string
  }
  games?: {
    enabled: AppGameName[]
    disabled: AppGameName[]
    customConfigs?: Record<AppGameName, any>
  }
  chains?: {
    primary: ChainName
    supported: ChainName[]
  }
}

// Configuration presets for common casino types
export type CasinoPreset =
  | 'fareplay-main'
  | 'custom-basic'
  | 'custom-premium'
  | 'enterprise'
  | 'demo'

// Runtime casino context
export interface CasinoContext {
  config: CasinoAuthConfig
  isCustomCasino: boolean
  user: CasinoUser | null
  wallet: CasinoWallet | null
  permissions: CasinoPermissions
  // Game state integration
  gameState?: {
    activeGames: Record<AppGameName, GameAction>
    pendingTransactions: number
    canSubmitNewGame: boolean
  }
}

// User data in casino context
export interface CasinoUser {
  id: string
  address: string
  privyUserId: string
  profile: {
    username?: string
    email?: string
    avatar?: string
  }
  stats: {
    gamesPlayed: number
    totalWagered: number
    totalWon: number
    joinedAt: Date
  }
  // Game transaction tracking
  activeTransactions?: {
    txHash: string
    gameType: AppGameName
    amount: number
    status: 'pending' | 'confirmed' | 'failed'
    timestamp: Date
  }[]
  // USDC Vault trial tracking
  activeTrials?: {
    trialId: bigint
    gameType: AppGameName
    multiplier: bigint
    submittedAt: Date
    resolvedAt?: Date
    result?: {
      resultIndex: bigint
      randomness: bigint
      payout: bigint
    }
  }[]
}

// Wallet state in casino context
export interface CasinoWallet {
  address: string
  chainId: number
  type: 'embedded' | 'external' | 'smart'
  provider: string
  isConnected: boolean
  balance?: bigint
  // Smart wallet specific fields
  smartWalletAddress?: string
  isSmartWalletDeployed?: boolean
  // Game transaction capabilities
  canSubmitGameTransactions: boolean
  pendingGameTransactions?: {
    txHash: string
    gameType: AppGameName
    amount: number
    timestamp: Date
  }[]
}

// Permission system for casino features
export interface CasinoPermissions {
  canPlay: boolean
  canWithdraw: boolean
  canDeposit: boolean
  canAccessCustomGames: boolean
  canModifySettings: boolean
  maxBetAmount?: number
  dailyWithdrawLimit?: number
  // USDC Vault role-based permissions
  vaultRoles?: {
    hasResolverRole: boolean
    hasAdminRole: boolean
    canExtraordinaryResolve: boolean
    canUpdateConfig: boolean
  }
  // Game-specific permissions
  gamePermissions?: {
    [K in AppGameName]?: {
      canPlay: boolean
      maxEntryAmount: number
      maxEntryCount: number
      canUseStopLoss: boolean
      canUseStopGain: boolean
      sponsoredGasLimit?: number
      // Trial-specific limits
      maxTrialMultiplier?: bigint
      maxConcurrentTrials?: number
    }
  }
}

// Bridge interface that connects auth config with casino entity
export interface CasinoAuthBridge {
  /** Authentication configuration for this casino */
  authConfig: CasinoAuthConfig
  /** Optional reference to the full casino entity */
  casinoEntity?: CasinoEntityRef
  /** Whether this is a custom user-created casino */
  isCustomCasino?: boolean
}

// Game-specific configuration for casino
export interface CasinoGameConfig {
  gameType: AppGameName
  enabled: boolean
  customSettings?: Record<string, any>
  sponsorshipRules?: SponsorshipRule[]
  maxBet?: number
  minBet?: number
  supportedCurrencies?: CurrencyName[]
  // Game state configuration
  gameStateConfig?: {
    allowStopLoss: boolean
    allowStopGain: boolean
    maxEntryCount: number
    minEntryAmount: number
    maxEntryAmount: number
    autoResolveTimeout?: number
  }
}

// USDC Vault integration types
export interface VaultTrialData {
  trialId: bigint
  who: string
  submitter: string
  multiplier: bigint
  q: bigint[]
  k: bigint[]
  vrfCostInUsdc: bigint
  aaCostInUsdc: bigint
  timestamp: bigint
  evThreshold: bigint
}

export interface VaultConfig {
  ownerAddress: string
  usdcAddress: string
  fareAAAddress: string
  evThreshold: bigint
  rngTimeout: bigint
  feeRecipientAddress: string
  ethUsdcPrice: bigint
  averageCallbackGas: number
  aaCostMultiplier: number
  vrfWrapperAddress: string
}
