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

  const UploadSheet = async ({title,answer}:{title:String,answer:String}) => {
    const res = fetch("http://localhost:3000/api/faq",{
      method: "POST",
      body: JSON.stringify({title,answer}),
      // @ts-ignore
      "Content-Type":"application/json",
    });
    return (await res).json();
  };

  export {
    UpdateFaq,
    DeleteFaq,
    getFaqById,
    UploadSheet,
  }