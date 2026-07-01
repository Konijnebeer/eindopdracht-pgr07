import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ThemeToggle } from '@/components/themeToggle';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <Button label="Press me" onPress={() => {}} />
      <ThemeToggle />
    </View>
  );
}
