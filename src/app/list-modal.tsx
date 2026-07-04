import { ActivityIndicator, Pressable, ScrollView } from "react-native";

import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useGetRoutes } from "@/features/routes/hooks/query";
import { useTranslation } from "@/lib/i18n";
import { iconWithClassName } from "@/lib/icons";
import { router } from "expo-router";
import { MapPinned } from "lucide-react-native";
import { Suspense } from "react";

iconWithClassName(MapPinned);

function RouteList() {
  const { data: routes } = useGetRoutes();
  const { t } = useTranslation();

  if (routes.length === 0) {
    return (
      <Text className="text-muted-foreground">{t("routes.empty")}</Text>
    );
  }

  function handleRoutePress(routeId: string) {
    router.push({ pathname: "/route/[id]", params: { id: routeId } });
  }

  function handleQuickViewPress(routeId: string) {
    router.dismissTo({
      pathname: "/(tabs)",
      params: { focusRouteId: routeId },
    });
  }

  return (
    <>
      {routes.map((route) => (
        <Pressable
          key={route.id}
          hitSlop={8}
          className="mb-4 w-full rounded-lg border border-border p-2"
          onPress={() => handleRoutePress(route.id.toString())}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold self-start">{route.name}</Text>
            <Pressable
              className="rounded-lg p-2"
              onPress={() => handleQuickViewPress(route.id.toString())}
            >
              <MapPinned className="text-foreground" size={20} />
            </Pressable>
          </View>
          <Text className="text-sm text-muted-foreground">{route.address}</Text>
        </Pressable>
      ))}
    </>
  );
}

export default function ListModal() {
  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="flex-1 items-center justify-center p-4">
        <Suspense fallback={<ActivityIndicator size="small" />}>
          <RouteList />
        </Suspense>
      </ScrollView>
    </View>
  );
}
