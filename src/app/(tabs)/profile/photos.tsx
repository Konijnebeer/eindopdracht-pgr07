import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { PhotoCard } from "@/features/user/components/photo";
import { usePhotos } from "@/features/user/hooks/use-photos";
import { useTranslation } from "@/lib/i18n";
import { FlatList } from "react-native";

export default function PhotosScreen() {
  const { photos, removePhoto } = usePhotos();
  const { t } = useTranslation();

  if (photos.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-center text-muted-foreground">
          {t("photos.empty")}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={photos}
        keyExtractor={(photo) => photo.id}
        contentContainerClassName="gap-4 p-6"
        renderItem={({ item }) => (
          <PhotoCard photo={item} onDelete={removePhoto} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
