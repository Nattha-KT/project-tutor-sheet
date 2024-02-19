"use client";
import { useAppContext } from "@/context/AppContext";
import { addSheetToCart } from "@/services/client/user/api";
import { useState } from "react";
import toast from "react-hot-toast";


const useCartButton = (session: any, inCart: boolean, sheetId: string) => {
  const [addToCart, setAddToCart] = useState<boolean>(inCart);
  const {setCountCart}  = useAppContext()

  const handleClickAddCart = async () => {
    if (!session) {
      toast.error("Please log in", { id: "1" });
      return;
    }
    setAddToCart((prev) => !prev);
   
    const res = await addSheetToCart(sheetId);
    if (res.message !== "Success") {
      toast.error("Can not aad to cart", { id: "1" });
      return;
    } else {

     if( !addToCart){
        setCountCart((prev) => prev+1);
        // toast.success("🛒🎉Success!", { id: "1" })
     }else{
       setCountCart((prev) => prev-1);
        // toast.success("🗑️🎊Remove Success!", { id: "1" });
     }   
    }
  };

  return {
    handleClickAddCart,
    addToCart,
  };
};

export default useCartButton;
