import { vars } from 'nativewind';

const rawColors = {
  light: {
    primary: 'hsl(142 43% 27%)',
  },
  dark: {
    primary: 'hsl(142 45% 45%)',
  },
};

export function getThemeColor(
  colorScheme: 'light' | 'dark' | undefined | null,
  color: keyof typeof rawColors.light,
) {
  return rawColors[colorScheme ?? 'light'][color];
}

export const themes = {
  light: vars({
    '--background': 'hsl(90 30% 97%)',
    '--foreground': 'hsl(140 30% 12%)',
    '--card': 'hsl(90 25% 94%)',
    '--card-foreground': 'hsl(140 30% 12%)',
    '--primary': rawColors.light.primary,
    '--primary-foreground': 'hsl(90 40% 96%)',
    '--secondary': 'hsl(84 25% 88%)',
    '--secondary-foreground': 'hsl(140 30% 15%)',
    '--muted': 'hsl(84 20% 90%)',
    '--muted-foreground': 'hsl(140 15% 38%)',
    '--accent': 'hsl(38 55% 55%)',
    '--accent-foreground': 'hsl(140 30% 12%)',
    '--destructive': 'hsl(4 70% 45%)',
    '--destructive-foreground': 'hsl(0 0% 98%)',
    '--border': 'hsl(84 20% 82%)',
    '--input': 'hsl(84 20% 82%)',
    '--ring': rawColors.light.primary,
  }),
  dark: vars({
    '--background': 'hsl(140 30% 7%)',
    '--foreground': 'hsl(90 25% 92%)',
    '--card': 'hsl(140 25% 10%)',
    '--card-foreground': 'hsl(90 25% 92%)',
    '--primary': rawColors.dark.primary,
    '--primary-foreground': 'hsl(140 30% 8%)',
    '--secondary': 'hsl(140 20% 16%)',
    '--secondary-foreground': 'hsl(90 25% 92%)',
    '--muted': 'hsl(140 18% 16%)',
    '--muted-foreground': 'hsl(90 12% 65%)',
    '--accent': 'hsl(38 60% 55%)',
    '--accent-foreground': 'hsl(140 30% 8%)',
    '--destructive': 'hsl(4 65% 55%)',
    '--destructive-foreground': 'hsl(0 0% 98%)',
    '--border': 'hsl(140 20% 20%)',
    '--input': 'hsl(140 20% 20%)',
    '--ring': rawColors.dark.primary,
  }),
};
