import { Help } from "../../../types/type";

const  getFaq = async ()=>{
    const res = await fetch("http://localhost:3000/api/faq",{
      cache:"no-store", // bypass its cache when making the HTTP request to the specified URL.
       next: {
         tags: ["faq"]
      }
    });
    const data = await res.json();
    return data.faq;
  }

   const  getSheetById = async (id:string)=>{
    const res = await fetch(`http://localhost:3000/api/sheets/by-id/${id}`, {
      cache: "no-store",
      next: {
        tags: ["sheets"],
      },
    });
    const data = await res.json();
    return data.sheetsById;
  }

  const  getSheetBySearch = async(take:number,skip:number,searchQuery:string) =>{
    const res = await fetch(`http://localhost:3000/api/sheets/store/${take}/${skip}?search=${searchQuery}`, {
      cache: "no-store",
      next: {
        tags: ["sheets"],
      },
    });
    const data = await res.json();
    return data.results;
  }
  
  


  const UploadComplaint = async (help:Help,userId:string) => {
    const res = fetch("http://localhost:3000/api/help",{
      method: "POST",
      body: JSON.stringify({help,userId}),
      // @ts-ignore
      "Content-Type":"application/json",
    });
    return (await res).json();
  }

export {
    getFaq,
    UploadComplaint,
    getSheetById,
    getSheetBySearch,
}

