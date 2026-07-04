import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useProfileAuth } from "@/features/user/hooks/use-profile-auth";
import { useTranslation } from "@/lib/i18n";
import { iconWithClassName } from "@/lib/icons";
import { router, Stack } from "expo-router";
import { Cog, Lock } from "lucide-react-native";
import { Pressable } from "react-native";

iconWithClassName(Cog);
iconWithClassName(Lock);

export default function ProfileLayout() {
  const { isAuthenticated, error, authenticate } = useProfileAuth();
  const { t } = useTranslation();

  if (!isAuthenticated) {
    return (
      <View className="flex-1 items-center justify-center gap-4 p-6">
        <Lock className="text-foreground" size={48} />
        <Text className="text-center text-lg font-semibold">
          {t("profile.locked")}
        </Text>
        {error && (
          <Text className="text-center text-sm text-muted-foreground">
            {error}
          </Text>
        )}
        <Button label={t("profile.unlock")} onPress={authenticate} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: t("profile.title"),
          headerRight: () => (
            <Pressable onPress={() => router.push("/profile/settings")}>
              <Cog className="text-foreground" size={24} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: t("settings.title"),
        }}
      />
      <Stack.Screen name="photos" options={{ title: t("photos.title") }} />
    </Stack>
  );
}
