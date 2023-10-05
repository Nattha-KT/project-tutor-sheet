'use client'
import React from "react";
import {

  Typography,

  MenuItem,

} from "@material-tailwind/react";
import {
    HomeIcon,
    CurrencyDollarIcon,
    Square3Stack3DIcon,
    QuestionMarkCircleIcon,
    Bars2Icon,
    ShoppingCartIcon
  } from "@heroicons/react/24/outline";

const navListItems = [
    {
      label: "หน้าหลัก",
      icon: HomeIcon,
      path:"/"
    },
    {
      label: "ซื้อชีท",
      icon: Square3Stack3DIcon,
      path:""
    },
    {
      label: "ขายชีท",
      icon: CurrencyDollarIcon,
      path:"/seller"
    },
    {
      label: "คำถาม",
      icon: QuestionMarkCircleIcon,
      path:"/faq"
    },
    {
      label: "Cart",
      icon: ShoppingCartIcon,
      path:"#"
    },
  ];
   
  export default function NavList() {
    return (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center z-50">
        {navListItems.map(({ label, icon,path }, key) => (
          <Typography
            key={label}
            as="a"
            href={path}
            variant="small"
            color="blue-gray"
            className="text-base font-medium hover:font-bold "
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              {label}
            </MenuItem>
          </Typography>
        ))}
      </ul>
    );
  }