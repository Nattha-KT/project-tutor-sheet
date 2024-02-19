"use client";
import { DeleteComplaint, DeleteSheets, UpdateStatusSheets } from "@/services/client/admin/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Seller } from "../../types/type";
import { useDeleteSheet } from "./useDeleteSheet";
import useFile from "./useFile";

type Sheet= {
    id: string;
    course_code: string;
    name: string;
    semester: string;
    type: string;
    year: string;
    price: number;
    status_approve?: boolean;
    num_page: number;
    class_details: string;
    content_details: string;
    suggestion?: string;
    cover_page: string;
    date: string;
    samples_page: string[];
    file_path: string;
    seller:Seller
  }

const useApprove = (sheets: Sheet[]) => {

  const [listChoise, setListChoise] = useState<string[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [tabControl, settabControl] = useState("all");
  const [filteredSheets, setFilteredSheets] = useState<Sheet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupUrl, setGroupUrl] = useState<Record<string, string>>({});


  const {deleteFilesInDirectory}= useDeleteSheet();
  const  {getUrlFile} = useFile()
  

  const isMainCheckboxChecked = listChoise.length === sheets.length;

  const handleFilter = (tabControl: string, dataSheets: Sheet[]) => {
    const filter = dataSheets.filter((sheet) => {
      if (tabControl === "all" || sheet.status_approve!.toString() === tabControl) {
        return sheet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sheet.course_code.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });

    setFilteredSheets(filter);
    return filter;
  };

  useEffect(() => {
    handleFilter(tabControl, sheets);

  }, [searchTerm, tabControl, sheets]);


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
      const allIds = sheets.map((data) => data.id);
      setListChoise(allIds);
    }
  };

  const onDeleteStateApprove= (id: string[]) => {
    setFilteredSheets((prev) => {
      return prev.filter((data) => !id.includes(data.id));
    });
    setListChoise([])
  };

  const onUpdateStatus = (id: string[]) => {
    setFilteredSheets((prev) => {
       return prev.map((sheet) => {
        if(id.includes(sheet.id)){return {...sheet,status_approve: true}}
        return sheet
       } );
    });
    setListChoise([])
  };
  
  const deleteFileStorage = async () => {
    // Use filter instead of map to get the relevant sheets
    const selectedSheets = sheets.filter((sheet) => listChoise.includes(sheet.id));

    // Use Promise.all for parallel processing
    await Promise.all(
        selectedSheets.map(async (sheet) => {
            if (sheet.file_path) {
                await deleteFilesInDirectory(sheet.file_path);
            }
        })
    );
};

const handleDeleteSelected = async () => {
    try {
        toast.loading("Deleting request... 🚀👩🏾‍🚀", { id: "1" });

        // Use Promise.all to wait for both promises to complete
        await Promise.all([deleteFileStorage(), DeleteSheets(listChoise)]);

        // Add a short delay to ensure a smoother user experience
        await new Promise((resolve) => setTimeout(resolve, 500));

        toast.success("Deleted! 🚀✔️", { id: "1" });
        onDeleteStateApprove(listChoise);
    } catch (err) {
        console.error("Error during batch delete", err);
        toast.error("Error occurred during deletion", { id: "1" });
    }
};

  const handleUpdateStatus = async () => {
    try {
      toast.loading("Update request... 🚀👩🏾‍🚀", { id: "1" });
      const res = await UpdateStatusSheets(listChoise);
      if (res.message !== "Success") {
        toast.error("Error Cannot Update status sheet", { id: "1" });
      } else {
        toast.success("Deleted! 🚀✔️", { id: "1" });
        onUpdateStatus(listChoise);
      }
    } catch (err) {
      console.error("Error during batch delete");
      toast.error("Error occurred during Update", { id: "1" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const promises = sheets.map(async (sheet) => {
        const url = await getUrlFile(`${sheet.file_path}/file-pdf`);
        return { [sheet.id]: url || "" };
      });

      const results = await Promise.all(promises);
      const group = Object.assign({}, ...results);
      
      setGroupUrl(group);
    };

    fetchData();
  }, [sheets]);


  useEffect(() => {
    if (!confirmDelete) return;
    const deleteNow = async () => {
      await handleDeleteSelected();
      setConfirmDelete(false);
    };
    deleteNow();
  }, [confirmDelete]);

  return {
    filteredSheets,
    listChoise,
    isMainCheckboxChecked,
    searchTerm,
    tabControl,
    groupUrl,
    settabControl,
    setSearchTerm,
    setConfirmDelete,
    handleCheckboxChange,
    handleMainCheckboxChange,
    handleUpdateStatus,
  };
};
export default useApprove;
