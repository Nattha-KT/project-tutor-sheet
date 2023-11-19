import React from 'react'
import ViewAll from '../_components/ViewAll';


type Sheet={
    course_code:string,
    name:string,
    semester:string,
    type:string,
    year: string,
    price:number,
    status_approve:string,
    num_page: number,
    class_details:string,
    content_details:string,
    cover_page: string,
    date: string,
    sample_page: string[],
    file_path:string,
    sid:string,
  }
  export async function fetchSheets(): Promise<Sheet[]> {
    const res = await fetch("http://localhost:3000/api/sheets",{
        cache:"no-store", // bypass its cache when making the HTTP request to the specified URL.
         next: {
           tags: ["sheets"]
        }
      });
      const data = await res.json();
      return data.sheets;
  };
  

export default async function  ViewAllPage() {

    const sheets = await fetchSheets();
  return (
    <div className=' '>
        <ViewAll dataSheets={sheets}/>
    </div>
  )
}