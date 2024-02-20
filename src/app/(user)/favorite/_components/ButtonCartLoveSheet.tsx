import useCartButton from "@/hooks/useCartButton";
import { ShoppingCartIcon as AddCart, BookOpenIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon as RemoveCart } from "@heroicons/react/24/solid";
import { Tooltip } from "@material-tailwind/react";
import { useSession } from "next-auth/react";

type ButtonCartType = {
  inCart: boolean;
  sheetId: string;
  owner: boolean;
};

export default function ButtonCartLoveSheet({
  inCart,
  sheetId,
  owner,
}: ButtonCartType) {
  const { data: session } = useSession();
  const { addToCart, handleClickAddCart } = useCartButton(
    session,
    inCart,
    sheetId
  );

  if(owner){
    return (
      <Tooltip
      content="in library"
      placement="top"
    >
      <button
        className=" flex items-center rounded-full hover:bg-white p-2 px-[0.9rem]"
        onClick={()=> window.location.href = "/my-library"}
      >
          <BookOpenIcon className=" h-5 w-5"/>
      </button>
    </Tooltip>
    )
  }

  return (
    <Tooltip
      content={`${addToCart ? "remove" : "add to cart"}`}
      placement="top"
    >
      <button
        className=" flex items-center rounded-full hover:bg-white p-2 px-[0.9rem]"
        onClick={() => handleClickAddCart()}
      >
        {addToCart ? (
          <RemoveCart className=" h-5 w-5" />
        ) : (
          <AddCart className=" h-5 w-5" />
        )}
      </button>
    </Tooltip>
  );
}
