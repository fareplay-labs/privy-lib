import { BREAKPOINTS } from '@/design'
import { useMediaQuery } from './useMediaQuery'
import { useMemo } from 'react'

export const useIsBreakpoint = (breakpoint: keyof typeof BREAKPOINTS | number) => {
  const isBreakpoint = useMediaQuery(
    `(max-width: ${typeof breakpoint === 'number' ? breakpoint : BREAKPOINTS[breakpoint]}px)`
  )
  return useMemo(() => isBreakpoint, [isBreakpoint])
}

export const useIsBreakpointHeight = (breakpoint: keyof typeof BREAKPOINTS | number) => {
  const isBreakpoint = useMediaQuery(`(max-height: 672px)`)

  return isBreakpoint
}
export const useIsBreakpointLandscape = (breakpoint: keyof typeof BREAKPOINTS | number) => {
  const isBreakpoint = useMediaQuery(
    `(max-width: ${typeof breakpoint === 'number' ? breakpoint : BREAKPOINTS[breakpoint]}px) and (orientation: landscape)`
  )
  return useMemo(() => isBreakpoint, [isBreakpoint])
}
