"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  HandThumbUpIcon as Unlike,
  PencilSquareIcon,
  TrashIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";
import { HandThumbUpIcon as Like } from "@heroicons/react/24/solid";
import { CommentType } from "../../../types/type";
import ChildComment from "./ChildComment";
import IconButton from "../IconButton";
import { UseCommentType } from "@/hooks/useComment";
import { useSession } from "next-auth/react";
import CommentForm from "./CommentForm";
import { DialogDelete } from "../dialog";
import { toggleCommentLike } from "@/services/client/user/api";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

type CommentProps = {
  state:UseCommentType
  rootComment:CommentType
};

const testSession = async () => {
  const res = fetch(`http://localhost:3000/api/test/`, {
    method: "GET",
    cache: "no-store",
   // @ts-ignore
   "Content-Type": "application/json",
  });
  return (await res).json();
};


export default function RootComment({state,rootComment}: CommentProps) {

  const {getRepliesByParentId,handleDelete,toggleLocalCommentLike} = state
  const { data: session } = useSession();
  const [onShow, setOnShow] = useState<boolean>(false);
  const [toggleReply, setToggleReply] = useState<boolean>(false);
  const [toggleEdit,setToggleEdit] = useState<boolean>(false);
  const [deleteComment,setDeleteComment] = useState<boolean>(false);
  const [childComment, setChildComment] = useState<CommentType[]>([]);


  const rootId = useMemo<string>(() => rootComment.id, [rootComment]);
  const userId = useMemo(() => {
    return session?.user.id as string;
  }, [session]);

  const toggleFormLogic = useMemo<boolean>(() =>{
    return !((toggleReply&&toggleEdit)||!(toggleEdit||toggleReply));
  },[toggleEdit,toggleReply])

  const  handleToggleLike= async()=>{
    const res = await toggleCommentLike(rootComment.id)
    // console.log(res);
    if(!res.like) return ;
    toggleLocalCommentLike && toggleLocalCommentLike(rootComment.id,res.like.addLike)
  }


  useEffect(() => { 
    const child = getRepliesByParentId(rootId);
    setChildComment(child);
  }, [getRepliesByParentId]);

  useEffect(() => {
    if(!deleteComment) return
    const deleteNow=async()=>{
      handleDelete(rootComment.id)
      setDeleteComment(false)
    }
    deleteNow()
  },[deleteComment])

  return (
    <div className="flex flex-col">
      <div className="flex gap-x-3">
        <Image
          src={`${rootComment.user?.image || ""}`}
          width={500}
          height={500}
          alt="profile-image-user"
          className=" rounded-full max-w-[2.8rem] max-h-[2.8rem] z-0"
        />
        <div className=" flex gap-x-4 items-center">
          <span className=" text-base font-semibold">
            {rootComment.user?.name}
          </span>
          <span className=" text-xs font-thin ">{`${dateFormatter.format(
            Date.parse(rootComment.createdAt)
          )}`}</span>
        </div>
      </div>
      <div className=" flex flex-col border-l border-gray ml-[1.35rem] px-5 mt-[-7px]">
        <div className="flex flex-col gap-y-0 ">
          <div className="bg-blue-50/70 whitespace-pre-line rounded-xl border-x border-blue-100  font-normal text-sm px-2 py-3  md:px-3 mr-auto  ">
            {rootComment.message}
          </div>
          {userId&&(
            <div className='flex gap-x-3 min-h-6 pl-2'>
              <div className=" flex items-center gap-x-[0.2rem]">
                <div className=" text-blue-300">{rootComment.likeCount}</div>
                <IconButton Icon={rootComment.likedByMe ?Like:Unlike}  aria-label={`${rootComment.likedByMe ?"Like":"Unlike"}`} 
                  onClick={handleToggleLike}
                />
              </div>
              { rootComment.user?.id === userId &&(
              <>
              <IconButton Icon={PencilSquareIcon}  aria-label='edit-button'  
                customIcon= {` hover:text-amber-400  ${toggleEdit ? " scale-150  text-amber-400" : ""}`}
                onClick={()=> {setToggleEdit((prev)=>!prev)}}
              />
              <IconButton Icon={TrashIcon}  aria-label='delete-button' customIcon=" hover:text-red-300 "
                onClick={() =>(document.getElementById(`${rootComment.id}`) as HTMLDialogElement).showModal()}
              />
              </>)}
              <IconButton Icon={ArrowUturnRightIcon}  aria-label='reply-icon' 
              className={`  w-6 h-6 transform ${toggleReply ? " scale-x-[-1] ml-[-0.5rem] " : ""}  duration-300 ease-in `}
              customIcon={` transform ${toggleReply ? " text-green-900  duration-300 ease-in" : ""}    `}
              onClick={()=> {setToggleReply((prev)=>!prev)}}
              />
              
            </div>
          )}
        </div>
        {toggleFormLogic && (
          <div className=" border-l pl-1 border-gray-100 ">
            {toggleReply ?(
            <CommentForm setToggle={setToggleReply} parentId={rootId} formSmall={true} state={state} />
            ):
            <CommentForm setToggle={setToggleEdit} initialMessage={rootComment.message} parentId={rootId} formSmall={true} state={state} />
            }
          </div>
        )}
        {onShow && (
          <div className="ml-4 mt-1 pt-2">
            {childComment &&
              childComment.map((comment, index) => (
                <ChildComment key={comment.id} childComment={comment} state={state}/>
              ))}
          </div>
        )}
        {childComment && (
          <div className="flex justify-start">
            <button
              className=" text-sm text-gray-500 font-normal underline  underline-offset-1 hover:font-medium"
              onClick={() => {
                setOnShow((prev) => {
                  return !prev;
                });
              }}
            >
              {onShow ? "close" : "more comment..."}
            </button>
          </div>
        )}
      </div>
      <DialogDelete name_id={`${rootComment.id}`} title="Comment" setDeleted={setDeleteComment}/>
    </div>
  );
}
