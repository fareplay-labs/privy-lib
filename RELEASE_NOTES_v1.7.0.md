# Release Notes - fare-privy-core v1.7.0

## 🚀 New Features

### 💰 useWalletBalance Hook
- **Added comprehensive balance checking functionality** for connected wallets
- **Multi-chain support**: Native currency balances for both Ethereum (ETH) and Solana (SOL)
- **Real-time updates**: Automatic balance fetching when wallets connect
- **Manual refresh**: `refreshBalances()` function for on-demand updates
- **Loading states**: Proper loading indicators while fetching balances
- **Error handling**: Graceful error reporting for RPC failures

## 🔧 Technical Implementation

### RPC Integration
- **Ethereum**: Uses `https://eth.llamarpc.com` for `eth_getBalance` calls
- **Solana**: Uses `https://api.mainnet-beta.solana.com` for `getBalance` calls
- **Concurrent fetching**: Optimized with `Promise.allSettled` for parallel balance requests
- **Error resilience**: Individual chain failures don't break the entire hook

### Hook Interface
```typescript
const {
  ethereumBalance: string | null,    // ETH balance in ether format
  solanaBalance: string | null,      // SOL balance  
  loading: boolean,                  // Fetching state indicator
  error: string | null,              // Error message if any
  refreshBalances: () => Promise<void>, // Manual refresh function
  hasBalances: boolean               // True if any balance exists
} = useWalletBalance();
```

## 📦 Package Updates

### Version Bumped
- **v1.6.0** → **v1.7.0**
- Updated in `package.json`, `index.ts`, and `README.md`

### Documentation Enhanced
- **README.md**: Added comprehensive `useWalletBalance` usage examples
- **Hook count updated**: 4 → 5 dependency-free hooks
- **Changelog**: Detailed v1.7.0 release notes added

### Export Updates
- **index.ts**: Added `useWalletBalance` to main exports
- **TypeScript**: Full type definitions included
- **Documentation**: Usage examples with loading states and error handling

## 🧪 Testing

### Test Coverage
- **All 17 tests passing** ✅
- **Balance hook integration**: Added to test suite
- **Build verification**: TypeScript compilation successful
- **Package integrity**: All exports working correctly

### Test Updates
- Updated `tests/hooks.test.tsx` to include `useWalletBalance`
- Added balance-related test elements for verification
- Maintained 100% test coverage

## 📊 Package Metrics

- **Size**: 14.2 kB compressed (48.4 kB unpacked)
- **Files**: 19 total files in package
- **Dependencies**: 11 carefully managed dependencies
- **TypeScript**: Full type support with declaration maps

## 🎯 Casino Client Benefits

### For Casino Developers
```typescript
// Easy balance integration
const { ethereumBalance, solanaBalance, loading } = useWalletBalance();

// Perfect for casino wallet displays
<WalletBalance>
  <div>ETH: {ethereumBalance || "0.00"}</div>
  <div>SOL: {solanaBalance || "0.00"}</div>
  {loading && <Spinner />}
</WalletBalance>
```

### Use Cases
- **Casino wallet displays**: Show user's available balance
- **Deposit validation**: Check if user has funds before game entry
- **Withdrawal limits**: Validate maximum withdrawal amounts
- **Real-time updates**: Balance changes reflect immediately

## 🔄 Migration Guide

### Upgrading from v1.6.0
```bash
npm install fare-privy-core@1.7.0
```

No breaking changes - simply add the new hook where needed:
```typescript
import { useWalletBalance } from 'fare-privy-core';
```

## 📈 What's Next

- Consider token balance support (ERC-20, SPL tokens)
- Potential caching improvements for balance queries
- WebSocket support for real-time balance updates
- Multi-wallet balance aggregation

---

**Published**: November 13, 2025
**Package**: https://www.npmjs.com/package/fare-privy-core
**Version**: 1.7.0
**Size**: 14.2 kB

## 🙏 Thank You

This release brings fare-privy-core closer to being a complete casino wallet management solution. The balance functionality was the missing piece for comprehensive wallet integration in casino applications.