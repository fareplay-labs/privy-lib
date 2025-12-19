// Main entry point for @zynkah/privy-lib

// Test export - simplified provider for testing
export { PrivyProvider, type PrivyProviderProps } from "./PrivyProviderTest.js";

// Production export (commented out for testing)
// export {
//   PrivyProvider,
//   type PrivyProviderProps,
// } from "./farePrivy/PrivyProvider";

// Export updated UI components and modals
export { WalletOverview } from "./src/components/WalletOverview";
export { Button, ButtonEnum } from "./src/components/shared/Button";
export { SelectWalletModal } from "./src/modals/SelectWalletModal/index.js";

// Export shared modal components
export { default as ModalCard } from "./src/components/shared/Modal/Card";
export { ModalHeader } from "./src/components/shared/Modal/ModalHeader";
export { ModalFooter } from "./src/components/shared/Modal/ModalFooter";

// Export UI components
// export * from './farePrivy/components'

// Export configuration utilities
// export * from './farePrivy/config'

// Export casino auth module
// export * from './farePrivy/lib/casino-auth'

// Export utilities
// export * from './farePrivy/utility'
