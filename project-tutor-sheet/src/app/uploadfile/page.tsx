'use client'
import { Button, Card, Input, List, message, Image, Progress } from 'antd'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import React, { useState } from 'react'
import { storage } from '../../../firebaseConfig'
import { number } from 'prop-types'



const UploadImageToStorage = () => {
  // const [imageFile, setImageFile] = useState<File>()
  const [imageFileList, setImageFileList] = useState<File[]>([])
  const [downloadURL, setDownloadURL] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [buttonUpload, setButtonUpload] = useState(false)
  const [buttonDelete, setButtonDelete] = useState(false)
  const [progressUpload, setProgressUpload] = useState<number[]>([])


  

  const handleSelectedFile = (files: FileList | null) => {
    if (files && files[0]?.size < 10000000) {
      const selectedFile = files[0];
      // setImageFile(selectedFile);

      if (imageFileList) {
        setImageFileList([...imageFileList, selectedFile]);
        setButtonUpload(true);
      } else {
        setButtonUpload(false);
      }
      
      // console.log(imageFileList)
    } else {
      message.error('File size to large')
    }
  }

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
          // () => {
          //   getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          //     //url is download url of file
          //     setDownloadURL(url)
          //     console.log('File available at', url);
          //   })
          // },
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
              <div  key={image_File.name}>    
                <List.Item>
                  <List.Item.Meta
                    title={image_File.name}
                    description={`Size: ${image_File.size}`}
                  />
                 </List.Item>

                <div className="text-right mt-3 ">
                  <Button
                    type="primary"
                    onClick={() => handleRemoveFile(index)}
                    className='bg-yellow-400 hover:bg-yellow-200'
                    disabled={(buttonDelete || isUploading)}
                  >
                    Delete
                  </Button>

                  <Progress percent={progress(index)} className=' my-5' />
                </div>
              </div>
            ))}
            {/* {downloadURL && (
              <>
                <Image
                  src={downloadURL}
                  alt={downloadURL}
                  style={{ width: 200, height: 200, objectFit: 'cover' }}
                />
                <p>{downloadURL}</p>
              </>
            )} */}
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

export default UploadImageToStorage