import { DarkTheme, DefaultTheme, type Theme } from 'expo-router/react-navigation';

/**
 * The same palette as global.css, in JavaScript, because React Navigation styles
 * the header with a plain object and cannot read a CSS variable.
 *
 * Values are sRGB hex rather than oklch, and the two translucent border tokens
 * are given solid stand-ins, because a navigation theme has to be opaque.
 */
export const THEME = {
  light: {
    background: '#fcf8f3',
    foreground: '#261d16',
    card: '#fffffd',
    cardForeground: '#261d16',
    popover: '#fffffd',
    popoverForeground: '#261d16',
    primary: '#6e4836',
    primaryForeground: '#fffbf4',
    secondary: '#f3e6d2',
    secondaryForeground: '#503224',
    muted: '#f3eee6',
    mutedForeground: '#72665e',
    accent: '#f4e2c8',
    accentForeground: '#482a1d',
    destructive: '#e7000b',
    border: '#e3d9cd',
    input: '#e3d9cd',
    ring: '#6e4836',
    radius: '0.625rem',
    chart1: 'hsl(12 76% 61%)',
    chart2: 'hsl(173 58% 39%)',
    chart3: 'hsl(197 37% 24%)',
    chart4: 'hsl(43 74% 66%)',
    chart5: 'hsl(27 87% 67%)',
  },
  dark: {
    background: '#130e0a',
    foreground: '#f4f1ec',
    card: '#201913',
    cardForeground: '#f4f1ec',
    popover: '#201913',
    popoverForeground: '#f4f1ec',
    primary: '#f1c68b',
    primaryForeground: '#25170d',
    secondary: '#332920',
    secondaryForeground: '#eeebe4',
    muted: '#2d251e',
    mutedForeground: '#aaa39a',
    accent: '#3b2d20',
    accentForeground: '#f1eee7',
    destructive: '#ff6467',
    border: '#3a3129',
    input: '#453b33',
    ring: '#f1c68b',
    radius: '0.625rem',
    chart1: 'hsl(220 70% 50%)',
    chart2: 'hsl(160 60% 45%)',
    chart3: 'hsl(30 80% 55%)',
    chart4: 'hsl(280 65% 60%)',
    chart5: 'hsl(340 75% 55%)',
  },
};

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.background,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.background,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};
