import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "expo-router";
import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from "react-native-paper";

const brand = {
  primary: "#208AEF",
  secondary: "#6C5CE7",
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: brand.primary,
    secondary: brand.secondary,
    primaryContainer: "#D6E9FD",
    background: "#F7F9FC",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#7AB8F5",
    secondary: "#A29BFE",
    primaryContainer: "#0F4C81",
    background: "#101418",
  },
};

function toNavigationTheme(
  base: typeof NavigationDefaultTheme,
  paper: MD3Theme,
): typeof NavigationDefaultTheme {
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: paper.colors.primary,
      background: paper.colors.background,
      card: paper.colors.surface,
      text: paper.colors.onSurface,
      border: paper.colors.outlineVariant,
      notification: paper.colors.error,
    },
  };
}

export const navigationLightTheme = toNavigationTheme(NavigationDefaultTheme, lightTheme);
export const navigationDarkTheme = toNavigationTheme(NavigationDarkTheme, darkTheme);

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
