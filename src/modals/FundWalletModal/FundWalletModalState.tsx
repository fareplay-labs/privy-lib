import { proxy } from 'valtio'

export const fundWalletModalState = proxy({
  isFundModalShowing: false,
  stepIdx: 0,
})
