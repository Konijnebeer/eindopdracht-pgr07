import { useRouter } from 'expo-router';

import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Button label="Settings" onPress={() => router.push('/profile/settings')} />
      <Button label="Photos" onPress={() => router.push('/profile/photos')} />
    </View>
  );
}
