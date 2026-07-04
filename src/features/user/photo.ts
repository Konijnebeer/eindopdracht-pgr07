import AsyncStorage from "@react-native-async-storage/async-storage";
import { File, Paths } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Photo, PhotoLocation } from "@/features/user/type";

const STORAGE_KEY = "photos";

/// Get all photos saved on the device
export async function getPhotos() {
  const value = await AsyncStorage.getItem(STORAGE_KEY);
  if (value === null) {
    return [];
  }
  return JSON.parse(value) as Photo[];
}

/// Get all photos taken on a specific route
export async function getPhotosByRouteId(routeId: number): Promise<Photo[]> {
  const photos = await getPhotos();
  return photos.filter((photo) => photo.routeId === routeId);
}

export async function takeAndSavePhoto(location: PhotoLocation) {
  const temporaryUri = await capturePhoto();
  if (!temporaryUri) {
    return null;
  }

  const uri = persistPhoto(temporaryUri);

  const photo: Photo = {
    id: `${Date.now()}`,
    uri,
    takenAt: new Date().toISOString(),
    ...location,
  };

  return storePhoto(photo);
}

/// Get a photo from the user by opening the camera.
async function capturePhoto() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ["images"],
    quality: 1,
  });

  if (result.canceled || !result.assets?.length) {
    return null;
  }

  return result.assets[0].uri;
}

/// Copy the captured photo into persistent app storage on the device
function persistPhoto(temporaryUri: string) {
  const extension = temporaryUri.split(".").pop() || "jpg";
  const source = new File(temporaryUri);
  const destination = new File(
    Paths.document,
    `photo-${Date.now()}.${extension}`,
  );
  source.copy(destination);
  return destination.uri;
}

async function storePhoto(photo: Photo) {
  const photos = await getPhotos();
  const updated = [photo, ...photos];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/// Delete a photo from the device
export async function deletePhoto(id: string) {
  const photos = await getPhotos();
  const photo = photos.find((item) => item.id === id);

  if (photo) {
    try {
      const file = new File(photo.uri);
      if (file.exists) {
        file.delete();
      }
    } catch {
      // Ignore missing files
    }
  }

  const updated = photos.filter((item) => item.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
