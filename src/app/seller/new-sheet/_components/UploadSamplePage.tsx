'use client'
import { Button, Card, Input, List, message  } from 'antd'
import React from 'react'
import Image from 'next/image'
type UploadSamplePageProps = {
  imageList: File[]
  setImageList: React.Dispatch<React.SetStateAction<File[]>>
  setCheckImageList: React.Dispatch<React.SetStateAction<boolean>>
  buttonDelete:boolean
}

const UploadImage = ({imageList,setImageList,buttonDelete,setCheckImageList}: UploadSamplePageProps) => {

  const handleSelectedFile =  async(files: FileList | null) => {
    // console.log(files);
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
        if (imageList) {
          const newFileList = [...imageList, ...validFiles];
          await setImageList(newFileList);
          setCheckImageList(true);
        }else setCheckImageList(false);
      }
    }
  }
  
  const handleRemoveFile = (index:number) => {
    const newList = [...imageList];
    newList.splice(index, 1);
    setImageList(newList)
    newList.length == 0 && setCheckImageList(false);
  };

  return (
    <div className="container mt-5">
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

        <div className="mt-5 w-4/5 space-y-10">
          <Card>
            {imageList && imageList?.map((image_File:any,index:number)=>(
              <div  key={image_File.name} className='flex flex-col border border-gray-50 p-5 rounded-lg space-y-5 my-2'>    
                <List.Item>
                  <List.Item.Meta
                    title={image_File.name}
                    description={`Size: ${image_File.size}`}
                  />
                 </List.Item>
                <div className=''>
                <Image width={1000}  height={1000} src={URL.createObjectURL(image_File)} alt="" className='md:w-auto md:h-auto md:max-w-[150px] md:max-h-[150px] md:block rounded-lg object-cover' />
                  <div className="text-right mt-2">
                    <Button
                      type="primary"
                      onClick={() => handleRemoveFile(index)}
                      className='bg-yellow-400 hover:bg-yellow-200'
                      disabled={buttonDelete}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <p></p>
          </Card>

        </div>
      </div>
    </div>
  )
}

export default UploadImage