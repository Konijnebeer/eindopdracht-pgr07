import { ThemeToggle } from "@/components/themeToggle";
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

export default function SettingsScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <ThemeToggle/>
      {/* Language toggle with i18n ? */}
    </View>
  );
}
