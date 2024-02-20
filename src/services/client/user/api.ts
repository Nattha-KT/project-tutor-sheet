"use client";

import { SheetCartProps } from "@/hooks/useCart";
import { Help } from "../../../../types/type";


const toggleCommentLike = async (id: string) => {
    const res = fetch(`http://localhost:3000/api/comments/${id}`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({}),
      // @ts-ignore
      "Content-Type": "application/json",
    });
    return (await res).json();
  };

  const UploadComplaint = async (help: Help, userId: string) => {
    const res = fetch("http://localhost:3000/api/help", {
      method: "POST",
      body: JSON.stringify({ help, userId }),
      // @ts-ignore
      "Content-Type": "application/json",
    });
    return (await res).json();
  };
  
  const deleteComment = async (id: string) => {
    const res = fetch(`http://localhost:3000/api/comments/${id}`, {
      method: "DELETE",
      // @ts-ignore
      "Content-Type": "application/json",
    });
    return (await res).json();
  };
  
  const updateComment = async (id: string, message: string) => {
    const res = fetch(`http://localhost:3000/api/comments/${id}`, {
      method: "PUT",
      body: JSON.stringify({ id, message }),
      // @ts-ignore
      "Content-Type": "application/json",
    });
    return (await res).json();
  };

  const PostComment = async (
    message: string,
    userId: string,
    sheetId: string,
    parentId?: string
  ) => {
    const res = fetch("http://localhost:3000/api/comments", {
      method: "POST",
      body: JSON.stringify({ message, userId, sheetId, parentId }),
      // @ts-ignore
      "Content-Type": "application/json",
    });
    return (await res).json();
  };
  
  const addFavoriteSheet = async ( SheetId: string) => {
    const res = fetch(`http://localhost:3000/api/favorite/${SheetId}`, {
      method: "POST",
      // @ts-ignore
      "Content-Type": "application/json",
    });
    return (await res).json();
  };

    
  const getFavoriteSheet = async ( ) => {
    const res = await fetch(`http://localhost:3000/api/favorite`, {
      cache: "no-store",
      next: {
        tags: ["favorite"],
      },
    });
    const data = await res.json();
    return data.dataSheets;
  };

  const getSheetsInCart = async ( ) => {
    const res = await fetch(`http://localhost:3000/api/cart`, {
      next: {
        tags: ["cart"],
      },
    });
    const data = await res.json();
    return data.dataSheets;
  };

  const deleteSheetCart = async (id: string) => {
    const res = fetch(`http://localhost:3000/api/cart/${id}`, {
      method: "DELETE",
      // @ts-ignore
      "Content-Type": "application/json",
    });
    return (await res).json();
  };

    
  const addSheetToCart = async ( SheetId: string) => {
    const res = fetch(`http://localhost:3000/api/cart/${SheetId}`, {
      method: "POST",
      // @ts-ignore
      "Content-Type": "application/json",
    });
    return (await res).json();
  };

  const checkout = async (checkList:SheetCartProps[]) => {
    await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: checkList }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.url) {
          window.location.href = response.url;
          // console.log(response.url);
        }
      });
  };

  const getOrder = async ( ) => {
    const res = await fetch('http://localhost:3000/api/order', {
      next: {
        tags: ["order"],
      },
    });
    const data = await res.json();
    return data.order;
  };

  const getOrderById = async (orderId:string ) => {
    const res = await fetch(`http://localhost:3000/api/order/${orderId}`, {
      cache: "no-store",
      next: {
        tags: ["order"],
      },
    });
    const data = await res.json();
    return data.order;
  };

  const deleteOrderStatusOpen = async (id: string) => {
    const res = fetch(`http://localhost:3000/api/order/${id}`, {
      method: "DELETE",
      // @ts-ignore
      "Content-Type": "application/json",
    });
    return (await res).json();
  };

  const giveRatingStar = async ( seller:any,products:any,orderId:string) => {
    const res = fetch('http://localhost:3000/api/rating', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sellerRating: seller, productsRating: products,orderId}),
    });
    return (await res).json();
  };

  const getMyLibrary = async () => {
    const res = await fetch("http://localhost:3000/api/my-library/", {
      cache: "no-store",
      next: {
        tags: ["library"],
      },
    });
    const data = await res.json();
    return data.orders;
  };

  

export {
    toggleCommentLike,
    UploadComplaint,
    deleteComment,
    deleteOrderStatusOpen,
    deleteSheetCart,
    updateComment,
    PostComment,
    addFavoriteSheet,
    getFavoriteSheet,
    addSheetToCart,
    getSheetsInCart,
    checkout,
    getOrder,
    getOrderById,
    giveRatingStar,
    getMyLibrary,
  };