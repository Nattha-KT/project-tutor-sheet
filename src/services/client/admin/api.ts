"use client"


type Seller={
  pen_name: string,
  full_name: string,
  phone:string,
  bank_name: string,
  bank_id: string
  address:string,
}

const UploadFaq = async ({title,answer}:{title:String,answer:String}) => {
    const res = fetch("http://localhost:3000/api/faq",{
      method: "POST",
      body: JSON.stringify({title,answer}),
      // @ts-ignore
      "Content-Type":"application/json",
    });
    return (await res).json();
  };

  type Faq = {
    id: string,
    title : string,
    answer : string,
};

const UpdateFaq = async (data:Faq) => {
    const res = fetch(`http://localhost:3000/api/faq/${data.id}`,{
      method: "PUT",
      body: JSON.stringify({title:data.title,answer:data.answer}),
      // @ts-ignore
      "Content-Type":"application/json",
    });
    return (await res).json();
  };
  
  const DeleteFaq = async (id:string) => {
    const res = fetch(`http://localhost:3000/api/faq/${id}`,{
      method: "DELETE",
      // @ts-ignore
      "Content-Type":"application/json",
    });
    return (await res).json();
  };
  
  const getFaqById = async (id:string) => {
      const res = await fetch(`http://localhost:3000/api/faq/${id}`);
      const data = await res.json();
      return  data.faq;
  }

    
  const DeleteComplaint = async (cid:string[]) => {
    const res = fetch(`http://localhost:3000/api/complaint`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: cid }),
    });
    return (await res).json();
  };

  
  const DeleteSellerByAdmin = async (id: string) => {
    const res = fetch(`http://localhost:3000/api/seller/${id}`, {
      method: "DELETE",
      // @ts-ignore
      "Content-Type": "application/json",
    });
  
    return (await res).json();
  };

  const UpdateSellerByAdmin = async (seller:Seller,sid:string) => {
    const res = fetch(`http://localhost:3000/api/seller/${sid}`,{
      method: "PUT",
      body: JSON.stringify(seller),
      // @ts-ignore
      "Content-Type":"application/json",
    });
    return (await res).json();
  };


  export  {
    UploadFaq,
    UpdateFaq,
    DeleteFaq,
    getFaqById,
    DeleteComplaint,
    DeleteSellerByAdmin,
    UpdateSellerByAdmin,
  }