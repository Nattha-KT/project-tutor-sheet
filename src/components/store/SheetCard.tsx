'use client'
import Image from 'next/image'
import TooltipCustomStyles from './Tooltip';
import { Sheet,Seller } from '../../../types/type';
import {IconButton} from "@material-tailwind/react";
import ButtonCart from './ButtonCart';
import ButtonEdit from './BuntonEdit';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

interface ExtendedSheet extends Sheet {
    id?: string;
    seller: Seller;
  }

  const handleOnclick =() => {
    console.log("onclick heart")
  }


export default function SheetCard({filteredSheets}:{filteredSheets:ExtendedSheet}) {
  const pathName = usePathname()
  const router = useRouter()

    
  return (
    <div  className="bg-white shadow-lg rounded-xl flex flex-col overflow-hidden max-h-[320px] sm:max-h-[420px] min-w-full  md:w-[280px]  order-first lg:order-none relative
     transition-transform duration-300 hover:scale-[102%] hover:shadow-xl focus:outline-none ">
      {pathName.includes("/store") && (
        <div className="absolute z-[30] top-0 right-0 m-4">
        <IconButton
        size="sm"
        color="red"
        variant="text"
        className="rounded-full"
        onClick={handleOnclick}
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
      )}
      <div className='hover:cursor-pointer z-10'>
        <Image onClick={()=> router.push(`/store/${filteredSheets.id}`)}  height={1000} width={1000} src={filteredSheets.cover_page} alt="Abstract Design" className="w-full h-[150px] sm:h-60  object-cover "/>
      </div>
      <div className="py-4 px-4 flex flex-col flex-grow justify-between ">
          <div>
            <div className='flex justify-between'>
                <h2 className="text-[14px] sm:text-[17px] text-gray-800 font-semibold mb-2">{filteredSheets.name}</h2> 
                <TooltipCustomStyles {...filteredSheets.seller} {...filteredSheets}/>
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between text-gray-500 leading-relaxed text-md font-medium text-[13px] sm:text-[16px]'>
            <div className="">{`${filteredSheets.course_code}`}</div>
            <div className="">{`${filteredSheets.type} ${filteredSheets.semester}/${filteredSheets.year}`}</div>
            </div>
          </div>
        {pathName.includes("/store") ?
          <ButtonCart price={filteredSheets.price}/>
          :
          <ButtonEdit price={filteredSheets.price}/>
        }
      </div>
    </div>
  )
}