import React from "react";
import {
  ref,
  uploadBytes,
  list,
  deleteObject,
  listAll,
} from "firebase/storage";
import { storage } from "../../firebaseConfig";

const DeleteSheet = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/sheets/by-id/${id}`, {
    method: "DELETE",
    // @ts-ignore
    "Content-Type": "application/json",
  });

  return (await res).json();
};

const deleteFilesInDirectory = async (path: string): Promise<void> => {
  //Example_path/Seller/sid/uuid/cover-page/money.png
  const storageRef = ref(storage, path);

  try {
    const items = await listAll(storageRef);

    // ==Note== ถ้าเข้ามาถึงไฟล์หลัก เช่น image-sample ก็จะไม่ทำงานเนื่องจาก prefixes(folder) Array(0) อย่าลืมเชคว่ามี items(files) ไหม
    for (const subdirectory of items.prefixes) {
      await deleteFilesInDirectory(subdirectory.fullPath);
    }

    //==Note== เมื่อไม่มี item(fild) ในpathนั้นก็จะ-map-ไม่ได้ ข้างในก็จะไม่ถูกทำ
    await Promise.all(
      items.items.map(async (item) => {
        await deleteObject(item);
      })
    );

    console.log(
      `Directory ${path} and its subdirectories deleted successfully`
    );
  } catch (error) {
    console.error("Error deleting files");
  }
};

export const useDeleteSheet = () => {
  return {
    DeleteSheet,
    deleteFilesInDirectory,
  };
};
