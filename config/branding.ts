export interface ThemeColors {
  background?: string
  foreground?: string
  card?: string
  cardForeground?: string
  popover?: string
  popoverForeground?: string
  primary?: string
  primaryForeground?: string
  secondary?: string
  secondaryForeground?: string
  muted?: string
  mutedForeground?: string
  accent?: string
  accentForeground?: string
  destructive?: string
  destructiveForeground?: string
  border?: string
  input?: string
  ring?: string
  chart1?: string
  chart2?: string
  chart3?: string
  chart4?: string
  chart5?: string
}

export interface BrandConfig {
  name: string
  logoUrl?: string
  faviconUrl?: string
  customCssUrl?: string
  supportEmail?: string
  documentationUrl?: string
  termsUrl?: string
  privacyUrl?: string
  theme?: {
    colors?: ThemeColors
    radius?: string // e.g., '0.5rem'
  }
}

/**
 * Default brand configuration values
 * Customize these values to change the look and feel of your app.
 */
const defaultConfig: BrandConfig = {
  name: 'KyronHQ',
  logoUrl: undefined,
  faviconUrl: '/favicon/favicon.ico',
  customCssUrl: undefined,
  supportEmail: 'hi@kyronhq.dev',
  documentationUrl: undefined,
  termsUrl: undefined,
  privacyUrl: undefined,
  theme: {
    // These colors will override the defaults in globals.css
    // Leave undefined to use the default OKLCH values from globals.css
    // Format: Hex, RGB, or HSL (e.g., '#701ffc', 'rgb(112, 31, 252)')
    colors: {
      primary: '#000000', // Black
      primaryForeground: '#ffffff', // White text on black button
      // background: '#ffffff', // Uncomment to override
      // foreground: '#0c0c0c', // Uncomment to override
    },
    radius: '0.625rem',
  },
}

export const getBrandConfig = (): BrandConfig => {
  return defaultConfig
}

/**
 * Hook to use brand configuration in React components
 */
export const useBrandConfig = () => {
  return getBrandConfig()
}
