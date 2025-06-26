"use server";

import { cookies } from "next/headers";

export const setItems = async (newItem: string) => {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has("wheelItems");
  const wheelItems = cookieStore.get("wheelItems");

  let items: string[] = [];
  if (hasCookie) {
    try {
      items = JSON.parse(wheelItems?.value || "");
    } catch {
      items = [];
    }
  }
  items.push(newItem);
  cookieStore.set("wheelItems", JSON.stringify(items));
};

export const clearList = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("wheelItems");
};

export const deleteItem = async (indexToDelete: number) => {
  const cookieStore = await cookies();
  const wheelItems = cookieStore.get("wheelItems");

  if (!wheelItems?.value) return;

  try {
    const items = JSON.parse(wheelItems.value) as string[];
    const updatedItems = items.filter((_, index) => index !== indexToDelete); // burda "===" olarak alırsam dizide sadece silmek istediğimi tutar ben dizide silmeyi istediğim item hariç diğerlerini tutmak istediğim için "!==" kullanıyorum
    cookieStore.set("wheelItems", JSON.stringify(updatedItems));
    if (updatedItems.length === 0) {
      await clearList();
    }
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
