'use client'

type Props = {}
import React, { useState, ChangeEvent } from 'react';

const uploadfile = (props: Props) => {

    const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setFile(selectedFile || null);
    console.log(selectedFile);
  };

  const handleUpload = async(e:any) => {
    if (file) {
      // Example: Send the file to a server using API
      console.log("File:  ==> ",file);

      const formData = new FormData();
      await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
        // @ts-ignore
         "Content-Type":"application/pdf",
      });
      // Call your API to handle the upload
    }
  };

  return (
    <div className=' w-full h-full flex items-centerjustify-center '>
    <h1 className=' text-slate-800'>File Upload Page</h1>
    <form action="#" className=' border-solid my-10'>
    <div className="file-field input-field">
      <div className="btn">
        <span>File</span>
        <input type="file" onChange={handleFileChange}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
  </form>

    {/* <input type="file" onChange={handleFileChange} /> */}
    <button onClick={handleUpload}>Upload</button>
    {file && <p>Selected File: {file.name}</p>}
  </div>
  )
}

export default uploadfile;