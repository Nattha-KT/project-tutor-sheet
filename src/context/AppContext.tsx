"use client";

import { getSheetsInCart } from "@/services/client/user/api";
import React, { createContext, useContext, useEffect, useState } from "react";

type AppWrapperTpe ={
    countCart:number,
    setCountCart: React.Dispatch<React.SetStateAction<number>>
}

const AppContext = createContext<AppWrapperTpe>({
    countCart: 0,
    setCountCart:()=>{}
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [countCart, setCountCart] = useState<number>(0);

  useEffect(()=>{
    const fetchCart = async()=>{
        const res = await getSheetsInCart()
       if(!res) {
        setCountCart(0)
        return
       }
       setCountCart(res.length)
    }
    fetchCart()
  })

  return (
    <AppContext.Provider
      value={{
        countCart,
        setCountCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
