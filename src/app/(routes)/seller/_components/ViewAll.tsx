"use client"
import Image from 'next/image'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
  } from "@material-tailwind/react";

  import {ShoppingCartIcon} from "@heroicons/react/24/outline";
  import {TooltipCustomStyles} from './Tooltip';

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
  interface SellerDashboardProps {
    dataSheets: Sheet[];
  }
  const ViewAll: React.FC<SellerDashboardProps> = ({ dataSheets }) =>   {
  return (
    <div className=' container min-h-screen pb-10'>

      <div className='min-h-screen max-w-7xl mx-auto px-5  justify-center  grid   sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-x-10 gap-y-5'>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden max-h-[420px]   max-w-xs sm:w-[280px] w-[350px]  order-first lg:order-none relative
          transition-transform duration-300 hover:scale-[102%] hover:shadow-xl focus:outline-none ">
            <div className="absolute top-0 right-0 m-4">
                <IconButton
                size="sm"
                color="red"
                variant="text"
                className="rounded-full"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                </IconButton>
            </div>
                <Image onClick={()=>{console.log("hello")}}  height={1000} width={1000} src="/images/bg2.jpg" alt="Abstract Design" className="w-full h-60  object-cover"/>
            <div className="py-4 px-4">
                <div className='flex justify-between'>
                    <h2 className="text-xl sm:text-lg text-gray-800 font-semibold mb-3">Abstract Design</h2> <TooltipCustomStyles/>

                </div>
                <p className="text-gray-500 leading-relaxed text-sm">Lorem ipsum dolor sit amet</p>
                <p className="text-gray-500 leading-relaxed text-md ">price: 12 ฿</p>
                <Button className="px-10 mt-3 flex justify-center" size="sm" fullWidth={true}>
                <ShoppingCartIcon className='h-[18px] w-[18px] mr-2'/>Add to cart
                </Button>
                    
            </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden max-h-[420px]  max-w-xs sm:w-[280px] w-[350px]  order-first lg:order-none relative">
            <div className="absolute top-0 right-0 m-4">
                <IconButton
                size="sm"
                color="red"
                variant="text"
                className="rounded-full"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                </IconButton>
            </div>
                <Image  height={1000} width={1000} src="/images/bg1.jpg" alt="Abstract Design" className="w-full h-60  object-cover"/>
            <div className="py-4 px-4">
                <div className='flex justify-between'>
                    <h2 className="text-xl sm:text-lg text-gray-800 font-semibold mb-3">Abstract Design</h2> <TooltipCustomStyles/>

                </div>
                <p className="text-gray-500 leading-relaxed text-sm">Lorem ipsum dolor sit amet</p>
                <p className="text-gray-500 leading-relaxed text-md ">price: 12 ฿</p>
                <Button className="px-10 mt-3 flex justify-center" size="sm" fullWidth={true}>
                <ShoppingCartIcon className='h-[18px] w-[18px] mr-2'/>Add to cart
                </Button>
                    
            </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden max-h-[420px]   max-w-xs sm:w-[280px] w-[350px] order-first lg:order-none relative">
            <div className="absolute top-0 right-0 m-4">
                <IconButton
                size="sm"
                color="red"
                variant="text"
                className="rounded-full"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                </IconButton>
            </div>
                <Image  height={1000} width={1000} src="/images/bg3.jpg" alt="Abstract Design" className="w-full h-60  object-cover"/>
            <div className="py-4 px-4">
                <div className='flex justify-between'>
                    <h2 className="text-xl sm:text-lg text-gray-800 font-semibold mb-3">Abstract Design</h2> <TooltipCustomStyles/>

                </div>
                <p className="text-gray-500 leading-relaxed text-sm">Lorem ipsum dolor sit amet</p>
                <p className="text-gray-500 leading-relaxed text-md ">price: 12 ฿</p>
                <Button className="px-10 mt-3 flex justify-center" size="sm" fullWidth={true}>
                <ShoppingCartIcon className='h-[18px] w-[18px] mr-2'/>Add to cart
                </Button>
                    
            </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden max-h-[420px]  max-w-xs sm:w-[280px] w-[350px] order-first lg:order-none relative">
            <div className="absolute top-0 right-0 m-4">
                <IconButton
                size="sm"
                color="red"
                variant="text"
                className="rounded-full"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                </IconButton>
            </div>
                <Image  height={1000} width={1000} src="/images/bg2.jpg" alt="Abstract Design" className="w-full h-60  object-cover"/>
            <div className="py-4 px-4">
                <div className='flex justify-between'>
                    <h2 className="text-xl sm:text-lg text-gray-800 font-semibold mb-3">Abstract Design</h2> <TooltipCustomStyles/>

                </div>
                <p className="text-gray-500 leading-relaxed text-sm">Lorem ipsum dolor sit amet</p>
                <p className="text-gray-500 leading-relaxed text-md ">price: 12 ฿</p>
                <Button className="px-10 mt-3 flex justify-center" size="sm" fullWidth={true}>
                <ShoppingCartIcon className='h-[18px] w-[18px] mr-2'/>Add to cart
                </Button>
                    
            </div>
        </div>
      </div>
    </div>
  )
}

export default ViewAll;