"use client";
import { DeleteComplaint } from "@/services/client/admin/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type UserProps = {
  name: string;
  image: string;
  role: string;
};

type ComplaintProps = {
  id: string;
  createdAt: string;
  userId: string;
  head: string;
  category: string;
  content: string;
  role: string;
  level: string;
  user: UserProps;
};

const useComplaint = (complaint: ComplaintProps[]) => {
  const [listChoise, setListChoise] = useState<string[]>([]);
  const [complaintList, setComplaintList] = useState<ComplaintProps[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const isMainCheckboxChecked = listChoise.length === complaint.length;

  const handleCheckboxChange = (id: string) => {
    setListChoise((prevList) => {
      if (prevList.includes(id)) {
        return prevList.filter((item) => item !== id);
      } else {
        return [...prevList, id];
      }
    });
  };
  const handleMainCheckboxChange = () => {
    if (isMainCheckboxChecked) {
      setListChoise([]);
    } else {
      const allIds = complaint.map((data) => data.id);
      setListChoise(allIds);
    }
  };

  const onDeleteStateComplaint = (id: string[]) => {
    setComplaintList((prev) => {
      return prev.filter((data) => !id.includes(data.id));
    });
    setListChoise([])
  };

  const handleDeleteSelected = async () => {
    try {
      toast.loading("Deleting request... 🚀👩🏾‍🚀", { id: "1" });
      const res = await DeleteComplaint(listChoise);
      if (res.message !== "Success") {
        toast.error("Error Cannot delete complaint", { id: "1" });
      } else {
        toast.success("Deleted! 🚀✔️", { id: "1" });
        onDeleteStateComplaint(listChoise);
      }
    } catch (err) {
      console.error("Error during batch delete");
      toast.error("Error occurred during deletion", { id: "1" });
    }
  };

  useEffect(() => {
    setComplaintList(complaint);
  }, [complaint]);

  useEffect(() => {
    if (!confirmDelete) return;
    const deleteNow = async () => {
      await handleDeleteSelected();
      setConfirmDelete(false);
    };
    deleteNow();
  }, [confirmDelete]);

  return {
    complaintList,
    listChoise,
    isMainCheckboxChecked,
    setConfirmDelete,
    handleCheckboxChange,
    handleMainCheckboxChange,
  };
};
export default useComplaint;
