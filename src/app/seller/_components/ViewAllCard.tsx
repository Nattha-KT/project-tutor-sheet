'use client'
import { Sheet,Seller } from '../../../../types/type';
import  {useDropdownFilter}  from '@/hooks/useFilter';
import React, { useEffect, useState } from 'react'
import SearchBar from '@/components/store/SearchBar';
import SheetCard from '@/components/store/SheetCard';
import Image from 'next/image'


interface ExtendedSheet extends Sheet {
    id: string;
    seller: Seller;
  }
  interface SheetsProps {
    dataSheets: ExtendedSheet[];
  }


export default function ViewAllCard ({dataSheets}:SheetsProps) {

  const [filteredSheets, setFilteredSheets] = useState<ExtendedSheet[]>([]); 

  const useDropdown = useDropdownFilter();
  const {type,year,price,semester,applyFiltersAndSort} = useDropdown;  

  useEffect(() => {
    const currentValues: string[] = [type, year, price, semester];
    const result = applyFiltersAndSort(dataSheets, currentValues);
    setFilteredSheets(result);
  }, [year, price, semester, type, dataSheets]);


  return (
     <>
       <SearchBar clasName=' relative z-[20]' useDropdown={useDropdown} pathSearch='view-all'/>
       {filteredSheets.length!==0 ? 
        <section className=' h-auto max-w-7xl z-10 mx-auto px-5  justify-center  grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 sm:gap-x-5 gap-y-10'>
          { filteredSheets.map((sheet)=>(
            <SheetCard key={sheet.id} sheet={sheet}></SheetCard>
          ))} 
        </section>
       :
        <div className=' min-w-full flex justify-center items-center'>
          <Image width={400} height={400} src={"/emoji-sad.png"} alt='emoji'/>
        </div>
       }
     </>
  )
}
