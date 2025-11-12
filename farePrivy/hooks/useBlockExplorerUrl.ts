import { useMemo } from 'react'
import { useAppChainConfigStore } from "../store/useAppChainConfigStore"

export const useBlockExplorerUrl = () => {
  const appChainConfig = useAppChainConfigStore.use.appChainConfig()
  return useMemo(
    () => appChainConfig.chainDefinition.blockExplorers?.default.url || '',
    [appChainConfig.chainDefinition.blockExplorers]
  )
}
