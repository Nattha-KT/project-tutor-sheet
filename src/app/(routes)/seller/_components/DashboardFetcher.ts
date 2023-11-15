
type Sheet={
    id:string;
    course_code:string,
    name:string,
    semester:string,
    status_approve:boolean,
    type:string,
    year: string,
    price:number,
    num_page: number,
    class_details:string,
    content_details:string,
    sid:string,
}

export async function fetchSheets(sheet:Sheet) {
    const res = await fetch("http://localhost:3000/api/sheets",{
        cache:"no-store", // bypass its cache when making the HTTP request to the specified URL.
         next: {
           tags: ["sheets"]
        }
      });
      const data = await res.json();
      return data.faq;
  };

