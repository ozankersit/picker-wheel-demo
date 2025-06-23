"use client"

import { useTransition } from "react"
import { setItems } from "../item-actions/action"

export default function ItemForm() {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    const newItem = formData.get("item") as string

    if (newItem.trim()) {
      startTransition(async () => {
        await setItems(newItem.trim())
      })
    }
  }

  return (
    <form action={handleSubmit}>
      <input name="item" type="text" placeholder="Yeni item girin..." required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Ekleniyor..." : "Ekle"}
      </button>
    </form>
  )
}