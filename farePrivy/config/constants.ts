/**
 * FarePrivy Configuration Constants
 * Central location for all configurable values used throughout the farePrivy system
 */

// =============================================================================
// API URLs
// =============================================================================

export const API_URLS = {
  // Production API URLs
  PRODUCTION: {
    BASE_URL: 'https://api.fareplay.io',
    STAGING_API: 'https://staging-api.fareplay.io',
  },
  // Development API URLs
  DEVELOPMENT: {
    BASE_URL: 'http://localhost:3000',
    ALTERNATIVE_PORT: 'http://localhost:3200',
  },
  // WebSocket URLs
  WEBSOCKET: {
    PRODUCTION: 'wss://ws.fareplay.io',
    STAGING: 'wss://staging-ws.fareplay.io',
    DEVELOPMENT: 'ws://localhost:3001',
  },
} as const

// =============================================================================
// COLOR CONSTANTS
// =============================================================================

export const COLORS = {
  // Primary brand colors
  PRIMARY: {
    PURPLE: '#7d00ff',
    BLUE: '#007bff',
    DARK_PURPLE: '#6400cc',
    GOLD: '#ffd700',
    DARK_GOLD: '#b8860b',
  },
  // Secondary colors
  SECONDARY: {
    DARK_GRAY: '#2c2c2e',
    BACKGROUND: '#1c1c1e',
    FOREGROUND: '#ffffff',
    MUTED: '#aaa',
    BORDER: '#333',
    SHADOW: '#232323',
  },
  // UI State colors
  STATES: {
    SUCCESS: '#28a745',
    ERROR: '#dc3545',
    WARNING: '#ffc107',
    INFO: '#17a2b8',
  },
  // Transparency variants
  ALPHA: {
    PURPLE_22: '#7d00ff22',
    PURPLE_33: '#7d00ff33',
    PURPLE_50: '#7d00ff50',
    BORDER_10: '#6400cc10',
  },
} as const

// =============================================================================
// CASINO CONFIGURATION
// =============================================================================

export const CASINO_DEFAULTS = {
  // Default casino slugs
  SLUGS: {
    MAIN: 'fareplay',
    CUSTOM_BASIC: 'custom-basic',
    CUSTOM_PREMIUM: 'custom-premium',
    ENTERPRISE: 'enterprise',
    DEMO: 'demo',
  },
  // Default environments
  ENVIRONMENTS: {
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    PRODUCTION: 'production',
  },
  // Default devices
  DEVICES: {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop',
  },
  // Default regions
  REGIONS: {
    US: 'US',
    EU: 'EU',
    APAC: 'APAC',
    LATAM: 'LATAM',
  },
} as const

// =============================================================================
// WALLET CONFIGURATION
// =============================================================================

export const WALLET_DEFAULTS = {
  // Default wallet types
  TYPES: {
    METAMASK: 'metamask',
    COINBASE: 'coinbase_wallet',
    RAINBOW: 'rainbow',
    WALLET_CONNECT: 'wallet_connect',
    SAFE: 'safe',
    ZERION: 'zerion',
    EMBEDDED: 'embedded',
    DETECTED: 'detected_wallets',
  },
  // Connection timeouts (in milliseconds)
  TIMEOUTS: {
    CONNECTION: 30000,
    TRANSACTION: 60000,
    APPROVAL: 45000,
  },
  // Gas limits
  GAS_LIMITS: {
    STANDARD: 21000,
    CONTRACT_INTERACTION: 100000,
    VRF_CALLBACK: 300000,
    SMART_WALLET_DEPLOYMENT: 500000,
  },
} as const

// =============================================================================
// AUTHENTICATION CONFIGURATION
// =============================================================================

export const AUTH_DEFAULTS = {
  // Login method priorities - Using ALL methods for all devices
  LOGIN_METHODS: {
    MOBILE: ['email', 'sms', 'google', 'twitter', 'discord', 'wallet'],
    TABLET: ['email', 'sms', 'google', 'twitter', 'discord', 'wallet'],
    DESKTOP: ['email', 'sms', 'google', 'twitter', 'discord', 'wallet'],
    ALL: ['email', 'sms', 'google', 'twitter', 'discord', 'wallet'],
  },
  // Session timeouts (in milliseconds)
  TIMEOUTS: {
    SESSION: 24 * 60 * 60 * 1000, // 24 hours
    IDLE: 30 * 60 * 1000, // 30 minutes
    REFRESH: 60 * 60 * 1000, // 1 hour
  },
  // Validation rules
  VALIDATION: {
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_PATTERN: /^\+?[1-9]\d{1,14}$/,
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 20,
  },
} as const

