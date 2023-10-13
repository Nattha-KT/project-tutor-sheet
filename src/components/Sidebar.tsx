
'use client'
// https://youtu.be/wUMrXQaCj0Y?si=WpBiJ2X8dCzaOzKX
//https://github.com/Streamline6/Responsive-Side-Navbar/blob/main/components/SideNavbar.js
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineEditNote,
  MdNoteAdd,
  MdOutlineLogout,
} from "react-icons/md";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import {useSession} from "next-auth/react";


function SideNavbar( {className}:{className:string}) {
  const [isLeft, setIsLeft] = useState(false);
  const router = useRouter();

  const HandleShowSide = () => {
    isLeft ? setIsLeft(false):setIsLeft(true);
  }

  const {data:session,update} = useSession();

  return (
    
    <>
    {session?.user.role == "SELLER" ? (
        <Disclosure as="nav" className={`${className}`}>
        <Disclosure.Button className=" fixed right-[15px] z-[1] inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900
         hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
         onClick={()=>HandleShowSide()}
         >
          <GiHamburgerMenu
            className="block h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className={`p-6 h-[500px] rounded-lg shadow-md fixed bg-white z-[15] top-[120px]
         ${isLeft ? 'left-0' : '-left-96'} w-60 peer:transition ease-out delay-200 duration-200`}
         tabIndex={0}
         onBlur={() =>setIsLeft(false) }
         >
          <div className="flex flex-col justify-start item-center " >
            <div className='flex justify-center pb-6  border-gray-100 border-b'>
                <img src="/images/tutor-logo.png" alt="img" className="w-[66px] h-[66px] object-cover" />
            </div>
            <div className=" my-4 border-b border-gray-100 pb-4">
              <a className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                href="/seller">
                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Dashboard
                </h3>
              </a>  
              <a className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
               href="seller/new-sheet">
                <MdNoteAdd className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  New Sheet
                </h3>
              </a>
              <a className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              href="seller/edit-seller">
                <MdOutlineEditNote className="text-2xl text-gray-600 group-hover:text-white " />
                <a className="text-base text-gray-800 group-hover:text-white font-semibold "
                 href="/edit-seller">
                  Edit
                </a>
              </a>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Analytics
                </h3>
              </div>
        
            </div>
        
            {/* logout */}
            <div className=" my-4">
              <div className="flex  justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    ):(<></>)}
    </>
   
  );
}

export default SideNavbar;