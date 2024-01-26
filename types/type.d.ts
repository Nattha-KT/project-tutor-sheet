export interface Sheet {
  id?: string;
  course_code: string;
  name: string;
  semester: string;
  type: string;
  year: string;
  price: number;
  status_approve?: boolean;
  num_page: number;
  class_details: string;
  content_details: string;
  suggestion?: string;
  cover_page: string;
  date?: string;
  samples_page: string[];
  file_path: string;
  sid: string;
}

export interface Seller {
  id?: string;
  pen_name: string;
  full_name: string;
  phone: string;
  bank_name: string;
  bank_id: string;
  address: string;
  image: string ;
}

export interface Help {
  userId: string;
  head: string;
  category: string;
  content: string;
  role: string;
  level: number;
}

export interface User {
  id: string;
  name: string;
  image: string;
}
export interface CommentType extends User {
  id: string;
  message: string;
  createdAt?: DateTime;
  updatedAt?: DateTime;
  user?: User;
  userId?: string;
  sheetId?: string;
  parentId: string;

  likeCount?: number;
  likedByMe?: boolean;
  
}
