import { DEFAULT_THEME, MantineThemeOverride } from '@mantine/core'

export const DefaultUiTheme: MantineThemeOverride = {
  colors: {
    brand: DEFAULT_THEME.colors.blue,
  },
  loader: 'dots',
  primaryColor: 'brand',
}
