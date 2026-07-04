import { useColorScheme } from "nativewind";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { t } = useTranslation();

  return (
    <Button
      label={
        colorScheme === "dark"
          ? t("theme.switchToLight")
          : t("theme.switchToDark")
      }
      onPress={toggleColorScheme}
    />
  );
}
