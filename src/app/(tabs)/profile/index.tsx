import { useRouter } from "expo-router";

import { Button } from "@/components/ui/button";
import { View } from "@/components/ui/view";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-4">
      {/* // profile page see all favorites and go to settings */}

      <Button label="Photos" onPress={() => router.push("/profile/photos")} />
    </View>
  );
}
