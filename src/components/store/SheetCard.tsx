'use client'
import Image from 'next/image'
import TooltipCustomStyles from './Tooltip';
import { Sheet,Seller } from '../../../types/type';
import ButtonCart from './ButtonCart';
import ButtonEdit from './BuntonEdit';
import { usePathname, useRouter } from 'next/navigation'
import HeartBtn from '../buttons/HeartBtn';
import { v4 as uuidv4 } from "uuid";
import { Rate } from 'antd';
import Link from 'next/link';

interface ExtendedSheet extends Sheet {
    id?: string;
    seller: Seller;
    favorite?:boolean
    inCart?:boolean
    owner?:boolean
    ratingSheet?:number,
    ratingSeller?:number
  }


export default function SheetCard({sheet}:{sheet:ExtendedSheet}) {
  const pathName = usePathname()
  

  return (
    <div  className="bg-white shadow-lg rounded-xl flex flex-col overflow-hidden max-h-[320px] sm:max-h-[420px] min-w-full  md:w-[280px]  order-first lg:order-none relative
     transition-transform duration-300 hover:scale-[102%] hover:shadow-xl focus:outline-none ">
      {pathName.includes("/store") && (
        <div className="absolute z-[30] top-0 right-0 m-4">
          {sheet.id && (
            <HeartBtn sheetId={sheet.id} favorite={sheet.favorite?sheet.favorite:false}/>
          )}
        </div>
      )}
      <div className='hover:cursor-pointer z-10'>
        <Link href={`/store/info-sheet/${sheet.id}`} prefetch={true}>
          <Image   height={1000} width={1000} src={sheet.cover_page} alt="Abstract Design" 
        className="w-full h-[8.5rem] sm:h-60  object-cover "/>
        </Link>
      </div>
      <div className=" px-3 py-3 sm:py-4 sm:px-4 flex flex-col ">
          <div id='card-content'>
            <div className='flex justify-between mb-1'>
                <span className=" text-sm sm:text-base text-gray-800 font-semibold  truncate w-[80%]">{sheet.name}</span> 
                <TooltipCustomStyles {...sheet.seller} {...sheet}/>
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between text-gray-500 leading-relaxed text-xs sm:text-base font-medium '>
              <span >{`${sheet.course_code}`}</span>
              <span >{`${sheet.type} ${sheet.semester}/${sheet.year}`}</span>
            </div>
          </div>
          <div className=' flex justify-between items-center mb-2'>
            <span className="  text-gray-500 leading-relaxed text-[13px] sm:text-[17px] font-semibold">{`${sheet.price} ฿`}</span>
            <Rate
            className=' text-xs md:text-sm pb-1'
                key={uuidv4()}
                disabled
                allowHalf
                defaultValue={sheet.ratingSheet ?sheet.ratingSheet :0}
              />
          </div>
        {pathName.includes("/store") ?
          <ButtonCart sheetId={sheet.id!} inCart={sheet.inCart!} owner={sheet.owner!}  />
          :
          <ButtonEdit sheet={sheet}/>
        }
      </div>
    </div>
  )
}