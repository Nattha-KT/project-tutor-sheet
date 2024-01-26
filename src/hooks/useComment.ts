"use client";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CommentType } from "../../types/type";
import { deleteComment } from "@/services/client/user/api";
import toast from "react-hot-toast";

type CommentProps = {
  comments: CommentType[];
};

const useComment = ({ comments }: CommentProps) => {
  const [listComment, setListComment] = useState<CommentType[]>([]);
  const [groupComment, setGroupComment] =
    useState<Record<string, CommentType[]>>();
  const [rootComment, setRootComment] = useState<CommentType[]>([]);
  const [replyId, setRepltId] = useState<string>("");

  const groupParentId = () => {
    const group: Record<string, CommentType[]> = {};
    listComment.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
      if (comment.parentId === null) {
        setRootComment(group[comment.parentId]);
      }
    });
    setGroupComment(group);
  };

  useEffect(() => {
    if (comments == null) return;
    setListComment(comments);
  }, [comments]);

  useEffect(() => {
    groupParentId();
  }, [listComment]);

  const getRepliesByParentId = useCallback(
    (parentId: string) => {
      if (groupComment == null) return [];
      return groupComment[parentId];
    },
    [groupComment]
  );

  const getRepliesById = useCallback(
    (id: string) => {
      if (listComment == null) return null;
      const foundComment = listComment.find((comment) => comment.id === id);
      return foundComment ? foundComment.message : null;
    },
    [listComment]
  );

  function createLocalComment(comment: CommentType) {
    setListComment((prevComments) => {
      return [comment, ...prevComments];
    });
  }

  function updateLocalComment(id: string, message: string) {
    setListComment((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, message };
        } else {
          return comment;
        }
      });
    });
  }

  const handleDelete = async (cid: string) => {
    try {
      const res = await deleteComment(cid);
      if (res.err) throw new Error("Cannot add comment");
      if (res.message === "Success") {
        setListComment((prevComments) => {
          return prevComments.filter((comment) => comment.id !== cid);
        });
        toast.success(`Deletd!!`, { id: "1" });
      }
    } catch (error) {
      toast.error(`${error} !!  🚀✖️`, { id: "1" });
    }
  };

  function toggleLocalCommentLike(id: string, addLike: boolean) {
    setListComment((prevComments) => {
      return prevComments.map((comment) => {
        if (id === comment.id) {
          if (addLike) {
            return {
              ...comment,
              likeCount: comment.likeCount! + 1,
              likedByMe: true,
            };
          } else {
            return {
              ...comment,
              likeCount: comment.likeCount! - 1,
              likedByMe: false,
            };
          }
        } else {
          return comment;
        }
      });
    });
  }

  return {
    createLocalComment,
    getRepliesByParentId,
    setRepltId,
    getRepliesById,
    updateLocalComment,
    toggleLocalCommentLike,
    replyId,
    rootComment,
    handleDelete,
  };
};

export default useComment;

export type UseCommentType = {
  createLocalComment: (comment: CommentType) => void;
  handleDelete: (cid: string) => Promise<void>;
  getRepliesByParentId: (parentId: string) => CommentType[];
  setRepltId: React.Dispatch<SetStateAction<string>>;
  getRepliesById?: (id: string) => string | null;
  updateLocalComment: (id: string, message: string) => void;
  toggleLocalCommentLike?:(id: string, addLike: boolean) => void,
  rootComment: CommentType[];
  replyId: string;
};
