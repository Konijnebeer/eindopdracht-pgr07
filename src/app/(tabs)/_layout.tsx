import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/icons";
import { Tabs, useRouter } from "expo-router";
import { List, Map, User } from "lucide-react-native";
import { Pressable } from "react-native";

iconWithClassName(List);
iconWithClassName(Map);
iconWithClassName(User);

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Map",
          tabBarIcon: ({ focused, size }) => (
            <Map
              className={focused ? "text-primary" : "text-foreground"}
              size={size}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs ${focused ? "text-primary" : "text-foreground"}`}
            >
              Map
            </Text>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/list-modal")}
              className="mr-4"
            >
              <List className="text-foreground" size={24} />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <User
              className={focused ? "text-primary" : "text-foreground"}
              size={size}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs ${focused ? "text-primary" : "text-foreground"}`}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
