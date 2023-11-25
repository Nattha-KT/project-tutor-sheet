'use client'
import { ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage'
import React, { useState ,useEffect} from 'react'
import { storage } from '../../../../firebaseConfig'
import { number } from 'prop-types'


const Test = () => {
  const [url, setUrl] = useState<string[]>([])

  const handleUploadFile = () => {
    const storageRef = ref(storage, `image`);
  
    listAll(storageRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          // console.log("itemRef" + itemRef);
          getDownloadURL(itemRef).then((urlDownload) => {
            setUrl((prevItems) => [...prevItems, urlDownload]);
            console.log("console Url List  => " + urlDownload);
            console.log("Updated Url List =>", url); // นำมาจากที่ setUrl แล้ว
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
//   useEffect(() => {
//    console.log("console Url List  => "+url);
//   },[])

 
  return (
    <div>
        <h1>heelo</h1>
    <button className=' bg-slate-400' onClick={handleUploadFile}>Upload</button>
    
    </div>
  )
}

export default Test