import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Favorite } from "./type";

export function useFavorite(id: number) {
  const [isFavorite, setIsFavorite] = useState(false);

  const localStorageKey = "favorites";

  async function getData() {
    try {
      const value = await AsyncStorage.getItem(localStorageKey);
      if (value !== null) {
        return JSON.parse(value) as Favorite[];
      }
      return [];
    } catch (e) {
      Alert.alert("Error", "Failed to load favorites from storage.");
    }
  }

  async function storeData(value: Favorite[]) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(localStorageKey, jsonValue);
    } catch (e) {
      Alert.alert("Error", "Failed to save favorites to storage.");
    }
  }

  async function toggleFavorite(id: number) {
    const favorites = await getData();
    if (!favorites) return;

    let updatedFavorites: Favorite[];

    if (favorites.some((favorite) => favorite.id === id)) {
      updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    } else {
      updatedFavorites = [...favorites, { id, favorite: true }];
    }

    await storeData(updatedFavorites);
    setIsFavorite(updatedFavorites.some((favorite) => favorite.id === id));
  }

  useEffect(() => {
    async function checkFavorite() {
      const favorites = await getData();

      if (!favorites) return setIsFavorite(false);

      if (favorites.some((favorite) => favorite.id === id)) {
        setIsFavorite(true);
      }
    }
    checkFavorite();
  }, [id]);

  return { isFavorite, toggleFavorite };
}