// =============================================================================
// GAME CONFIGURATION
// =============================================================================

export const GAME_DEFAULTS = {
  // Game types
  TYPES: {
    SLOTS: 'slots',
    ROULETTE: 'roulette',
    DICE: 'dice',
    COIN_FLIP: 'coinFlip',
  },
  // VRF Configuration
  VRF: {
    DEFAULT_CALLBACK_GAS_LIMIT: 300000,
    DEFAULT_CONFIRMATIONS: 3,
    MAX_CALLBACK_GAS_LIMIT: 1000000,
    MIN_CALLBACK_GAS_LIMIT: 100000,
  },
} as const

// =============================================================================
// SMART WALLET CONFIGURATION
// =============================================================================

export const SMART_WALLET_DEFAULTS = {
  // Biconomy configuration
  BICONOMY: {
    PAYMASTER_CONTEXT: {
      MODE: 'ERC20',
      CALCULATE_GAS_LIMITS: true,
      EXPIRY_DURATION: 300,
      SMART_ACCOUNT_INFO: {
        NAME: 'BICONOMY',
        VERSION: '2.0.0',
      },
    },
    // Sponsorship limits
    SPONSORSHIP: {
      MAX_DAILY_AMOUNT: 1000, // USDC
      MAX_TRANSACTION_AMOUNT: 100, // USDC
      COOLDOWN_PERIOD: 60000, // 1 minute
    },
  },
  // Safe configuration
  SAFE: {
    THRESHOLD: 1,
    SALT_NONCE: 0,
  },
} as const

// =============================================================================
// UI CONFIGURATION
// =============================================================================

export const UI_DEFAULTS = {
  // Modal dimensions
  MODAL: {
    MAX_WIDTH: 480,
    MAX_HEIGHT: 600,
    PADDING: 24,
    BORDER_RADIUS: 16,
  },
  // Animation timings (in milliseconds)
  ANIMATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  // Z-index values
  Z_INDEX: {
    MODAL: 1000,
    DROPDOWN: 100,
    TOOLTIP: 200,
    NOTIFICATION: 1100,
  },
  // Breakpoints (in pixels)
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200,
  },
} as const

// =============================================================================
// THEME CONFIGURATION
// =============================================================================

export const THEME_DEFAULTS = {
  // Theme variants
  VARIANTS: {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto',
  },
  // Font configuration
  FONTS: {
    PRIMARY: 'Gohu, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    SECONDARY: 'PixeBoy, "Cascadia Code", "Roboto Mono", monospace',
    SIZES: {
      XS: '0.75rem',
      SM: '0.875rem',
      MD: '1rem',
      LG: '1.125rem',
      XL: '1.25rem',
      XXL: '1.5rem',
    },
  },
  // Spacing values
  SPACING: {
    XS: '0.25rem',
    SM: '0.5rem',
    MD: '1rem',
    LG: '1.5rem',
    XL: '2rem',
    XXL: '3rem',
  },
} as const

// =============================================================================
// PLUGIN CONFIGURATION
// =============================================================================

export const PLUGIN_DEFAULTS = {
  // Plugin versions
  VERSIONS: {
    ANALYTICS: '1.0.0',
    COMPLIANCE: '1.0.0',
    CUSTOM_GAMES: '1.0.0',
    VAULT_COMPLIANCE: '1.0.0',
    GAME_ANALYTICS: '1.0.0',
  },
  // Analytics configuration
  ANALYTICS: {
    DEFAULT_EVENTS: ['login', 'logout', 'deposit', 'withdraw', 'game_start', 'game_end'],
    BATCH_SIZE: 10,
    FLUSH_INTERVAL: 30000, // 30 seconds
  },
} as const

// =============================================================================
// VALIDATION CONFIGURATION
// =============================================================================

