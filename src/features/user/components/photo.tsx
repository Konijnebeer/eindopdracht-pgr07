import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Photo } from "@/features/user/type";
import { iconWithClassName } from "@/lib/icons";
import { Image } from "expo-image";
import { MapPin, Trash2 } from "lucide-react-native";
import { Pressable } from "react-native";

iconWithClassName(MapPin);
iconWithClassName(Trash2);

export function PhotoCard({
  photo,
  onDelete,
}: {
  photo: Photo;
  onDelete: (id: string) => void;
}) {
  return (
    <View className="overflow-hidden rounded-lg border border-border">
      <Image
        source={{ uri: photo.uri }}
        style={{ width: "100%", height: 220 }}
        contentFit="cover"
      />
      <View className="flex-row items-center justify-between p-3">
        <View className="flex-1 gap-1">
          <View className="flex-row items-center gap-2">
            <MapPin className="text-primary" size={18} />
            <Text className="font-bold">{photo.routeName}</Text>
          </View>
          <Text className="text-sm text-muted-foreground">
            {new Date(photo.takenAt).toLocaleString("nl-NL", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <Pressable
          onPress={() => onDelete(photo.id)}
          hitSlop={8}
          className="p-2 active:opacity-70"
        >
          <Trash2 className="text-red-500" size={22} />
        </Pressable>
      </View>
    </View>
  );
}
