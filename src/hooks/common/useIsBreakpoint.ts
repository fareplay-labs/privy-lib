import { useMediaQuery } from "./useMediaQuery";
import { useMemo } from "react";

/**
 * Consumers must provide their own BREAKPOINTS object.
 * Example:
 * export const BREAKPOINTS = { mobile: 480, tablet: 768, desktop: 1024 };
 */
export type Breakpoints = Record<string, number>;

/**
 * useIsBreakpoint - Checks if the current screen width is below the given breakpoint.
 * @param breakpoint - Either a key of the BREAKPOINTS object or a number (pixels)
 * @param BREAKPOINTS - The breakpoints object to use (must be provided by the consumer)
 */

export const useIsBreakpoint = (
  breakpoint: keyof Breakpoints | number,
  BREAKPOINTS: Breakpoints
) => {
  let value: number;
  if (typeof breakpoint === "number") {
    value = breakpoint;
  } else {
    value = BREAKPOINTS[breakpoint];
    if (typeof value !== "number" || isNaN(value)) {
      throw new Error(
        `[useIsBreakpoint] Invalid breakpoint key: '${breakpoint}'. Please provide a valid key from BREAKPOINTS.`
      );
    }
  }
  const isBreakpoint = useMediaQuery(`(max-width: ${value}px)`);
  return useMemo(() => isBreakpoint, [isBreakpoint]);
};

/**
 * useIsBreakpointHeight - Checks if the current screen height is below a fixed value (672px).
 * @returns boolean
 */
export const useIsBreakpointHeight = () => {
  return useMediaQuery(`(max-height: 672px)`);
};

/**
 * useIsBreakpointLandscape - Checks if the current screen width is below the given breakpoint and in landscape orientation.
 * @param breakpoint - Either a key of the BREAKPOINTS object or a number (pixels)
 * @param BREAKPOINTS - The breakpoints object to use (must be provided by the consumer)
 */

export const useIsBreakpointLandscape = (
  breakpoint: keyof Breakpoints | number,
  BREAKPOINTS: Breakpoints
) => {
  let value: number;
  if (typeof breakpoint === "number") {
    value = breakpoint;
  } else {
    value = BREAKPOINTS[breakpoint];
    if (typeof value !== "number" || isNaN(value)) {
      throw new Error(
        `[useIsBreakpointLandscape] Invalid breakpoint key: '${breakpoint}'. Please provide a valid key from BREAKPOINTS.`
      );
    }
  }
  const isBreakpoint = useMediaQuery(
    `(max-width: ${value}px) and (orientation: landscape)`
  );
  return useMemo(() => isBreakpoint, [isBreakpoint]);
};
