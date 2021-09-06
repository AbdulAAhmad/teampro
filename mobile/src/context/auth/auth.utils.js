import * as SecureStore from "expo-secure-store";

export async function save(key, value) {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (error) {
    return false;
  }
  return true;
}
export async function deleteValue(key) {
  await SecureStore.deleteItemAsync(key);
}

export async function getValueFor(key) {
  try {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return JSON.parse(result);
    }
  } catch (error) {
    return "";
  }
}
