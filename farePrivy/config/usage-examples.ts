/**
 * FarePrivy Configuration Usage Examples
 * Demonstrates how to use the abstracted configuration system
 */

import {
  configManager,
  createConfig,
  applyConfigOverrides,
  setEnvironment,
  setDevice,
  type ConfigOverrides,
} from './ConfigManager'

// =============================================================================
// BASIC USAGE EXAMPLES
// =============================================================================

/**
 * Example 1: Basic configuration usage
 */
export function basicConfigExample() {
  // Set environment
  setEnvironment('PRODUCTION')

  // Set device
  setDevice('MOBILE')

  // Get configuration
  const config = configManager.getConfig()

  console.log('API URL:', config.api.baseUrl)
  console.log('Primary Color:', config.colors.primary)
  console.log('Auth Methods:', config.auth.methods)
  console.log('Game Limits:', config.games.trialLimits)

  return config
}

/**
 * Example 2: Configuration with overrides
 */
export function configWithOverridesExample() {
  const overrides: ConfigOverrides = {
    colors: {
      primary: '#ff6b35',
      accent: '#e74c3c',
    },
    games: {
      trialLimits: {
        maxMultiplier: 500,
        maxConcurrent: 3,
      },
    },
    features: {
      betaFeatures: true,
      advancedAnalytics: false,
    },
  }

  // Apply overrides
  applyConfigOverrides(overrides)

  // Get configuration with overrides
  const config = configManager.getConfig()

  console.log('Primary Color (overridden):', config.colors.primary)
  console.log('Max Multiplier (overridden):', config.games.trialLimits.maxMultiplier)

  return config
}

/**
 * Example 3: Context-specific configuration
 */
export function contextSpecificConfigExample() {
  // Create configuration for mobile premium user in development
  const mobileConfig = createConfig({
    environment: 'DEVELOPMENT',
    device: 'MOBILE',
    region: 'US',
    overrides: {
      colors: {
        primary: '#007bff',
      },
      auth: {
        methods: ['email', 'sms'],
      },
    },
  })

  // Create configuration for desktop VIP user in production
  const desktopConfig = createConfig({
    environment: 'PRODUCTION',
    device: 'DESKTOP',
    region: 'EU',
    overrides: {
      games: {
        trialLimits: {
          maxMultiplier: 1000,
          maxConcurrent: 5,
        },
      },
    },
  })

  console.log('Mobile config:', mobileConfig)
  console.log('Desktop config:', desktopConfig)

  return { mobileConfig, desktopConfig }
}

// =============================================================================
// ADVANCED USAGE EXAMPLES
// =============================================================================

/**
 * Example 4: Casino-specific configuration
 */
export function casinoSpecificConfigExample() {
  // Configuration for a premium casino
  const premiumCasinoConfig = createConfig({
    environment: 'PRODUCTION',
    device: 'DESKTOP',
    overrides: {
      colors: {
        primary: '#ffd700', // Gold
        secondary: '#1a1a1a', // Dark
        accent: '#ff6b35', // Orange
      },
      games: {
        enabled: ['DICE', 'ROULETTE'],
        trialLimits: {
          maxMultiplier: 1000,
          maxConcurrent: 10,
          dailyLimit: 100,
        },
      },
      smartWallet: {
        enabled: true,
        sponsorship: {
          enabled: true,
          maxDaily: 5000,
          maxPerTransaction: 500,
        },
      },
      features: {
        analytics: true,
        vipFeatures: true,
        customGames: true,
      },
    },
  })

  return premiumCasinoConfig
}

/**
 * Example 5: Environment-specific configuration
 */
export function environmentSpecificConfigExample() {
  // Development configuration
  const devConfig = createConfig({
    environment: 'DEVELOPMENT',
    overrides: {
      api: {
        baseUrl: 'http://localhost:3000',
        timeout: 10000,
      },
      features: {
        debug: true,
        analytics: false,
        testMode: true,
      },
    },
  })

  // Production configuration
  const prodConfig = createConfig({
    environment: 'PRODUCTION',
    overrides: {
      api: {
        baseUrl: 'https://api.fareplay.io',
        timeout: 30000,
      },
      features: {
        debug: false,
        analytics: true,
        testMode: false,
      },
    },
  })

  return { devConfig, prodConfig }
}

// =============================================================================
// INTEGRATION EXAMPLES
// =============================================================================

/**
 * Example 7: Integration with React components
 */
export function useConfigInReactExample() {
  // This would typically be in a React component
  const config = configManager.getConfig()

  // Use configuration in component styling
  const styles = {
    primaryButton: {
      backgroundColor: config.colors.primary,
      color: config.colors.text,
    },
    container: {
      backgroundColor: config.colors.background,
    },
  }

  // Use configuration for feature flags
  const features = {
    showAnalytics: config.features.analytics,
    showDebugPanel: config.features.debug,
    enableCustomGames: 'customGames' in config.features ? config.features.customGames : false,
  }

  return { styles, features, config }
}

/**
 * Example 8: Configuration for different regions
 */
export function regionSpecificConfigExample() {
  // US configuration
  const usConfig = createConfig({
    region: 'US',
    overrides: {
      colors: {
        primary: '#007bff', // Blue
      },
      auth: {
        methods: ['email', 'google', 'twitter'],
      },
    },
  })

  // EU configuration (GDPR compliance)
  const euConfig = createConfig({
    region: 'EU',
    overrides: {
      colors: {
        primary: '#28a745', // Green
      },
      auth: {
        methods: ['email'], // More restrictive
      },
      features: {
        gdprCompliance: true,
        cookieConsent: true,
      },
    },
  })

  return { usConfig, euConfig }
}

/**
 * Example 9: Dynamic configuration updates
 */
export function dynamicConfigExample() {
  // Initial configuration
  let config = configManager.getConfig()
  console.log('Initial config:', config.colors.primary)

  // Update configuration at runtime
  applyConfigOverrides({
    colors: {
      primary: '#e74c3c', // Red
    },
  })

  // Get updated configuration
  config = configManager.getConfig()
  console.log('Updated config:', config.colors.primary)

  // Clear overrides
  configManager.clearOverrides()

  // Get default configuration
  config = configManager.getConfig()
  console.log('Default config:', config.colors.primary)

  return config
}

// =============================================================================
// EXPORT ALL EXAMPLES
// =============================================================================

export const configExamples = {
  basicConfigExample,
  configWithOverridesExample,
  contextSpecificConfigExample,
  casinoSpecificConfigExample,
  environmentSpecificConfigExample,
  useConfigInReactExample,
  regionSpecificConfigExample,
  dynamicConfigExample,
}
