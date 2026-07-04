import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useGetRouteById, useGetRoutes } from "@/features/routes/hooks/query";
import { useFavorite } from "@/features/routes/hooks/use-favorite";
import { parseGpxTrack } from "@/features/routes/utils/gpx";
import { usePhotos } from "@/features/user/hooks/use-photos";
import { useTranslation } from "@/lib/i18n";
import { iconWithClassName } from "@/lib/icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  Camera,
  Heart,
  MapPin,
  Mountain,
  RouteIcon,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useLayoutEffect, useMemo } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

iconWithClassName(Heart);
iconWithClassName(Mountain);
iconWithClassName(RouteIcon);
iconWithClassName(MapPin);
iconWithClassName(Camera);

export default function UserScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { data: routes } = useGetRoutes();
  const location = routes?.find((route) => route.id.toString() === id);

  const { data: route } = useGetRouteById(Number(id));

  const track = useMemo(() => (route ? parseGpxTrack(route) : []), [route]);
  const start = track[0];

  const { isFavorite, toggleFavorite } = useFavorite(Number(id));

  const { takePhoto, isTaking } = usePhotos();

  const { colorScheme } = useColorScheme();
  const foreground = colorScheme === "dark" ? "#f7faf5" : "#0c1710";

  const { t } = useTranslation();

  useLayoutEffect(() => {
    const name = routes?.find((route) => route.id.toString() === id)?.name;
    if (name) {
      navigation.setOptions({ title: name });
    }
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          disabled={isTaking || !location}
          onPress={() =>
            location &&
            takePhoto({
              routeId: location.id,
              routeName: location.name,
            })
          }
        >
          <Camera
            className={isTaking ? "text-muted-foreground" : "text-foreground"}
            size={24}
          />
        </Pressable>
      ),
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
  }, [
    id,
    navigation,
    routes,
    isFavorite,
    toggleFavorite,
    location,
    takePhoto,
    isTaking,
  ]);

  return (
    <View className="flex-1 px-10 py-12">
      {location ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row gap-2 justify-around">
            <View className="flex-row gap-2 items-center">
              <Mountain className="text-foreground" />
              <Text>
                <Text className="font-bold">{location.hoogtemeters}</Text>{" "}
                {t("route.elevation")}
              </Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <RouteIcon className="text-foreground" />
              <Text>
                <Text className="font-bold">{location.hoogtemeters}</Text>{" "}
                {t("route.kilometer")}
              </Text>
            </View>
          </View>
          <View className="mt-4 gap-2">
            <Text className="text-md">
              <Text className="font-bold">{t("route.province")}</Text>{" "}
              {location.provincie}
            </Text>
            <Text className="text-md">
              <Text className="font-bold">{t("route.address")}</Text>{" "}
              {location.address}
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
            style={styles.map}
            initialRegion={{
              latitude: start?.latitude ?? location.latitude,
              longitude: start?.longitude ?? location.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
          >
            {track.length > 1 && (
              <Polyline
                coordinates={track}
                strokeColor={foreground}
                strokeWidth={3}
              />
            )}
            {start && (
              <Marker coordinate={start} title={t("route.start")}>
                <MapPin className="text-primary" size={32} />
              </Marker>
            )}
          </MapView>
        </ScrollView>
      ) : (
        <Text className="text-lg font-bold">{t("route.notFound")}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 256,
    marginTop: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
});
