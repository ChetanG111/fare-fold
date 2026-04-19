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
    radius?: string
  }
}

const defaultConfig: BrandConfig = {
  name: 'FareFold',
  logoUrl: undefined,
  faviconUrl: '/image.png',
  customCssUrl: undefined,
  supportEmail: 'chetangonuguntla0@gmail.com',
  documentationUrl: undefined,
  termsUrl: undefined,
  privacyUrl: undefined,
  theme: {
    colors: {
      background: '#fbf7f0',
      foreground: '#211b17',
      card: '#fffdf8',
      cardForeground: '#211b17',
      primary: '#8f2f24',
      primaryForeground: '#fff8ee',
      secondary: '#f1eadf',
      secondaryForeground: '#211b17',
      muted: '#f1eadf',
      mutedForeground: '#6d6259',
      accent: '#8f2f24',
      accentForeground: '#fff8ee',
      border: '#ded3c5',
      input: '#ded3c5',
      ring: '#8f2f24',
    },
    radius: '0.5rem',
  },
}

export const getBrandConfig = (): BrandConfig => {
  return defaultConfig
}

export const useBrandConfig = () => {
  return getBrandConfig()
}
