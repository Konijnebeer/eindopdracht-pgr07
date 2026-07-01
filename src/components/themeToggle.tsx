import { useColorScheme } from "nativewind";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      label={`Switch to ${colorScheme === "dark" ? "light" : "dark"} mode`}
      onPress={toggleColorScheme}
    />
  );
}
