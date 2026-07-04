import { useRouter } from "expo-router";

import { Button } from "@/components/ui/button";
import { View } from "@/components/ui/view";
import { useTranslation } from "@/lib/i18n";

export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center gap-4">
      {/* // profile page see all favorites and go to settings */}

      <Button
        label={t("profile.photos")}
        onPress={() => router.push("/profile/photos")}
      />
    </View>
  );
}
