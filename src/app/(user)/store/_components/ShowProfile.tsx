'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { BookOpenIcon, BuildingLibraryIcon, BuildingStorefrontIcon, ChevronDoubleDownIcon, CreditCardIcon, IdentificationIcon, MagnifyingGlassCircleIcon, MegaphoneIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Rate } from 'antd'
import { Seller, Sheet } from '../../../../../types/type'
import { StarIcon } from '@heroicons/react/24/solid'
import { Accordion, AccordionBody, AccordionHeader, Input } from '@material-tailwind/react'
import Link from 'next/link'
import SheetCard from '@/components/store/SheetCard'

interface CustomeSellerProps  extends Seller{
    ratingSeller:number,
    reviewsers:number,
}

type ProfileSellerProps = {
    seller:CustomeSellerProps,
    totalSheets?:number
    approvedSheets?:number
}
interface ExtendedSheet extends Sheet {
    id?: string;
    seller: Seller;
  }

export default function ShowProfile({data}:{data: ProfileSellerProps}) {
    const [openAcc1, setOpenAcc1] = useState(true);
    const [filteredSheets, setFilteredSheets] = useState<ExtendedSheet[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    const sheets = useMemo(()=>{
        if(!data.seller || !data.seller.sheet) return []
        return data.seller.sheet.map((prev)=>{
            const sheet = {...prev,seller:{...data.seller}}
            return sheet;
        })
    },[data])
    
    const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);

    const handleFilter = () => {
        const filter = sheets.filter((sheet) => {
            return sheet.name.toLowerCase().includes(searchTerm.toLowerCase())||
            sheet.course_code.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredSheets(filter);
        return filter;
      };
    
      useEffect(() => {
        handleFilter()
      }, [searchTerm]);
   

  return (
    <div className=' flex flex-col px-6 py-3'>
      <div id="profile-background" className=' min-w-full  z-0 p-0 flex justify-center md:justify-start md:pl-8'>
          <Image src={data.seller?.image || "/images/bg1.jpg"} width={2000} height={2000} alt='Profile-seller' 
            className='w-44 h-44 rounded-full border-2 border-white p-2'/>
      </div>
      <div id="profile-header" className=' mt-[-5.6rem] md:ml-[7.5rem] bg-white rounded-2xl shadow-md p-4'>
          <div className=' md:pl-[6rem] pt-[5rem]  md:pt-0 flex flex-col lg:flex-row justify-between gap-y-3'>
              <div id="show-name-point" className=' flex flex-col md:flex-row gap-y-3 gap-x-8 text-slate-900'>
                  <p className='flex items-center justify-center md:mt-[-1rem] text-3xl font-sans font-bold text-center'>
                      {data.seller.pen_name}
                  </p>
                  <div className=' flex flex-col md:flex-row justify-center gap-x-2 gap-1 items-center md:mt-[-1rem]'>
                  <Rate allowHalf disabled defaultValue={data.seller.ratingSeller} /> 
                  <span className='sm:pt-2 text-sm text-gray-500'>{`(${data.seller.ratingSeller})  ${data.seller.reviewsers} reviews`}</span>
                  </div>
              </div>
              <div id="button-more-sheet" className=' z-10  flex items-center justify-center md:justify-start'>
                  <Link href="#show-more" className="btn bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-3">
                      <MagnifyingGlassCircleIcon  className="h-6 w-6" />
                      Show more
                  </Link>
              </div>
          </div>
      </div>
      <div id="Description" className=' mt-[-1.5rem] bg-white  min-h-[13rem] pt-[3rem] px-8 rounded-2xl pb- shadow-sm'>
          <h1 className=' flex items-center pb-2 gap-2 border-b border-gray-00 uppercase text-sm font-semibold text-gray-600'> 
              <MegaphoneIcon className=' h-5 w-5'/>
              About me
          </h1>
      
              <p className=' px-3 sm:px-6 py-4 text-sm text-gray-500 font-light whitespace-pre-line'>
                  {data.seller?.about_me || ""}
              </p>    
   
      </div>

      <section id="content" className=' pt-[2rem]  pb-1 flex flex-col  mt-3 bg-white rounded-2xl shadow-sm px-4  gap-4'>
        <div className=' flex flex-col gap-3 lg:flex-row'>
            <div  id="contain-state" className='flex flex-1 gap-3 flex-col sm:flex-row px-2'>
                <div className="stats shadow-md bg-white flex-1 border border-gray-200  overflow-clip">
                    <div className="stat">
                        <div className="stat-title  text-gray-500">Total Sheet</div>
                        <div className="stat-value flex items-center">{data.totalSheets}
                            <BookOpenIcon className=' w-9 h-9 text-pink-600 ml-5'/>
                        </div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
                <div className="stats shadow-md bg-white flex-1 border border-gray-200  overflow-clip">
                    <div className="stat">
                        <div className="stat-title text-gray-500">Number of trades</div>
                        <div className="stat-value flex items-center">{3}
                            <CreditCardIcon className=' w-9 h-9 text-primary ml-5'/>
                        </div>
                        <div className="stat-desc h-auto">21% more than last month</div>
                    </div>
                </div>
                <div className="stats shadow-md bg-white flex-1 border border-gray-200 overflow-clip">
                    <div className="stat">
                        <div className="stat-title text-gray-500">Star from all sheet</div>
                        <div className="stat-value flex items-center gap-4">
                            <StarIcon className=' w-9 h-9 text-yellow-400'/>
                            {data.seller.ratingSeller*data.seller.reviewsers}
                        </div>
                        <div className="stat-desc h-auto">from more than {data.seller.reviewsers} reviewers</div>
                    </div>
                </div>
            </div>
            <div id='search-profile' className=' flex-[0.8] flex flex-col gap-4 items-center md:items-end justify-center md:justify-end pt-5 lg:py-0'>
                <div className=' flex  flex-col items-center md:items-end max-w-[60%] gap-2'>
                    <h1 className=' text-xl font-semibold text-gray-600'>My Store</h1>
                    <p className=' text-xs text-gray-500 font-light'> Looking for something in our store? You can search for what you need! </p>
                </div>
                <div className=' p-0 border-t border-gray-100 rounded-lg min-w-[70%] shadow-sm'>
                    <Input label="Search items" crossOrigin={undefined}   onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </div>
        </div> 
        <Accordion open={openAcc1}  placeholder={undefined}>
            <AccordionHeader className="flex  gap-x-2 justify-center text-gray-500 font-semibold text-md border-none" 
                onClick={handleOpenAcc1}  placeholder={undefined}>
            {`------`}
            <ChevronDoubleDownIcon 
                className={`  w-6 h-6 transform ${openAcc1 ? "rotate-180  " : ""}  duration-300 ease-in`}/>
            {`Show more ------`}
            </AccordionHeader>
        </Accordion>
      </section>

      <section id='show-more' className=' bg-transparent'>
        <Accordion open={openAcc1}  placeholder={undefined}>
            <AccordionBody className={" overflow-x-auto"}>
            <div className=" max-h-[19.5rem] sm:max-h-none  z-10  px-5 md:px-[6.5rem] py-4  grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 sm:gap-x-5 gap-y-4 overflow-y-auto">
                {filteredSheets && filteredSheets.slice(0, 4).map((sheet) =>(
                    <SheetCard key={sheet.id} sheet={sheet} />
                ))}
            </div>
            </AccordionBody>
        </Accordion>
      </section>

      <section id='use-store' className=' flex items-center bg-white mt-4 rounded-2xl shadow-sm p-6 gap-3'> 
        <p className=' text-sm text-gray-500 font-light'>Go to the store and search by the name of the seller.</p>
        <Link href={"/store"} className='flex items-center gap-2 p-2 rounded-xl shadow-md bg-stone-50 border border-stone-200/60  text-amber-500 text-sm hover:translate-y-[-0.2rem] transition-transform'>
            <BuildingStorefrontIcon className=' w-6 h-6 text-amber-500'/>
            STORE
        </Link>
      </section>
    </div>
  )
}