import { type Variants } from 'framer-motion'

export const prevButtonVariant: Variants = {
  initial: { x: 0 },
  animate: { x: 0 },
  hover: { x: [0, -5, 0] },
}

export const modalOverlayVarient: Variants = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.12,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.12,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
}
