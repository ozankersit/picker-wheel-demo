"use client"
import { useTransition } from "react";
import { deleteItem } from "../item-actions/action";

type Props = {
  items: string[];
};

export default function ItemList({ items }: Props) {
    const [isPending, startTransition] = useTransition();

  const handleDelete = (index: number) => {
    startTransition(async () => {
      await deleteItem(index);
    });
  };
  return (
    <>
      {items.map((item: string, index: number) => (
        <div
          key={index}
          className="bg-white p-4 rounded shadow mb-2 w-full flex justify-between items-center"
        >
          <p className="text-gray-800">{item}</p>
          <span onClick={() => handleDelete(index)}>X</span>
        </div>
      ))}
    </>
  );
}
