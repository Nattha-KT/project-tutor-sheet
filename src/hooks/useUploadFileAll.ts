'use client'
import { cache, useEffect, useState } from "react";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from "../../firebaseConfig";
import { message } from 'antd';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

type Sheet={
  course_code:string,
  name:string,
  semester:string,
  type:string,
  year: string,
  price:number,
  num_page: number,
  class_details:string,
  content_details:string,
  cover_page: string,
  samples_page: string[],
  file_path:string,
  sid:string,
}


export const useUploadFileAll = (sellerId:string) => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageList, setImageList] = useState<File[]>([]);
  const [success,setSuccess] = useState<boolean>(false)
  const [initialRender, setInitialRender] = useState(true);
  // const [urlListImage, setUrlListImage] = useState<string[]>([]);
  // const [urlImage, setUrlImage] = useState<string>();
  const [sheet,setSheet] = useState<Sheet>({
        course_code:"",
        name:"",
        semester:"",
        type:"",
        year: "",
        price:0,
        num_page: 0,
        class_details:"",
        content_details:"",
        cover_page: "",
        samples_page: [],
        file_path:"",
        sid:sellerId,
    });


    useEffect(() => {
      if (initialRender) {
        setInitialRender(false);
        return; // Skip the rest of the code for the initial render
      }
      console.log('sheet has changed:', sheet);
      handleUploadSheet();
    }, [success]);

  const handleUploadFile = async (fileToUpload: File,  uuid: string) => {
    try {
      if(sellerId == null) {throw new Error("Seller ID  is null!")}
      const fileName = fileToUpload.name;
      const storageRef = ref(storage, `Seller/${sellerId}/${uuid}/file-pdf/${fileName}`);
      await uploadBytes(storageRef, fileToUpload);
    } catch (error:any) {
      message.error("Error uploading file");
      throw new Error("Error handleUploadFile: " + error.message);
    }
  };

  const handleUploadImage = async (imageUpload: File,  uuid: string) => {
    try {
      if (sellerId == null) {
        throw new Error("Seller ID is null!");
      }
  
      const imageName = imageUpload.name;
      const storageRefImage =  ref(storage, `Seller/${sellerId}/${uuid}/cover-page/${imageName}`);
      const uploadTaskImage = uploadBytesResumable(storageRefImage, imageUpload);
  
      await new Promise<void>((resolve, reject) => {
        uploadTaskImage.on(
          'state_changed',
          null,
          (error) => {
            console.error("Error during upload", error);
            // reject(error);
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTaskImage.snapshot.ref);
              console.log('Image available at', url);
              setSheet((prev) => ({ ...prev, cover_page: url }));
              resolve();
            } catch (error) {
              console.error("Error getting download URL", error);
              reject(error);
            }
          }
        );
      });
  
    } catch (error) {
      console.log("Error handleUploadImage: " + error);
    }
  };
  

  const handleUploadSampleImage = async (imageList: File[], uuid: string) => {
    try {
      if (sellerId == null) {
        throw new Error("Seller ID is null!");
      }
      
      const uploadPromises = imageList.map(async (image,index) => {
        const imageListName = image.name;
        const storageRef = ref(storage, `Seller/${sellerId}/${uuid}/image-sample/${imageListName}`);
        const uploadTaskSample = uploadBytesResumable(storageRef, image);
          
        return new Promise((resolve, reject) => {
          uploadTaskSample.on(
            'state_changed',
            null,
            (error) => {
              console.error("Error during upload", error);
              // reject(error);
            },
             async() => {
              // Upload completed successfully, get the download URL
              try{
               await getDownloadURL(uploadTaskSample.snapshot.ref)
                .then((url) => {
                  console.log("sampleURL: " + url);
                  setSheet((prev) => ({ ...prev, samples_page: [...prev.samples_page,url] }));
                  resolve(url);
                })
              }catch(error){
                console.error("Error getting download URL", error);
                // reject(error);
              }
            }
          );
        })
      
      });
      await Promise.all(uploadPromises);
      setSuccess(true);
    } catch (error) {
      console.error("Error handleUploadSampleImage: " + error);
    }
  };
  

  const handleUploadFileAll = async () => {

    try {
      const uuid =sheet.file_path.split('/')[2]
      if (!file) {
        throw new Error("File not found");
      }
      if (!image) {
        throw new Error("Cover page not found");
      }
      if (!imageList.length) {
        throw new Error("Sample page not found");
      }

      await handleUploadFile(file,  uuid);
      await handleUploadImage(image, uuid);
      await handleUploadSampleImage(imageList, uuid).then(() => { setSuccess(true);});
     

    } catch (error:any) {
      // throw new Error(`Error!!: ${error.message}`)
      return "Error: Cannot upload file all";
    }
    return "Success";
  };


  const AddNewSheet = async (sheet:Sheet) => {
    try {
      const response = await axios.post("http://localhost:3000/api/sheets", sheet, {
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  };

  const handleUploadSheet = async () => {

    try {
      const res = await AddNewSheet(sheet);
      if (!res.data) {throw  new Error("Error: "+res.message);}
    } catch (error:any) {
      // Handle any other errors that might occur
      console.error('Error:', error);
      return error.message;
    }
  };
  


  return {
    handleUploadFileAll,
    file,
    setFile,
    sheet,
    setSheet,
    imageList,
    setImageList,
    image,
    setImage,
  };
};
