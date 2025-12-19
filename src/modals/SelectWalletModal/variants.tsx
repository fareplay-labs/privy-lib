import { Variants } from "framer-motion"

export const modalVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

export const modalContentVariants: Variants = {
  initial: {
    y: -60,
  },
  animate: {
    y: 0,
  },
  exit: {
    y: -60,
  },
}

export const mobileModalContentVariants: Variants = {
  initial: {
    y: '110%',
    opacity: 1,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      damping: 25,
      type: 'spring',
    },
  },
  exit: {
    y: '110%',
    opacity: 0.8,
    transition: {
      damping: 25,
      type: 'spring',
    },
  },
}

export const embeddedWalletsListVariants: Variants = {
  open: {
    opacity: 1,
    height: 'auto',
    paddingTop: 6,
    paddingBottom: 6,
  },
  closed: {
    opacity: 0,
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
}