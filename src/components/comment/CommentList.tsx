import React from "react";
import RootComment from "./RootComment";
import { CommentType } from "../../../types/type";

type CommentProps = {
  comments: CommentType[];
  getChild: (parentId:string) => {};
};

export default function CommentList({ comments,getChild }: CommentProps) {
  console.log(comments)
  
  return (
      comments.map((comment) => (
          <RootComment rootComment={comment}  />
      ))


    // <div className='overflow-y-scroll'>
    //     <Comment />
    // </div>
  );
}
