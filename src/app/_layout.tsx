import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import { getThemeColor } from "@/lib/theme";

import { View } from "@/components/ui/view";
import "../../global.css";

const queryClient = new QueryClient();

const navigationThemes = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: getThemeColor("light", "primary"),
    },
  },
  dark: {
    ...DarkTheme,
    colors: { ...DarkTheme.colors, primary: getThemeColor("dark", "primary") },
  },
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <View className="flex-1">
        <ThemeProvider
          value={
            colorScheme === "dark"
              ? navigationThemes.dark
              : navigationThemes.light
          }
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="list-modal"
              options={{ presentation: "modal", title: "Routes" }}
            />
            <Stack.Screen name="route" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </View>
    </QueryClientProvider>
  );
}
