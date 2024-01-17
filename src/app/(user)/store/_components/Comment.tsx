"use client";
import CommentForm from "@/components/comment/CommentForm";
import { CommentType } from "../../../../../types/type";
import useComment from "@/hooks/useComment";
import RootComment from "@/components/comment/RootComment";
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  XMarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";

type CommentProps = {
  comments: CommentType[];
};

export default function Comment({ comments }: CommentProps) {
  const stateComment = useComment({ comments });
  const { rootComment } = stateComment;

  const [showContent, setShowContent] = useState<boolean>(true);

  return (
    <div
      id="comment"
      className="relative flex flex-col  bg-white rounded-xl  pb-4 max-h-[720px] overflow-y-scroll border-t border-gray-100"
    >
      <div className=" flex sticky items-center mb-6 p-3 rounded-xl top-0 right-0 left-0 z-40 bg-white shadow-md">
        <div className="flex flex-1 gap-x-3 items-center ">
          <ChatBubbleLeftRightIcon className="w-[3rem] h-[3rem] " />
          <p className=" text-lg sm:text-2xl font-semibold">Comment Here</p>
        </div>
        <div className="flex flex-1 justify-end px-6">
          <IconButton
            className="rounded-full h-[5rem] w-[5rem] shadow-xl hover:scale-110"
            onClick={() => setShowContent((prev) => !prev)}
          >
            {showContent ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
            )}
          </IconButton>
        </div>
      </div>
      <div className="mb-[1rem] px-3 sm:px-10 ">
        {rootComment &&
          rootComment.map((root) => (
            <RootComment
              key={root.id}
              rootComment={root}
              state={stateComment}
            />
          ))}
      </div>
      <div className=" min-w-full sticky bottom-0 left-0 right-0 opacity-100">
        {showContent && <CommentForm formSmall={false} state={stateComment} />}
      </div>
    </div>
  );
}
