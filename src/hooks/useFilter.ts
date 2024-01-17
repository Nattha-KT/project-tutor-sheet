"use client";
import { useEffect, useState } from "react";
import { Sheet, Seller } from "../../types/type";

type YearOption = { value: string; label: string };

interface ExtendedSheet extends Sheet {
  id: string;
  seller: Seller;
}

export function useDropdownFilter() {
  const [semester, setSemester] = useState<string>("default");
  const [type, setType] = useState<string>("default");
  const [year, setYear] = useState<string>("default");
  const [price, setPrice] = useState<string>("default");
  const [yearsOption, setOptionYears] = useState<YearOption[]>([]);

  const sortByPrice = (ascending: string) => {
    return (a: ExtendedSheet, b: ExtendedSheet) => {
      if (ascending === "min") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    };
  };

  const handleFilter = (dataSheet: ExtendedSheet, key: string[]) => {
    const conditions = [
      dataSheet.type.toLowerCase().includes(key[0].toLowerCase()) ||
        key[0] === "default",
      dataSheet.year.toLowerCase().includes(key[1].toLowerCase()) ||
        key[1] === "default",
      dataSheet.semester.toLowerCase().includes(key[3].toLowerCase()) ||
        key[3] === "default",
    ];
    return conditions.every((condition) => condition);
  };

  const applyFiltersAndSort = (
    dataSheets: ExtendedSheet[],
    currentValues: string[]
  ) => {
    if (currentValues.every((value, index) => value === "default")) {
      return dataSheets;
    }

    const filteredSheets = dataSheets.filter((dataSheet) => {
      return handleFilter(dataSheet, currentValues);
    });

    if (currentValues[2] !== "default") {
      const filterSort =
        currentValues[2] === "min"
          ? filteredSheets.sort(sortByPrice("min"))
          : filteredSheets.sort(sortByPrice("max"));
      return filterSort;
    }

    return filteredSheets;
  };

  const handleYears = () => {
    const startYear = 2020;
    const currentYear = new Date().getFullYear();

    const yearsArray: YearOption[] = Array.from(
      { length: currentYear - startYear + 2 },
      (_, index) => {
        if (index === 0) return { value: "default", label: "default" };
        const year = startYear + index;
        return { value: year.toString(), label: year.toString() };
      }
    );

    setOptionYears(yearsArray);
  };

  // useEffect(() => {
  //  console.log({year,price,semester,type})
  // },[year,price,semester,type])

  return {
    setSemester,
    setType,
    setYear,
    setPrice,
    semester,
    type,
    year,
    price,
    yearsOption,
    handleYears,
    applyFiltersAndSort,
  };
}

export interface TypeDropdownFilter {
  setSemester: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  semester: string;
  type: string;
  year: string;
  price: string;
  yearsOption: YearOption[];
  handleYears: () => void;
  //-applyFiltersAndSort-//
}
