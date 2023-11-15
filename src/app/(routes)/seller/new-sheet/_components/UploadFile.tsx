'use client'
import { Button, Card, Input, List, message, Image, Progress } from 'antd'
import React, { useState ,useEffect} from 'react'

type UploadFileProps = {
  file: File|null
  setFile: React.Dispatch<React.SetStateAction<File|null>>
  setCheckFile: React.Dispatch<React.SetStateAction<boolean>>
  buttonDelete:boolean
}

const UploadFile = ({file,setFile,buttonDelete,setCheckFile}: UploadFileProps) => {

  const convertByteToMbyte = (bytes:number):number=>{
    const megaBytes = bytes / 1024 / 1024
    return megaBytes
  }

  const handleSelectedFile =  async(file: FileList | null) => {
    
    if (file && convertByteToMbyte(file[0].size) < 60) {
      setFile(file[0])
      setCheckFile(true);
    } else {
      message.error('File size to large')
    }
  }
  
  const handleRemoveFile = () => {
    setFile(null);
    setCheckFile(false);
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

        <div className="mt-5 w-4/5 space-y-10">
          <Card>
            {file && (
              <div  key={file.name} className='flex flex-col border border-gray-50 p-5 rounded-lg space-y-5 my-2'>    
                <List.Item>
                  <List.Item.Meta
                    title={file.name}
                    description={`Size: ${file.size}`}
                  />
                 </List.Item>
                <div className=''>
                  <img src={URL.createObjectURL(file)} alt="" className='md:w-auto md:h-auto md:max-w-[150px] md:max-h-[150px] md:block rounded-lg' />
                  <div className="text-right mt-2">
                    <Button
                      type="primary"
                      onClick={() => handleRemoveFile()}
                      className='bg-yellow-400 hover:bg-yellow-200'
                      disabled={buttonDelete}
                    >
                      Delete
                    </Button>
                  </div>
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

export default UploadFile