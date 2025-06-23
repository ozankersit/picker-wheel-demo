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
