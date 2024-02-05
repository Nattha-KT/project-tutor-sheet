"use client";

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
  
  const FavoriteSheet = async ( SheetId: string) => {
    const res = fetch(`http://localhost:3000/api/favorite/${SheetId}`, {
      method: "POST",
      // @ts-ignore
      "Content-Type": "application/json",
    });
    return (await res).json();
  };

    
  const GetFavoriteSheet = async ( ) => {
    const res = await fetch(`http://localhost:3000/api/favorite`, {
      cache: "no-store",
      next: {
        tags: ["favorite"],
      },
    });
    const data = await res.json();
    return data.dataSheets;
  };

  

export {
    toggleCommentLike,
    UploadComplaint,
    deleteComment,
    updateComment,
    PostComment,
    FavoriteSheet,
    GetFavoriteSheet,
  };