import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useGetRouteById, useGetRoutes } from "@/features/routes/hooks/query";
import { useFavorite } from "@/features/routes/hooks/use-favorite";
import { iconWithClassName } from "@/lib/icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Heart, MapPin, Mountain, RouteIcon } from "lucide-react-native";
import { useLayoutEffect } from "react";
import { Pressable } from "react-native";
import MapView from "react-native-maps";

iconWithClassName(Heart);
iconWithClassName(Mountain);
iconWithClassName(RouteIcon);
iconWithClassName(MapPin);

export default function UserScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { data: routes } = useGetRoutes();
  const location = routes?.find((route) => route.id.toString() === id);

  const { data: route } = useGetRouteById(Number(id));

  const { isFavorite, toggleFavorite } = useFavorite(Number(id));

  useLayoutEffect(() => {
    const name = routes?.find((route) => route.id.toString() === id)?.name;
    if (name) {
      navigation.setOptions({ title: name });
    }
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => toggleFavorite(Number(id))}>
          <Heart
            className={isFavorite ? "text-red-500" : "text-foreground"}
            fill={isFavorite ? "#ef4444" : "transparent"}
            size={24}
          />
        </Pressable>
      ),
    });
  }, [id, navigation, routes, isFavorite, toggleFavorite]);

  return (
    <View className="flex-1 px-10 py-12">
      {location ? (
        <>
          <View className="flex-row gap-2 justify-around">
            <View className="flex-row gap-2 items-center">
              <Mountain />
              <Text>
                <Text className="font-bold">{location.hoogtemeters}</Text>
                Hoogtemeters
              </Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <RouteIcon />
              <Text>
                <Text className="font-bold">{location.hoogtemeters}</Text>
                Kilometer
              </Text>
            </View>
          </View>
          <View className="mt-4 gap-2">
            <Text className="text-md">
              <Text className="font-bold">Provincie:</Text> {location.provincie}
            </Text>
            <Text className="text-md">
              <Text className="font-bold">Address: </Text> {location.address}
            </Text>
          </View>
          <View>
            <Text className="text-md mt-4">{location.omgeving}</Text>
          </View>
          <View className="flex-row flex-wrap gap-2 mt-2">
            {location.marking.map((mark, index) => (
              <View
                key={index}
                className="flex-row gap-2 items-center border border-border p-2 rounded-lg w-[100%] min-h-32"
              >
                <MapPin
                  className={`${
                    mark.type === "red"
                      ? "text-red-600"
                      : mark.type === "blauw"
                        ? "text-blue-600"
                        : mark.type === "pink"
                          ? "text-pink-600"
                          : "text-foreground"
                  }
                    px-4 py-4 `}
                  size={20}
                />
                <Text className="text-md flex-1 flex-wrap">
                  {mark.description}
                </Text>
              </View>
            ))}
          </View>
          <MapView
            className="w-full h-64 mt-4 rounded-lg"
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          ></MapView>
        </>
      ) : (
        <Text className="text-lg font-bold">Route not found</Text>
      )}
    </View>
  );
}
