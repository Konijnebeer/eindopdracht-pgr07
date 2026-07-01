import { ScrollView } from 'react-native';

import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

export default function ListModal() {
  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="flex-1 items-center justify-center p-4">
        <Text className="text-muted-foreground">Nothing here yet</Text>
      </ScrollView>
    </View>
  );
}
