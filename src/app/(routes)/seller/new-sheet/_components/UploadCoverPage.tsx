'use client'
import { Button, Card, Input, List, message, Image, Progress } from 'antd'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import React, { useState ,useEffect} from 'react'
import { storage } from '../../../../../../firebaseConfig'

type UploadImageProps={
  image : File|null,
  setImage: React.Dispatch<React.SetStateAction<File|null>>
  setCheckImage: React.Dispatch<React.SetStateAction<boolean>>
  buttonDelete:boolean
}

const UploadCoverPage = ({image,setImage,buttonDelete,setCheckImage}:UploadImageProps) => {

  const convertByteToMbyte = (bytes:number):number=>{
    const megaBytes = bytes / 1024 / 1024
    return megaBytes
  }

  const handleSelectedFile =  async(file: FileList | null) => {
    
    if (file && convertByteToMbyte(file[0].size) <= 100) {
      setImage(file[0])
      setCheckImage(true);
    } else {
      message.error('File size larger than 100MB')
    }
  }

  const handleRemoveFile = () => {
    setImage(null);
    setCheckImage(false);
  };


  return (
    <div className="container mt-5">
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
          <Card>
            {image &&(
              <div  key={image.name} className='flex flex-col'>    
                <List.Item>
                  <List.Item.Meta
                    title={image.name}
                    description={`Size: ${image.size}`}
                  />
                 </List.Item>
                 <img src={URL.createObjectURL(image)} alt="" className='md:w-auto md:h-auto md:max-w-[150px] md:max-h-[150px] md:block rounded-lg' />

                <div className="text-right mt-2">
                  <Button
                    type="primary"
                    onClick={handleRemoveFile}
                    className='bg-yellow-400 hover:bg-yellow-200'
                    disabled={(buttonDelete)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
            <p></p>
          </Card>   
        </div>
      </div>
    </div>
  )
}

export default UploadCoverPage