import ItemForm from "@/components/item-form/item-form";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const wheelItems = cookieStore.get("wheelItems");

  return (
    <>
      <ItemForm/>
      { wheelItems && JSON.parse(wheelItems.value)}
    </>
    
  );
}
