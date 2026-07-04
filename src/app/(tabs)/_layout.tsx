import { Text } from "@/components/ui/text";
import { useTranslation } from "@/lib/i18n";
import { iconWithClassName } from "@/lib/icons";
import { Tabs, useRouter } from "expo-router";
import { List, Map, User } from "lucide-react-native";
import { Pressable } from "react-native";

iconWithClassName(List);
iconWithClassName(Map);
iconWithClassName(User);

export default function TabsLayout() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.map"),
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
              {t("tabs.map")}
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
          title: t("tabs.profile"),
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
              {t("tabs.profile")}
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
