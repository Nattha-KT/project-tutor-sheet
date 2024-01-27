"use client"

  type Sheet = {
    course_code:string,
    name:string,
    semester:string,
    type:string,
    year: string,
    class_details:string,
    content_details:string,
  }

  type Seller = {
    pen_name: string;
    full_name: string;
    phone: string;
    bank_name: string;
    bank_id: string;
    address: string;
    image?: string;
  };

  const AddSeller = async (seller: Seller) => {
    const res = fetch("http://localhost:3000/api/seller", {
      method: "POST",
      body: JSON.stringify(seller),
      // @ts-ignore
      "Content-Type": "application/json",
      //   'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
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

  const UpdateSeller = async (seller:Seller) => {
    const res = fetch(`http://localhost:3000/api/seller`,{
      method: "PUT",
      body: JSON.stringify(seller),
      // @ts-ignore
      "Content-Type":"application/json",
    });
    return (await res).json();
  };


  
  
  

  export {
    UpdateSheet,
    DeleteSheet,
    AddSeller,
    UpdateSeller,
}