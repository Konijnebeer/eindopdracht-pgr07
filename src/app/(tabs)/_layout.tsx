import { Tabs, useRouter } from 'expo-router';
import { List, Map, User } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Pressable } from 'react-native';

export default function TabsLayout() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const foreground = colorScheme === 'dark' ? '#fafafa' : '#0a0a0f';

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
          headerRight: () => (
            <Pressable onPress={() => router.push('/list-modal')} className="mr-4">
              <List color={foreground} size={24} />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
