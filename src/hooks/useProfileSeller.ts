import { useCallback, useEffect, useState } from "react";
import { useDeleteSheet } from "./useDeleteSheet";
import toast from "react-hot-toast";
import { DeleteSellerByAdmin } from "@/services/client/admin/api";
import { getBanks } from "@/services/server/user/api";
type Banks = {
    id: string
    name: string
}

const useProfileSeller =(seller:any)=>{

    const [banks, setBank] = useState<Banks[]>([])
    const [confirmDelete,setConfirmDelete] =useState<boolean>(false)
    // console.log(confirmDelete)
    const {deleteFilesInDirectory}= useDeleteSheet();

    const handleDelete = async (sid:string)=> {
        try {
          toast.loading("Deleting request... 🚀👩🏾‍🚀", { id: "1" });
    
          const deleteSheetPromise = DeleteSellerByAdmin(sid);
          const deleteFilesPromise = deleteFilesInDirectory(`Seller/${sid}`);
      
          // Wait for both promises to complete
          await Promise.all([deleteFilesPromise,deleteSheetPromise]);
          toast.success("Deleted! 🚀✔️", { id: "1" });
          // Use a Promise-based setTimeout to make it asynchronous
          await new Promise((resolve) => setTimeout(resolve, 500));
          window.location.href="/admin/monitor-seller"
       
        } catch (error) {
          console.error("Error occurred during deletion Account Seller:", error);
          toast.error("Error occurred during deletion: DeleteSeller", { id: "1" });
        }
      };

    const fetchBank = useCallback(async()=>{
        const res = await getBanks()
        if(!res) return ;
        setBank(res)
    },[])
   
   
    useEffect(() => {
        fetchBank()
    }, [])

    useEffect(()=>{
        if(!confirmDelete) return
        const deleteNow =async()=>{
            await handleDelete(seller.id)
            setConfirmDelete(false);
        }
        deleteNow()
    },[confirmDelete])

    return {
        banks,
        setConfirmDelete,
    }
}

export default useProfileSeller