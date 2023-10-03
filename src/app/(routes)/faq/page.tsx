
async function fetchFaq(){
    const res = await fetch("http://localhost:3000/api/faq",{
      cache:"no-store", // bypass its cache when making the HTTP request to the specified URL.
       next: {
         tags: ["faq"]
      }
    });
    const data = await res.json();
    return data.faq;
  }


export default async function Faq() {

    const data = await fetchFaq();

  return (

         <div className="grid gap-6 grid-cols-1 font-medium  m-6 p-20 space-y-8 bg-white shadow-xl rounded-2xl md:flex-row md:space-y-0">
          
            <div className=" text-3xl font-bold ">FAQ💡</div>
            <div className=" text-base font-medium">Welcome to our FAQ section! Here, we aim to provide you with clear and concise answers to some of 
             the most commonly asked questions about us. Whether you're a new customer seeking information or a returning 
             visitor looking for quick solutions, our FAQ is designed to streamline your experience and provide you with the information you need.
            </div>
            
          {data && data.map((faq:any) => (
               <div key={faq.id} tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-5">
               <div className="collapse-title text-xl font-medium">
                   {faq.title}
               </div>
               <div className="collapse-content text-sm font-medium">
                   <p>{faq.answer}</p>
               </div>
           </div>
          ))

          }
          
        </div>
  
  )
}