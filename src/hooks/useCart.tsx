"use client";

import { deleteSheetCart, getSheetsInCart } from "@/services/client/user/api";
import { useCallback, useEffect, useState } from "react";

export type SheetCartProps = {
  course_code: string;
  cover_page: string;
  id: string;
  inCart: true;
  name: string;
  num_page: number;
  pen_name: string;
  price: number;
  semester: string;
  sid: string;
  full_name?:string
  type: string;
  year: string;
};

const useCart = () => {
  const [checkList, setCheckList] = useState<SheetCartProps[]>([]);
  const [sheetList, setSheetList] = useState<SheetCartProps[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [reloadComponent, setReloadComponent] = useState(true);

  const isMainCheckAllList =
    sheetList.length !== 0 ? checkList.length === sheetList.length : false;

  const handleCheckboxChange = (id: string) => {
    if (checkList.find((sheet) => sheet.id === id)) {
      setCheckList((prevSheets) =>
        prevSheets.filter((sheet) => sheet.id !== id)
      );
    } else {
      setCheckList((prev) => [
        ...prev,
        ...sheetList.filter((sheet) => sheet.id === id),
      ]);
    }
  };

  const handleMainCheckboxChange = () => {
    if (isMainCheckAllList) {
      setCheckList([]);
    } else {
      setCheckList(sheetList);
    }
  };

  const onDeleteSheetCart = async (id: string) => {
    setSheetList((prev) => {
      return prev.filter((sheet) => sheet.id !== id);
    });
    await deleteSheetCart(id);
  };

  const getCart = useCallback(async () => {
    const res = await getSheetsInCart();
    if (!res) return;
    setSheetList(res);
    setPending(false);
  }, []);

  useEffect(() => {
    if (!reloadComponent) return;
    setPending(true);
    getCart();
    setReloadComponent(false);
  }, [reloadComponent]);

  return {
    handleCheckboxChange,
    handleMainCheckboxChange,
    onDeleteSheetCart,
    setReloadComponent,
    checkList,
    sheetList,
    isMainCheckAllList,
    pending,
  };
};

export default useCart;
