"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { PencilSquareIcon,TrashIcon,ArrowUturnRightIcon,HandThumbUpIcon as Unlike, } from '@heroicons/react/24/outline'
import { HandThumbUpIcon as Like } from '@heroicons/react/24/solid'
import { CommentType } from '../../../types/type'
import IconButton from '../buttons/IconButton'
import { UseCommentType } from '@/hooks/useComment'
import { useSession } from 'next-auth/react'
import CommentForm from './CommentForm'
import { DialogDelete } from '../dialog'
import { toggleCommentLike } from '@/services/client/user/api'
import { v4 as uuidV4 } from 'uuid'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
})

type CommentProps = {
  state:UseCommentType
  childComment:CommentType
};

export default function ChildComment({childComment,state}: CommentProps) {

  const {getRepliesByParentId,handleDelete,toggleLocalCommentLike} = state
  const {data:session} = useSession()

  const [childs, setChildsComment] = useState<CommentType[]>([]);
  const [onShow, setOnShow] = useState<boolean>(false);
  const [toggleReply, setToggleReply] = useState<boolean>(false);
  const [toggleEdit,setToggleEdit] = useState<boolean>(false);
  const [deleteComment,setDeleteComment] = useState<boolean>(false);
  const [likeByMe, setLikeByMe] = useState<boolean>(childComment.likedByMe ? childComment.likedByMe:false);

  const parentId = useMemo<string>(() => childComment.id, [childComment]);
  const userId = useMemo(() => {
    return session?.user.id as string;
  }, [session]);

  const toggleFormLogic = useMemo<boolean>(() =>{
    return !((toggleReply&&toggleEdit)||!(toggleEdit||toggleReply));
  },[toggleEdit,toggleReply])

  
  const  handleToggleLike= async()=>{
    setLikeByMe((prev)=> !prev)
    const res = await toggleCommentLike(childComment.id)
    if(!res.like) {
      setLikeByMe((prev)=> !prev)
      return ;
    }
    toggleLocalCommentLike&& toggleLocalCommentLike(childComment.id,res.like.addLike)
  }



  useEffect(() => {
   if(parentId) {
    const child = getRepliesByParentId(parentId);
    setChildsComment(child);
   }
  }, [getRepliesByParentId]);

  useEffect(() => {
    if(!deleteComment) return
    const deleteNow=async()=>{
      handleDelete(childComment.id)
      setDeleteComment(false)
    }
    deleteNow()
  },[deleteComment])


  return (
    <div className="flex flex-col mb-1">
      <div className="border-l border-gray-100">
        <div className='flex gap-x-1 ml-[-1.15rem] '>
          <Image
            src={`${childComment.user?.image ||""}`}
            width={500}
            height={500}
            alt="profile-image-user"
            className=" rounded-full max-w-[2.2rem] max-h-[2.2rem]"
          />
          <div className=' flex flex-col'>
            <div className='bg-stone-100/60 rounded-xl font-normal text-sm px-2 py-[0.4rem] md:px-4 mr-auto border-x border-blue-100 '>
              <div className=" flex flex-col sm:flex-row gap-x-4 items-start mb-2">
                <span className=" text-md font-semibold">{childComment.user?.name}</span>
                <span className=" text-[0.6rem] sm:text-xs font-thin ">{`${dateFormatter.format(Date.parse(childComment.createdAt))}`}</span>
              </div>
              <p className='font-normal text-sm whitespace-pre-line '>{childComment.message}</p>
            </div>
            {userId?(
              <div className='flex gap-x-3 min-h-6 pl-4'>
                <div className=" flex items-center gap-x-[0.2rem]">
                  <div className=" text-blue-300">{childComment.likeCount}</div>
                 <IconButton Icon={likeByMe ?Like:Unlike}  aria-label={`${likeByMe ?"Like":"Unlike"}`} 
                  onClick={handleToggleLike}/>
                </div>
               { childComment.user?.id === userId &&(
               <>
                 <IconButton Icon={PencilSquareIcon}  aria-label='edit-button'  
                  customIcon= {` hover:text-amber-400  ${toggleEdit ? " scale-150  text-amber-400" : ""}`}
                  onClick={()=> {setToggleEdit((prev)=>!prev)}}
                  />
                  <IconButton Icon={TrashIcon}  aria-label='delete-button' customIcon=" hover:text-red-300 "
                   onClick={() =>(document.getElementById(`${childComment.id}`) as HTMLDialogElement).showModal()}
                  />
               </>)}
               <IconButton Icon={ArrowUturnRightIcon}  aria-label='reply-icon' 
                className={`  w-6 h-6 transform ${toggleReply ? " scale-x-[-1] ml-[-0.5rem] " : ""}  duration-300 ease-in `}
                customIcon={` transform ${toggleReply ? " text-green-900  duration-300 ease-in" : ""}    `}
                onClick={()=> {setToggleReply((prev)=>!prev)}}
                />
             </div>
            ):<div className=' mt-2'></div>}
            {toggleFormLogic && (
              <div className=" border-l pl-1 border-gray-100 ">
                {toggleReply ?(
                <CommentForm setToggle={setToggleReply} parentId={parentId} formSmall={true} state={state} />
                ):
                <CommentForm setToggle={setToggleEdit} initialMessage={childComment.message} parentId={parentId} formSmall={true} state={state} />
                }
              </div>
            )}
          </div> 
        </div>
        {onShow && (
          <div className='pl-10  mb-2'>
          { childs && childs.map((child)=>(
            <ChildComment key={uuidV4()}  childComment={child} state={state}/>
          ))}
          </div>
        )}
        {childs && (
          <div className="flex justify-start pl-6 mb-2">
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
      <DialogDelete name_id={`${childComment.id}`} title="Comment" setDeleted={setDeleteComment}/>
    </div>
  );
}