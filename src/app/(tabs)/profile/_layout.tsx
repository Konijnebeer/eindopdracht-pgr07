import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useProfileAuth } from "@/features/user/hooks/use-profile-auth";
import { iconWithClassName } from "@/lib/icons";
import { router, Stack } from "expo-router";
import { Cog, Lock } from "lucide-react-native";
import { Pressable } from "react-native";

iconWithClassName(Cog);
iconWithClassName(Lock);

export default function ProfileLayout() {
  const { isAuthenticated, error, authenticate } = useProfileAuth();

  if (!isAuthenticated) {
    return (
      <View className="flex-1 items-center justify-center gap-4 p-6">
        <Lock className="text-foreground" size={48} />
        <Text className="text-center text-lg font-semibold">
          Profile locked
        </Text>
        {error && (
          <Text className="text-center text-sm text-muted-foreground">
            {error}
          </Text>
        )}
        <Button label="Unlock" onPress={authenticate} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
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
          title: "Settings",
        }}
      />
      <Stack.Screen name="photos" options={{ title: "Photos" }} />
    </Stack>
  );
}
