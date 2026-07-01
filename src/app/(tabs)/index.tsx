import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/icons";
import * as Location from "expo-location";
import { Navigation } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import MapView, { Marker, type Region } from "react-native-maps";

iconWithClassName(Navigation);

export default function MapScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
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
    return <Text>Maps are only available on Android and iOS</Text>;
  }

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (!region) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      showsUserLocation={false}
    >
      <Marker coordinate={region} anchor={{ x: 0.5, y: 0.5 }}>
        <Navigation className="text-foreground" size={24} />
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
