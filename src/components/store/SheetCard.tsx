'use client'
import Image from 'next/image'
import TooltipCustomStyles from './Tooltip';
import { Sheet,Seller } from '../../../types/type';
import ButtonCart from './ButtonCart';
import ButtonEdit from './BuntonEdit';
import { usePathname, useRouter } from 'next/navigation'
import HeartBtn from '../buttons/HeartBtn';


interface ExtendedSheet extends Sheet {
    id?: string;
    seller: Seller;
    favorite?:boolean
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
        <Image onClick={()=> window.location.href=`/store/info-sheet/${sheet.id}`}  height={1000} width={1000} src={sheet.cover_page} alt="Abstract Design" className="w-full h-[150px] sm:h-60  object-cover "/>
      </div>
      <div className="py-4 px-4 flex flex-col flex-grow justify-between ">
          <div>
            <div className='flex justify-between'>
                <h2 className="text-[14px] sm:text-[17px] text-gray-800 font-semibold mb-2">{sheet.name}</h2> 
                <TooltipCustomStyles {...sheet.seller} {...sheet}/>
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between text-gray-500 leading-relaxed text-md font-medium text-[13px] sm:text-[16px]'>
            <div className="">{`${sheet.course_code}`}</div>
            <div className="">{`${sheet.type} ${sheet.semester}/${sheet.year}`}</div>
            </div>
          </div>
        {pathName.includes("/store") ?
          <ButtonCart price={sheet.price}/>
          :
          <ButtonEdit price={sheet.price}/>
        }
      </div>
    </div>
  )
}