"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Seller = {
  pen_name: string;
  full_name: string;
  phone: string;
  bank_name: string;
  bank_id: string;
  address: string;
  image: string;
};

const AddSeller = async (seller: Seller) => {
  const res = fetch("http://localhost:3000/api/seller", {
    method: "POST",
    body: JSON.stringify(seller),
    // @ts-ignore
    "Content-Type": "application/json",
    //   'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
  });
  return (await res).json();
};

export default function useRegisterSeller() {
  const { data: session, update, status } = useSession();

  const [seller, setSeller] = useState<Seller>({
    pen_name: "",
    full_name: "",
    phone: "",
    bank_name: "",
    bank_id: "",
    address: "",
    image: "",
  });

  useEffect(() => {
    // เมื่อ session มีค่าและ image ไม่ได้ถูกตั้งค่าใน state แล้ว
    if (status === "authenticated" && !seller.image) {
      // ดึงข้อมูลรูปภาพจาก session
      const userImage = session?.user?.image || "";

      // ตั้งค่า state
      setSeller((prevSeller) => ({
        ...prevSeller,
        image: userImage,
      }));
    }
  }, [session, seller, status]);

  async function updateUser(seller_id: string) {
    await update({
      ...session,
      user: {
        ...session?.user,
        role: "SELLER",
        sid: seller_id,
      },
    });
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const name = e.target.name;
    setSeller({
      ...seller,
      [name]: e.target.value,
    });
  };

  return {
    AddSeller,
    updateUser,
    handleInputChange,
    seller,
  };
}
