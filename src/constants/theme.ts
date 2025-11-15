export const COLORS = {
  // Primary warm gold palette
  primary: '#D4AF37',
  primaryLight: '#F4E4B3',
  primaryDark: '#B8941E',

  // Warm secondary colors
  secondary: '#E8D5B7',
  accent: '#F5DEB3',

  // Backgrounds
  background: '#FFF9F0',
  cardBackground: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Text colors (high contrast for readability)
  textPrimary: '#2C2416',
  textSecondary: '#5C4F3B',
  textLight: '#8B7E6B',
  textWhite: '#FFFFFF',

  // Status colors
  success: '#6B8E23',
  error: '#C94C4C',
  warning: '#F0A500',
  info: '#7B9CA8',

  // Voice interaction states
  listening: '#4ECDC4',
  speaking: '#95E1D3',
  thinking: '#F38181',

  // Borders and dividers
  border: '#E5DDD0',
  divider: '#F0E9DD',
};

export const FONTS = {
  // Extra large sizes for elderly users
  extraLarge: 32,
  large: 28,
  title: 24,
  subtitle: 20,
  body: 18,
  caption: 16,
  small: 14,
};

export const SPACING = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
};

export const SIZES = {
  // Large touch targets (56-72px as specified)
  buttonHeight: 64,
  buttonHeightLarge: 72,
  iconSize: 48,
  iconSizeLarge: 64,
  avatarSize: 80,
  borderRadius: 16,
  borderRadiusLarge: 24,

  // Minimum touch target size
  minTouchTarget: 56,
};

export const ANIMATIONS = {
  // Slow, gentle animations for elderly users
  duration: {
    fast: 200,
    normal: 400,
    slow: 600,
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export default {
  COLORS,
  FONTS,
  SPACING,
  SIZES,
  ANIMATIONS,
  SHADOWS,
};
