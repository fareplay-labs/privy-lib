import { type PrivyClientConfig, type WalletListEntry } from '@privy-io/react-auth'
import { FARE_COLORS } from '@/design'
import { defaultSupportedChain, supportedChains } from '@/chains'
import { SMART_WALLET_DEFAULTS } from './constants'
import '../styles/privy-theme-override.css'

type PrivyLoginMethod = PrivyClientConfig['loginMethods']

export const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID || 'cm2mgmv1g06oz12h3qrxie4k7'
export const PRIVY_APP_CLIENT_ID =
  import.meta.env.VITE_PRIVY_APP_CLIENT_ID || 'client-WY5cjJTuri7cwFC8eCUk8LjmcibTWmkMJj8nefphRTLBs'

const privyLoginMethods = [
  'email',
  'sms',
  'google',
  'twitter',
  'discord',
  'wallet',
] as PrivyLoginMethod


const privyWalletList = [
  'metamask',
  'coinbase_wallet',
  'rainbow',
  'wallet_connect',
  'safe',
  'zerion',
  'detected_wallets',
] as WalletListEntry[]

export const privyConfig: PrivyClientConfig = {
  defaultChain: defaultSupportedChain,
  supportedChains,
  loginMethods: privyLoginMethods,
  appearance: {
    walletChainType: 'ethereum-only',
    showWalletLoginFirst: false,
    walletList: privyWalletList,
    theme: 'dark',
    accentColor: FARE_COLORS.aqua,
    logo: `${location.origin}/images/fareplay-white-logo.svg`,
  },
  // Create embedded wallets for users who don't have a wallet
  embeddedWallets: {
    createOnLogin: 'all-users',
    showWalletUIs: false,
  },
  externalWallets: {
    coinbaseWallet: {
      connectionOptions: 'eoaOnly',
    },
  },
}

export const biconomyPrivyConfig: Record<any, any> = {
  paymasterContext: {
    mode: SMART_WALLET_DEFAULTS.BICONOMY.PAYMASTER_CONTEXT.MODE,
    calculateGasLimits: SMART_WALLET_DEFAULTS.BICONOMY.PAYMASTER_CONTEXT.CALCULATE_GAS_LIMITS,
    expiryDuration: SMART_WALLET_DEFAULTS.BICONOMY.PAYMASTER_CONTEXT.EXPIRY_DURATION,
    sponsorshipInfo: {
      webhookData: {},
      smartAccountInfo: {
        name: SMART_WALLET_DEFAULTS.BICONOMY.PAYMASTER_CONTEXT.SMART_ACCOUNT_INFO.NAME,
        version: SMART_WALLET_DEFAULTS.BICONOMY.PAYMASTER_CONTEXT.SMART_ACCOUNT_INFO.VERSION,
      },
    },
  },
}
