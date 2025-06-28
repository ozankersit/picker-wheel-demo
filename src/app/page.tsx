import { clearList } from "@/components/item-actions/action";
import ItemForm from "@/components/item-form/item-form";
import ItemList from "@/components/item-list/item-list";
import Wheel from "@/components/wheel/wheel";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const wheelItems = cookieStore.get("wheelItems");

  let items: string[] = [];
  if (wheelItems?.value && wheelItems.value.trim() !== "") {
    try {
      items = JSON.parse(wheelItems.value);
    } catch (error) {
      console.error("Invalid JSON in wheelItems cookie:", error);
    }
  }

  return (
    <div className="flex container md:px-0 px-5 py-3 md:flex-row flex-col-reverse mx-auto md:items-start items-stretch gap-5">
      <div className="basis-1/2">
        <Wheel items={items} />
      </div>
      <div className="flex flex-col basis-1/2 gap-3 w-full">
        <ItemForm />
        <div className="flex justify-between items-center">
          <p className="font-bold text-3xl font-mono">List</p>
          <button onClick={clearList} className="underline cursor-pointer">Clear All List</button>
        </div>
        {items.length > 0 && <ItemList items={items} />}
      </div>
    </div>
  );
}
