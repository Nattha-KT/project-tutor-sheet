// services/api.ts
import axios from 'axios';

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



 const getBanks = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/banks");
    const data = response.data;
    const banks = data.banks;
    return banks;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};


 const getSellerByID = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/seller/${id}`, {
      cache: "no-store",
      next: {
        tags: ["blog"],
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};

const UpdateSeller = async (seller:Seller) => {
  console.log(seller.id)
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


export {
  UpdateSeller,
  getSellerByID,
  getBanks,
  UpdateSheet,
}
