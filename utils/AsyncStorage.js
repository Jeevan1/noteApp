import AsyncStorage from "@react-native-async-storage/async-storage";

export const setNote = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item:", error);
  }
};

export const getNote = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting item:", error);
    return null;
  }
};

export const removeNote = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

export const mergeNote = async (key, value) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error merging item:", error);
  }
};

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};

export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error("Error getting all keys:", error);
    return [];
  }
};

export const getAllItems = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    return items.reduce((accumulator, [key, value]) => {
      accumulator[key] = JSON.parse(value);
      return accumulator;
    }, {});
  } catch (error) {
    console.error("Error getting all items:", error);
    return {};
  }
};
