/**
 * Common Styles
 *
 * Shared style definitions for the application
 */

import { StyleSheet } from "react-native";

/**
 * Common spacing values
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

/**
 * Common border radius values
 */
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  round: 9999,
};

/**
 * Common shadow styles
 */
export const shadows = StyleSheet.create({
  sm: {
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.18)",
    elevation: 1,
  },
  md: {
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    elevation: 5,
  },
  lg: {
    boxShadow: "0px 4px 4.65px rgba(0, 0, 0, 0.3)",
    elevation: 8,
  },
});

/**
 * Common layout styles
 */
export const layout = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  row: {
    flexDirection: "row",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
});
