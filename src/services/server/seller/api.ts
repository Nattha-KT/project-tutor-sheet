'use server'
import axios from 'axios';

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
        tags: ["seller"],
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};




const  fetchSheetsBySid= async(sid: string) =>{
  const res = await fetch(`http://localhost:3000/api/sheets/by-sid/${sid}`, {
    cache: "no-store",
    next: {
      tags: ["sheets"],
    },
  });
  const data = await res.json();
  return data.results;
}

const fetchSheetBySearch = async(sid: string,take:number,skip:number,searchQuery:string)=>{
  const res = await fetch(`http://localhost:3000/api/sheets/by-sid/${sid}/${take}/${skip}?search=${searchQuery}`, {
    cache: "no-store",
    next: {
      tags: ["sheets"],
    },
  });
  const data = await res.json();
  return data.results;
}



export {
  getSellerByID,
  getBanks,
  fetchSheetsBySid,
  fetchSheetBySearch,
}
