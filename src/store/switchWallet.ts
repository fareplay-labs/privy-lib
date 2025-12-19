import { proxy } from 'valtio'

export const switchWalletState = proxy<{
  isWalletModalOpen: boolean
  selectedConnectorType: string
}>({
  isWalletModalOpen: false,
  selectedConnectorType: '',
})
