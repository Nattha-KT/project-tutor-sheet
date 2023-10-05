'use client'
import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {
    Bars2Icon,
  } from "@heroicons/react/24/outline";

import Image from 'next/image';
import ProfileMenu from "./navClient/ProfileMenu";
import NavList from "./navClient/NavList";


export function ComplexNavbar( {className}:{className:string}) {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
//   React.useEffect(() => {
//     window.addEventListener(
//       "resize",
//       () => window.innerWidth >= 960 && setIsNavOpen(false),
//     );
//   }, []);
 
  return (
   <div className={`"flex justify-center" ${className}`}>
       <Navbar className="mx-auto max-w-screen-2xl p-2 lg:rounded-full lg:pl-6 text-slate-900 fixed z-50">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium hover:bg-gray-100 rounded-md p-2"
        >
          <Image  src={"/newlogo.svg"} alt={'My Image'} width={220} height={220}/>

        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
   </div>
  );
}