export const VALIDATION_DEFAULTS = {
  // Address validation
  ADDRESS: {
    ETHEREUM_PATTERN: /^0x[a-fA-F0-9]{40}$/,
    MIN_LENGTH: 42,
    MAX_LENGTH: 42,
  },
  // Transaction validation
  TRANSACTION: {
    MIN_GAS_PRICE: 1000000000, // 1 gwei
    MAX_GAS_PRICE: 100000000000, // 100 gwei
    MIN_GAS_LIMIT: 21000,
    MAX_GAS_LIMIT: 10000000,
  },
  // Amount validation
  AMOUNT: {
    MIN_DEPOSIT: 0.01,
    MAX_DEPOSIT: 10000,
    MIN_WITHDRAWAL: 0.01,
    MAX_WITHDRAWAL: 10000,
    DECIMAL_PLACES: 18,
  },
} as const

// =============================================================================
// ERROR MESSAGES
// =============================================================================

export const ERROR_MESSAGES = {
  // Authentication errors
  AUTH: {
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    WALLET_NOT_CONNECTED: 'Please connect your wallet',
    INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction',
    TRANSACTION_FAILED: 'Transaction failed. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
  },
  // Validation errors
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_ADDRESS: 'Invalid Ethereum address',
    AMOUNT_TOO_LOW: 'Amount is below minimum',
    AMOUNT_TOO_HIGH: 'Amount exceeds maximum',
    INVALID_AMOUNT: 'Please enter a valid amount',
  },
  // Casino errors
  CASINO: {
    CONFIG_INVALID: 'Invalid casino configuration',
    PLUGIN_FAILED: 'Plugin validation failed',
    GAME_NOT_AVAILABLE: 'Game is not available',
    TRIAL_LIMIT_EXCEEDED: 'Trial limit exceeded',
  },
} as const

// =============================================================================
// SUCCESS MESSAGES
// =============================================================================

export const SUCCESS_MESSAGES = {
  // Transaction messages
  TRANSACTION: {
    DEPOSIT_SUCCESS: 'Deposit completed successfully',
    WITHDRAWAL_SUCCESS: 'Withdrawal completed successfully',
    APPROVAL_SUCCESS: 'Token approval completed',
    TRANSACTION_PENDING: 'Transaction is pending confirmation',
  },
  // Authentication messages
  AUTH: {
    LOGIN_SUCCESS: 'Successfully logged in',
    LOGOUT_SUCCESS: 'Successfully logged out',
    WALLET_CONNECTED: 'Wallet connected successfully',
    WALLET_DISCONNECTED: 'Wallet disconnected',
  },
  // Game messages
  GAME: {
    TRIAL_STARTED: 'Game trial started',
    TRIAL_COMPLETED: 'Game trial completed',
    REWARD_CLAIMED: 'Reward claimed successfully',
  },
} as const

// =============================================================================
// ENVIRONMENT HELPERS
// =============================================================================

export const getEnvironmentConfig = (env = 'production') => {
  const configs = {
    development: {
      apiUrl: API_URLS.DEVELOPMENT.BASE_URL,
      wsUrl: API_URLS.WEBSOCKET.DEVELOPMENT,
      debug: true,
      analytics: false,
    },
    staging: {
      apiUrl: API_URLS.PRODUCTION.STAGING_API,
      wsUrl: API_URLS.WEBSOCKET.STAGING,
      debug: false,
      analytics: true,
    },
    production: {
      apiUrl: API_URLS.PRODUCTION.BASE_URL,
      wsUrl: API_URLS.WEBSOCKET.PRODUCTION,
      debug: false,
      analytics: true,
    },
  }

  return configs[env as keyof typeof configs] || configs.production
}

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Environment = keyof typeof CASINO_DEFAULTS.ENVIRONMENTS
export type Device = keyof typeof CASINO_DEFAULTS.DEVICES
export type Region = keyof typeof CASINO_DEFAULTS.REGIONS
export type WalletType = keyof typeof WALLET_DEFAULTS.TYPES
export type GameType = keyof typeof GAME_DEFAULTS.TYPES
export type ThemeVariant = keyof typeof THEME_DEFAULTS.VARIANTS
