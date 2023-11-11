import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../../firebaseConfig";
import { message } from 'antd';
import { error } from "console";



export const useUploadFileAll = () => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageList, setImageList] = useState<File[]>([]);

  const handleUploadFile = async (fileToUpload: File,sid:string,sheetID:string) => {
    try {
      const fileName = fileToUpload.name;
      const storageRef = ref(storage, `${sid}/${sheetID}/file-pdf/${fileName}`);
      await uploadBytes(storageRef, fileToUpload);
      // console.log('File uploaded successfully');
    } catch (error) {
      message.error("Error uploading file");
    }
  };

  const handleUploadImage = async(imageUpload : File ,sid:string,sheetID:string)=>{
      try{
        const imageName = imageUpload.name;
        const storageRef = ref(storage,`${sid}/${sheetID}/cover-page/${imageName}`)
        await uploadBytes(storageRef, imageUpload)
        // console.log('cover page uploaded successfully');
      }catch (error) {
        message.error("Error can not upload image cover page")
      }
  }

  const handleUploadFileAll = async (sid:string,sheetID:string) => {
    if (!file) {
      message.error("File not found🚀✖️");
      return  true;
    }else if (!image){
      message.error("Cover page not found🚀✖️");
      return true;
    }

    await handleUploadFile(file,sid,sheetID);
    await handleUploadImage(image,sid,sheetID);

     imageList.map(async (image) => {
      try {
        const imageListName = image.name;
        const storageRef = ref(storage, `${sid}/${sheetID}/image-sample/${imageListName}`);
        await uploadBytes(storageRef, image);
      } catch (error) {
        message.error("Error uploading image sample page🚀✖️");
        return true;
      }
    });

  };

  return {
    handleUploadFileAll,
    file,
    setFile,
    imageList,
    setImageList,
    image,
    setImage,
  };
};
