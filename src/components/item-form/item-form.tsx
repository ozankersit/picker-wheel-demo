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
    <form action={handleSubmit} className="basis-1/2 ml-auto">
      <input name="item" type="text" placeholder="Add An Item" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Submit"}
      </button>
    </form>
  )
}