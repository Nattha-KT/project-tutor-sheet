"use client"
import React from "react";
import { Typography, MenuItem, Badge } from "@material-tailwind/react";
import {
  HomeIcon,
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
  QuestionMarkCircleIcon,
  Bars2Icon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

const navListItems = [
  {
    label: "HOME",
    icon: HomeIcon,
    path: "/",
  },
  {
    label: "STORE",
    icon: BuildingStorefrontIcon,
    path: "/store",
  },
  {
    label: "SELL",
    icon: CurrencyDollarIcon,
    path: "/seller",
  },
  {
    label: "FAQ",
    icon: QuestionMarkCircleIcon,
    path: "/faq",
  },
  // {
  //   label: "CART",
  //   icon: ShoppingCartIcon,
  //   path:"/cart"
  // },
];

export default function NavList() {

  const {countCart} = useAppContext()
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center z-50">
      {navListItems.map(({ label, icon, path }, key) => (
        <Typography
          placeholder={undefined}
          key={label}
          href={path}
          as="a"
          variant="small"
          color="blue-gray"
          className="text-md font-[550] hover:font-[700] "
        >
          <MenuItem
            placeholder={undefined}
            className="flex items-center gap-2 lg:rounded-full"
          >
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Typography>
      ))}

      <Typography
        placeholder={undefined}
        key="CART"
        as="a"
        href="/cart"
        variant="small"
        color="blue-gray"
        className="text-md font-[550] hover:font-[700] "
      >
        <Badge content={countCart} className=" rounded-full px-[0.4rem]">
          <MenuItem
            placeholder={undefined}
            className="flex items-center gap-2 lg:rounded-full"
          >
            {React.createElement(ShoppingCartIcon, {
              className: "h-[18px] w-[18px]",
            })}{" "}
            CART
          </MenuItem>
        </Badge>
      </Typography>
    </ul>
  );
}
