'use client'
import { Sheet,Seller } from '../../../../types/type';
import { v4 as uuidv4 } from 'uuid';
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

  const handleOnclick =() => {
    console.log("image clicked");
  }


export default function ViewAllCard ({dataSheets}:SellerDashboardProps) {

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
        <FormCard filteredSheets={filteredSheets}></FormCard>
     </>
  )
}
