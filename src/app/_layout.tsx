import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

import { themes } from '@/lib/theme';

import '../../global.css';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <View style={themes[colorScheme ?? 'light']} className="flex-1">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack />
        <StatusBar style="auto" />
      </ThemeProvider>
    </View>
  );
}
