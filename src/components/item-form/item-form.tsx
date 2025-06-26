"use client";

import { useTransition } from "react";
import { setItems } from "../item-actions/action";

export default function ItemForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const newItem = formData.get("item") as string;

    if (newItem.trim()) {
      startTransition(async () => {
        await setItems(newItem.trim());
      });
    }
  };

  return (
    <form action={handleSubmit} className="basis-1/2 ml-auto">
      <input
        name="item"
        type="text"
        placeholder="Add An Item"
        required
        className="border-b border-gray-300 focus:outline-none focus:border-b-black transition-colors duration-200"
      />
      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer border-b border-b-black ml-3"
      >
        {isPending ? "Adding..." : "Submit"}
      </button>
    </form>
  );
}
