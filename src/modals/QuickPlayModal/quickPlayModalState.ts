import { proxy } from 'valtio'

export const quickPlayModalState = proxy({
  isVisible: false,
})

export const usequickPlayModalState = () => {
  const setquickPlayModal = (isVisible: boolean) => (quickPlayModalState.isVisible = isVisible)

  const showquickPlayModal = () => {
    quickPlayModalState.isVisible = true
  }

  const hidequickPlayModal = () => {
    quickPlayModalState.isVisible = false
  }

  return {
    showquickPlayModal,
    hidequickPlayModal,
    setquickPlayModal,
  }
}
