"use client";
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
  
  
export {
    toggleCommentLike,
  };