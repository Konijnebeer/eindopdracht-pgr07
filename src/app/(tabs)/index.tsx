import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { CustomMarker } from "@/features/routes/components/marker";
import { useGetRoutes } from "@/features/routes/hooks/query";
import { useTranslation } from "@/lib/i18n";
import { iconWithClassName } from "@/lib/icons";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { MapPin, Navigation } from "lucide-react-native";
import { Suspense, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet } from "react-native";
import MapView, { Marker, type Region } from "react-native-maps";

iconWithClassName(Navigation);
iconWithClassName(MapPin);

function Map({ region }: { region: Region }) {
  const { data: routes } = useGetRoutes();
  const { focusRouteId } = useLocalSearchParams<{ focusRouteId?: string }>();
  const mapRef = useRef<MapView>(null);

  const markers = routes.map((route) => ({
    id: route.id,
    coordinate: {
      latitude: route.latitude,
      longitude: route.longitude,
    },
    title: route.name,
    description: route.address,
  }));

  useEffect(() => {
    if (!focusRouteId) {
      return;
    }

    const route = routes.find((r) => r.id.toString() === focusRouteId);
    if (!route) {
      return;
    }

    mapRef.current?.animateToRegion(
      {
        latitude: route.latitude,
        longitude: route.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      500,
    );
    router.setParams({ focusRouteId: undefined });
  }, [focusRouteId, routes]);

  function handleRoutePress(routeId: string) {
    console.log(`Route ${routeId} pressed`);
    router.push({ pathname: "/route/[id]", params: { id: routeId } });
  }

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={region}
      showsUserLocation={false}
    >
      {markers.map((marker) => (
        <CustomMarker
          key={marker.id}
          marker={marker}
          onNavigate={(id) => handleRoutePress(id.toString())}
        />
      ))}
      <Marker coordinate={region} anchor={{ x: 0.5, y: 0.5 }}>
        <Navigation className="text-foreground" size={24} />
      </Marker>
    </MapView>
  );
}

export default function MapScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("map.permissionDenied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }

    getCurrentLocation();
  }, []);

  if (Platform.OS !== "ios" && Platform.OS !== "android") {
    return <Text>{t("map.unsupported")}</Text>;
  }

  if (errorMsg) {
    return <Text>{t(errorMsg)}</Text>;
  }

  if (!region) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Map region={region} />
    </Suspense>
  );
}

function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
