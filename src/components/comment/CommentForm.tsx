"use client";
import Image from "next/image";
import {
  PaperAirplaneIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import {  useMemo, useState } from "react";
import { PostComment, updateComment } from "@/services/client/user/api";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import LoginButton from "../Login/LoginButton";
import { UseCommentType } from "@/hooks/useComment";

type CommentFormProps={
  state: UseCommentType
  formSmall:boolean
  initialMessage?:string
  parentId?:string
  setToggle?:React.Dispatch<React.SetStateAction<boolean>>
}
// NOTE: parentId เป็นตัว id ของ comment ที่เรากำลังตอบกลับหรือแก้ไข
export default function CommentForm({state,formSmall,initialMessage,parentId,setToggle}:CommentFormProps) {

  const { createLocalComment,updateLocalComment } = state;

  const { id: sheetId } = useParams() as { id: string };
  const { data: session } = useSession();

  const [message, setMessage] = useState<string>(initialMessage||"");
  const [loading, setLoading] = useState<boolean>(false);

  const userId = useMemo(() => {
    return session?.user.id as string;
  }, [session]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await PostComment(message, userId, sheetId,parentId);
      if (res.err) throw new Error("Cannot add comment");
      if (res.message === "Success") {
        createLocalComment(res.comment);
      }
    } catch (error) {
      toast.error(`${error} !!  🚀✖️`, { id: "1" });
    } finally {
      setMessage("");
      setLoading(false);
      setToggle&&setToggle(false);
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      if(!parentId) return;
      setLoading(true);
      const res = await updateComment(parentId,message);
      if (res.err) throw new Error("Cannot Edit comment");
      if (res.message === "Success") {
        updateLocalComment(parentId,message)
      }
    } catch (error) {
      toast.error(`${error} !!  🚀✖️`, { id: "1" });
    } finally {
      setMessage("");
      setLoading(false);
      setToggle&&setToggle(false);
    }
  };


  if (!userId) {
    return (
      <div className=" flex justify-center items-center ">
        <LoginButton
          content={"sign up to comment..."}
          Icon={ChatBubbleOvalLeftEllipsisIcon}
        />
      </div>
    );
  }

  return (
    <form className={` flex z-[ุ60]   ${formSmall ?" justify-start ":"justify-center xl:px-[3rem] min-w-[90%] "}`}>
      <div className={`flex bg-white py-3 gap-x-3 items-center border border-gray-200   ${formSmall ?"max-h-[3rem] min-w-[50%] rounded-lg ":"max-h-[4rem] shadow-xl min-w-full rounded-full"}  p-3`}>
        <Image
          src={session?.user.image || ""}
          alt="profile-image"
          width={100}
          height={100}
          className={`${formSmall ?"h-[2rem] w-[2rem]":" h-[2rem] w-[2rem] sm:h-[3rem] sm:w-[3rem] "} rounded-full z-[60]`}
        />
        <textarea
          placeholder="เขียนความคิดเห็น.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={` flex-1 resize-none border border-gray-200 ${formSmall ?"h-[2.4rem] text-sm w-[90%]":" h-[2.8rem] min-w-[60%] md:w-[80%] xl:w-[90%] "} 
                      p-2  rounded-2xl bg-gray-100`}
        ></textarea>
        {loading ? (
          <Image
            width={50}
            height={50}
            src={"/icons/spiner-loader.svg"}
            alt="loader"
            className=" sm:h-auto max-h-[35px] max-w-[35px] sm:w-auto"
          />
        ) : (
          <button
            className=" rounded-full  flex items-center justify-center  hover:bg-blue-50"
            type="submit"
            onClick={initialMessage ?handleUpdate:handleSubmit}
          >
            <PaperAirplaneIcon className={` text-blue-500  ${formSmall ?"w-[1.3rem] h-[1.3rem]":"w-[1.6rem] h-[1.6rem]" }`} />
          </button>
        )}
      </div>
    </form>
  );
}
