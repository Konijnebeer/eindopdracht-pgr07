import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { iconWithClassName } from "@/lib/icons";
import { RouteIcon } from "lucide-react-native";
import { Pressable } from "react-native";
import { Marker } from "react-native-maps";

iconWithClassName(RouteIcon);

type MarkerData = {
  id: number;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
};

export function CustomMarker({
  marker,
  onNavigate,
}: {
  marker: MarkerData;
  onNavigate: (id: number) => void;
}) {
  return (
    <Marker coordinate={marker.coordinate} tracksViewChanges={false}>
      <View className="flex-row items-center gap-3 rounded-lg border border-border p-2">
        <View className="max-w-[160px] shrink">
          <Text className="font-bold" numberOfLines={1}>
            {marker.title}
          </Text>
          <Text className="text-xs text-muted-foreground" numberOfLines={1}>
            {marker.description}
          </Text>
        </View>
        <Pressable
          hitSlop={8}
          className="rounded-md p-1"
          onPress={() => onNavigate(marker.id)}
        >
          <RouteIcon className="text-foreground" size={20} />
        </Pressable>
      </View>
    </Marker>
  );
}
