import { ThemeToggle } from "@/components/themeToggle";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { SUPPORTED_LOCALES, useTranslation } from "@/lib/i18n";
import { Pressable } from "react-native";

export default function SettingsScreen() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center gap-8 p-6">
      <ThemeToggle />

      <View className="w-full items-center gap-3">
        <Text className="text-lg font-semibold">{t("settings.language")}</Text>
        <View className="flex-row flex-wrap justify-center gap-2">
          {SUPPORTED_LOCALES.map((code) => {
            const isActive = locale === code;
            return (
              <Pressable
                key={code}
                onPress={() => setLocale(code)}
                className={`rounded-lg border px-4 py-3 ${
                  isActive
                    ? "border-primary bg-primary"
                    : "border-border bg-transparent"
                }`}
              >
                <Text
                  className={
                    isActive ? "font-semibold text-primary-foreground" : ""
                  }
                >
                  {t(`language.${code}`)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
