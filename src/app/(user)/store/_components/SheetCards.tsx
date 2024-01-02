'use client'
import { Sheet,Seller } from '../../../../../types/type';
import  {useDropdownFilter}  from '@/hooks/useFilter';
import React, { useEffect, useState } from 'react'
import SearchBar from '@/components/store/SearchBar';
import FormCard from '@/components/store/FormCard';

interface ExtendedSheet extends Sheet {
    id: string;
    seller: Seller;
  }
  interface SellerDashboardProps {
    dataSheets: ExtendedSheet[];
  }


export default function SheetCards ({dataSheets}:SellerDashboardProps) {

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
       <SearchBar clasName=' relative z-[20]' useDropdown={useDropdown} pathSearch={""}/>
        <FormCard filteredSheets={filteredSheets}></FormCard>
     </>
  )
}
