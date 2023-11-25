'use client'
import { Button, Card, Input, List, message, Image, Progress } from 'antd'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import React, { useState ,useEffect} from 'react'
import { storage } from '../../../../../firebaseConfig'
import { number } from 'prop-types'
import { v4 as uuidv4 } from 'uuid';


const UploadImage = () => {
  // const [imageFile, setImageFile] = useState<File>()
  const [imageFileList, setImageFileList] = useState<File[]>([])
  const [downloadURL, setDownloadURL] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [buttonUpload, setButtonUpload] = useState(false)
  const [buttonDelete, setButtonDelete] = useState(false)
  const [progressUpload, setProgressUpload] = useState<number[]>([])


  // useEffect(() => {
  //   // Code that depends on the window object can be placed here
  //   // This code will only be executed on the client side
  //   import('@firebase/analytics').then((firebaseAnalytics) => {
  //     const analytics = firebaseAnalytics.getAnalytics();
  //     // Use the analytics object as needed here
  //   });
  // }, []);

  // const handleUploadImage = async () => {
  //   try {
  //     // if(sellerId == null) {throw new Error("Seller ID  is null!")}
  //     const imageName = imageFileList[0].name;
  //     const storageRefImage =  ref(storage, `images/cover-page/${imageName}`);
  //     const uploadTaskImage = uploadBytesResumable(storageRefImage, imageFileList[0]);
  //     await new Promise((resolve, reject) => {
  //       uploadTaskImage.on(
  //         'state_changed',
  //         () => {
  //           // Upload completed successfully
  //           getDownloadURL(uploadTaskImage.snapshot.ref)
  //             .then((url) => {
  //               console.log('Image available at', url);
  //               setDownloadURL(url)
  //               resolve(url);
  //             })
  //         }
  //       );
  //     });
  //   } catch (error:any) {
  //     message.error("Error!"+error.message);
  //     console.log("Error handleUploadImage: " + error.message);
  //     // throw new Error(error.message);
  //   }
  // };

  const handleUploadFile = async() => {

    setIsUploading(true)
    const uploadPromises = imageFileList.map((file_list,index)=>{
      
        const name = file_list.name
        const storageRef = ref(storage, `image/${name}`)
        const uploadTask = uploadBytesResumable(storageRef, file_list)

        return new Promise<void>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

       
            setProgressUpload(progressUpload => {
              const newProgressUpload = [...progressUpload]
              newProgressUpload[index] = progress;
              return newProgressUpload
            }) // to show progress upload

            if (progress === 100) {
              resolve(); // Resolve the promise when progress reaches 100
            }
  
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              //url is download url of file
              // console.log(uploadTask.snapshot.ref);
              setDownloadURL(url)
              console.log('File available at', url);
            })
          },
        )
      });
    })

    try {
      await Promise.all(uploadPromises); // Wait for all uploads to complete
      console.log('All uploads completed');
      // Proceed with further actions
    } catch (error) {
      message.error("Error while uploading");
    } finally {
      setIsUploading(false);
      setButtonDelete(true);
    }
  }

  const handleSelectedFile =  async(files: FileList | null) => {
    console.log(files);
    const validFiles: File[] = [];
    if (files){
    for(const [key, value] of Object.entries(files)){
      if (value?.size < 100000000) {
        // setImageFile(selectedFile);
        validFiles.push(value);
      } else {
        message.error('File size to large')
      }
    } 
    if (validFiles.length > 0) {
      if (imageFileList) {
        const newFileList = [...imageFileList, ...validFiles];
        await setImageFileList(newFileList);
        setButtonUpload(true);
      } else {
        setButtonUpload(false);
      }
    }
    // console.log(imageFileList)

  }
  }
  

  const handleRemoveFile = (index:number) => {
    const newList = [...imageFileList];
    newList.splice(index, 1);
    setImageFileList(newList)
    newList.length == 0 && setButtonUpload(false);

  }

  const progress = (index:number) :number => {
    if (progressUpload[index] == undefined){
      setProgressUpload(progressUpload=>[...progressUpload,0])
      return 0;
    }else {
      return progressUpload[index]
    }
      
  };

  return (
    <div className="container mt-5 px-20">
      <div className="col-lg-8 offset-lg-2">
      <span className="sr-only">Choose profile photo</span>
        <Input
          multiple
          type="file"
          placeholder="Select file to upload"
          accept="image/png"
          onChange={(files) => handleSelectedFile(files.target.files)}
          className='block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100'
        />

        <div className="mt-5 w-4/5 ">
          {/* {imageFileList && imageFileList?.map((image_File:any)=>( */}
          <Card>
            {imageFileList && imageFileList?.map((image_File:any,index:number)=>(
              <div  key={image_File.name} className='flex flex-col'>    
                <List.Item>
                  <List.Item.Meta
                    title={image_File.name}
                    description={`Size: ${image_File.size}`}
                  />
                 </List.Item>
                 <img src={URL.createObjectURL(image_File)} alt="" className='md:w-auto md:h-auto md:max-w-[150px] md:max-h-[150px] md:block rounded-lg' />

                <div className="text-right mt-2">
                  <Button
                    type="primary"
                    onClick={() => handleRemoveFile(index)}
                    className='bg-yellow-400 hover:bg-yellow-200'
                    disabled={(buttonDelete || isUploading)}
                  >
                    Delete
                  </Button>

                </div>
                <Progress percent={progress(index)} className=' my-5' />
              </div>
            ))}
            {downloadURL && (
              <>
                <Image
                  src={downloadURL}
                  alt={downloadURL}
                  style={{ width: 200, height: 200, objectFit: 'cover' }}
                />
                <p>{downloadURL}</p>
              </>
            )}
            <p></p>
          </Card>
         {buttonUpload && (
            <div className=' my-5'>
            <Button
              loading={isUploading}
              type="primary"
              onClick={handleUploadFile}
              className='bg-green-400'
              disabled={(buttonDelete || isUploading)}
            >
               Upload
            </Button>
            </div>
          )
         }
       
        </div>
      </div>
    </div>
  )
}

export default UploadImage