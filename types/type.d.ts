
export interface Sheet{
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
    samples_page: string[],
    file_path:string,
    sid:string,
  }
export interface PropSheet extends Sheet {
    id: string;
}

export interface Seller{
    pen_name: string,
    full_name: string,
    phone:string,
    bank_name: string,
    bank_id: string
    address:string,
    image:string
  }

