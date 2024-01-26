"use client"

type Seller={
    id:string
    pen_name: string,
    full_name: string,
    phone:string,
    bank_name: string,
    bank_id: string
    address:string,
  }
  type Sheet = {
    course_code:string,
    name:string,
    semester:string,
    type:string,
    year: string,
    class_details:string,
    content_details:string,
  }


const UpdateSeller = async (seller:Seller) => {
    const res = fetch(`http://localhost:3000/api/seller/${seller.id}`,{
      method: "PUT",
      body: JSON.stringify(seller),
      // @ts-ignore
      "Content-Type":"application/json",
    });
    return (await res).json();
  };

  const UpdateSheet = async (sheet:Sheet,id:string) => {
    const res = fetch(`http://localhost:3000/api/sheets/by-id/${id}`,{
      method: "PUT",
      body: JSON.stringify(sheet),
      // @ts-ignore
      "Content-Type":"application/json",
    });
    // console.log(res);
    
    return (await res).json();
  };

  const DeleteSheet = async (id: string) => {
    const res = fetch(`http://localhost:3000/api/sheets/by-id/${id}`, {
      method: "DELETE",
      // @ts-ignore
      "Content-Type": "application/json",
    });
  
    return (await res).json();
  };

  const DeleteSeller = async (id: string) => {
    const res = fetch(`http://localhost:3000/api/seller/${id}`, {
      method: "DELETE",
      // @ts-ignore
      "Content-Type": "application/json",
    });
  
    return (await res).json();
  };
  
  
  

  export {
    UpdateSeller,
    UpdateSheet,
    DeleteSheet,
    DeleteSeller,
}