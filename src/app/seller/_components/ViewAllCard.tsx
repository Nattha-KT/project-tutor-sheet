"use client"
import Image from 'next/image'
import { Sheet,Seller } from '../../../../types/type';
import {
    Button,
    IconButton,
  } from "@material-tailwind/react";
import {ShoppingCartIcon} from "@heroicons/react/24/outline";
import {TooltipCustomStyles} from './Tooltip';
import SearchBar from '../../../components/SearchBar';
import { Pagination } from '../../../components/Pagination';
import { v4 as uuidv4 } from 'uuid';

interface ExtendedSheet extends Sheet {
    id: string;
    seller: Seller;
  }
  interface SellerDashboardProps {
    dataSheets: ExtendedSheet[];
  }
  const ViewAllCard: React.FC<SellerDashboardProps> = ({ dataSheets }) =>   {


  return (
    <div key={uuidv4()} className=' container min-h-screen pb-10 min-w-fit '>
        <SearchBar clasName=' relative z-[20]'/>
      <div className='min-h-screen max-w-7xl z-10 mx-auto px-5  justify-center  grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 sm:gap-x-5 gap-y-5'>
        {dataSheets&& dataSheets.map((sheet)=>(
            <div key={sheet.id} className="bg-white shadow-lg rounded-xl flex flex-col overflow-hidden sm:max-h-[420px] min-w-full  md:w-[280px]  order-first lg:order-none relative
            transition-transform duration-300 hover:scale-[102%] hover:shadow-xl focus:outline-none ">
              <div className="absolute z-10 top-0 right-0 m-4">
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
              <div className='hover:cursor-pointer z-10'>
                <Image onClick={()=>{console.log("hello")}}  height={1000} width={1000} src={sheet.cover_page} alt="Abstract Design" className="w-full h-[150px] sm:h-60  object-cover "/>
              </div>
              <div className="py-4 px-4 flex flex-col flex-grow justify-between ">
                  <div>
                    <div className='flex justify-between'>
                        <h2 className="text-[14px] sm:text-[17px] text-gray-800 font-semibold mb-2">{sheet.name}</h2> 
                        <TooltipCustomStyles seller={sheet.seller} classDetail={sheet.class_details} contentDetail={sheet.content_details}/>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:justify-between text-gray-500 leading-relaxed text-md font-medium text-[13px] sm:text-[16px]'>
                    <div className="">{`${sheet.course_code}`}</div>
                    <div className="">{`${sheet.type} ${sheet.semester}/${sheet.year}`}</div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className="text-gray-500 leading-relaxed text-[13px] sm:text-[17px] font-semibold">{`${sheet.price} ฿`}</div>
                    <Button className=" sm:hidden py-[5px]  flex  text-[12px] rounded-full" >+
                    <ShoppingCartIcon className=' h-[15px] w-[12px] mt-[3px] mr-[2px]'/>
                    </Button>
                  </div>
                  <Button className="relative hidden px-0 sm:px-10 mt-3 sm:flex justify-center" size="sm" fullWidth={true}>
                    <ShoppingCartIcon className='h-[12px] sm:h-[18px] w-[18px] mr-2 text-[12px] sm:text-md'/>Add to cart
                    </Button>
                      
              </div>
          </div>
        ))} 
      </div>
      <div className=' flex justify-center mt-10'>
        <Pagination/>
      </div>
    </div>
  )
}

export default ViewAllCard;