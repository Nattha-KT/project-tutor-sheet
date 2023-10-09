'use client'
import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Card,
    IconButton,
    menu,
} from "@material-tailwind/react";
import {
    HeartIcon,
    CheckBadgeIcon,
    ChevronDownIcon,
    QuestionMarkCircleIcon,
    PowerIcon,    
  } from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link'

// profile menu component
const profileMenuItems = [
    {
      label: "Permission",
      icon: CheckBadgeIcon,
      path:"/admin/permission"
    },
    {
      label: "Manage FAQ",
      icon: QuestionMarkCircleIcon,
      path:"/admin/manage_faq"
    },
  ];
   
  export default function ProfileMenu() {

    const { data: session } = useSession();
    let admin = false;
    if (session?.user && session.user.role == "ADMIN") {admin = true}
    
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
   
    const closeMenu = () => setIsMenuOpen(false);
   
    return (
        < >
            {session?.user ? (
                <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                <MenuHandler>
                  <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                  >
                    <Avatar
                      variant="circular"
                      size="md"
                      alt="tania andrew"
                      className="border border-gray-400 p-0.5"
                      src={session?.user.image || ""} 
                    />
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`h-3 w-3 transition-transform ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </MenuHandler>
                <MenuList>

                <MenuItem
                        onClick={closeMenu}className={`flex items-center gap-2 rounded hover:bg-gray-100`}>
                        {React.createElement(HeartIcon, {className: `h-4 w-4`,strokeWidth: 2,})}
                        <Typography as="span"
                          href="/"
                          variant="small"
                          className="font-normal"
                      
                        >
                          <a href="/">Favorite Sheet</a>
                        </Typography>
                     
                      </MenuItem>

                  {admin && profileMenuItems.map(({ label, icon,path }, key) => 
                      <MenuItem
                        key={label}
                        onClick={closeMenu}
                        className={`flex items-center gap-2 rounded hover:bg-gray-100 ${
                          label === "Sign Out"
                            ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                            : ""
                        }`}
                      >
                        {React.createElement(icon, {
                          className: `h-4 w-4 ${label === "Sign Out" ? "text-red-500" : ""}`,
                          strokeWidth: 2,
                        })}
                        <Typography
                          as="span"
                          href={path}
                          variant="small"
                          className="font-normal"
                          color={label === "Sign Out" ? "red" : "inherit"}
                        >
                            <a key={label} href={path || "/"}>{label}</a>
                        </Typography>
                     
                      </MenuItem>
                  
                  )}
                 
                   {/* <MenuList tabIndex={0} className="menu rounded p-1 hover:bg-white ">
                        <li className="text-slate-500">
                            <a href="/">{React.createElement(HeartIcon, {className: `h-4 w-4 `,strokeWidth: 2})}Favorite sheet</a>
                        </li>
                        {admin && (<li className="text-slate-500 "><Link href="/admin/permission">{React.createElement(CheckBadgeIcon, {className: `h-4 w-4`,strokeWidth: 2})}Permision</Link></li>)}
                        {admin && (<li className="text-slate-500"><Link href="/admin/manage_faq">{React.createElement(QuestionMarkCircleIcon, {className: `h-4 w-4`,strokeWidth: 2})}Manage FAQ</Link></li>)}
                        <li className="text-slate-500"><a onClick={() => signOut()}>  {React.createElement(PowerIcon, {className: `h-4 w-4 text-red-500`,strokeWidth: 2})}Sign out</a></li>
                    </MenuList> */}
                     <MenuItem
                        onClick={closeMenu}className={`flex items-center gap-2 rounded hover:bg-gray-100 hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10`}>
                        {React.createElement(PowerIcon, {className: `h-4 w-4 text-red-500`,strokeWidth: 2,})}
                        <Typography as="span"
                          onClick={signOut}
                          variant="small"
                          className="font-normal"
                          color="red"
                        >
                          Sign out
                        </Typography>
                      
                      </MenuItem>
                </MenuList>
              </Menu>
            ):(
               
                <Button className="flex items-center gap-1 p-3  font-normal rounded-full lg:ml-auto text-md">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                   </svg>

                    <Link  href={"/login"}>SignIn</Link>
                </Button>
                  
            )}
        </>
      
    );
  }