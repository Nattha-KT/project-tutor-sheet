'use client'
import React from "react";
import {

  Typography,

  MenuItem,

} from "@material-tailwind/react";
import {
    HomeIcon,
    CurrencyDollarIcon,
    BuildingStorefrontIcon,
    QuestionMarkCircleIcon,
    Bars2Icon,
    ShoppingCartIcon
  } from "@heroicons/react/24/outline";

const navListItems = [
    {
      label: "HOME",
      icon: HomeIcon,
      path:"/"
    },
    {
      label: "STORE",
      icon: BuildingStorefrontIcon,
      path:""
    },
    {
      label: "SELL",
      icon: CurrencyDollarIcon,
      path:"/seller"
    },
    {
      label: "FAQ",
      icon: QuestionMarkCircleIcon,
      path:"/faq"
    },
    {
      label: "CART",
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
            className="text-md font-[550] hover:font-[700] "
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