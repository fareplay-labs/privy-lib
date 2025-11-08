import { proxy } from 'valtio'

export const withdrawPrivyModalState = proxy({
  isVisible: false,
})

export const useWithdrawPrivyModalState = () => {
  const setWithdrawPrivyModal = (isVisible: boolean) =>
    (withdrawPrivyModalState.isVisible = isVisible)

  const showWithdrawPrivyModal = () => {
    withdrawPrivyModalState.isVisible = true
  }

  const hideWithdrawPrivyModal = () => {
    withdrawPrivyModalState.isVisible = false
  }

  return {
    showWithdrawPrivyModal,
    hideWithdrawPrivyModal,
    setWithdrawPrivyModal,
  }
}
