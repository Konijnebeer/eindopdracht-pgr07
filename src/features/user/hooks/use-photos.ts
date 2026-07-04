import {
  deletePhoto,
  getPhotos,
  takeAndSavePhoto,
} from "@/features/user/photo";
import { Photo, PhotoLocation } from "@/features/user/type";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isTaking, setIsTaking] = useState(false);

  useEffect(() => {
    getPhotos()
      .then(setPhotos)
      .catch(() => Alert.alert("Error", "Failed to load photos from storage."));
  }, []);

  const takePhoto = useCallback(async (location: PhotoLocation) => {
    setIsTaking(true);
    try {
      const updated = await takeAndSavePhoto(location);
      if (updated) {
        setPhotos(updated);
        Alert.alert("Success", "Photo taken and saved successfully.");
      }
    } catch {
      Alert.alert("Error", "Failed to take or save the photo.");
    } finally {
      setIsTaking(false);
    }
  }, []);

  const removePhoto = useCallback((id: string) => {
    Alert.alert("Delete photo", "Are you sure you want to delete this photo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const updated = await deletePhoto(id);
            setPhotos(updated);
          } catch {
            Alert.alert("Error", "Failed to delete the photo.");
          }
        },
      },
    ]);
  }, []);

  return { photos, takePhoto, isTaking, removePhoto };
}
