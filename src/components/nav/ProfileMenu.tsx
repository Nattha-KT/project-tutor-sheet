"use client";
import React from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  HeartIcon,
  CheckBadgeIcon,
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  PowerIcon,
  ArrowPathIcon,
  RocketLaunchIcon,
  UserCircleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";

import Image from "next/image";
import LoginForm from "../Login/LoginForm";
import Dialog from "../dialog/Dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfileMenu() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  let admin = false;
  if (session?.user && session.user.role == "ADMIN") {
    admin = true;
  }

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {session?.user ? (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
          <MenuHandler>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
              placeholder={undefined}
            >
              <Image
                width={50}
                height={50}
                alt=""
                src={session?.user.image}
                className="border border-gray-400 p-0.5 rounded-full"
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </MenuHandler>

          <MenuList className=" rounded-2xl" placeholder={undefined}>
            <div className="flex gap-1 items-center p-1 rounded-xl text-center text-sm font-normal text-gray-600 mb-2">
              <UserCircleIcon className=" w-6 h-6" />
              {session?.user.name}
            </div>

            <MenuItem
              placeholder={undefined}
              onClick={() => {
                closeMenu();
                (
                  document.getElementById(
                    "modal-change-account"
                  ) as HTMLDialogElement
                ).showModal();
              }}
              className={`flex items-center gap-2 rounded hover:bg-gray-100 text-slate-500`}
            >
              {React.createElement(ArrowPathIcon, {
                className: `h-4 w-4`,
                strokeWidth: 2,
              })}
              <Typography
                placeholder={undefined}
                as="span"
                variant="small"
                className=" text-[16px] font-medium"
              >
                change account
              </Typography>
            </MenuItem>

            <Link
              href={"/my-library"}
              prefetch={true}
              className=" flex items-center gap-2"
            >
              <MenuItem
                placeholder={undefined}
                // onClick={() => {
                //   closeMenu;
                // }}
                className={`flex items-center gap-2 rounded hover:bg-gray-100 text-slate-500`}
              >
                {React.createElement(BookOpenIcon, {
                  className: `h-4 w-4`,
                  strokeWidth: 2,
                })}
                <Typography
                  placeholder={undefined}
                  as="span"
                  variant="small"
                  className=" text-[16px] font-medium"
                >
                  my library
                </Typography>
              </MenuItem>
            </Link>
            <Link
              href={"/favorite"}
              prefetch={true}
              className=" flex items-center gap-2"
            >
              <MenuItem
                placeholder={undefined}
                className={`flex items-center gap-2 rounded hover:bg-gray-100 text-slate-500`}
              >
                {React.createElement(HeartIcon, {
                  className: `h-4 w-4`,
                  strokeWidth: 2,
                })}
                <Typography
                  placeholder={undefined}
                  as="span"
                  variant="small"
                  className=" text-[16px] font-medium"
                >
                  favorite sheet
                </Typography>
              </MenuItem>
            </Link>

            {admin && (
              <MenuItem
                placeholder={undefined}
                onClick={() => {
                  closeMenu;
                  window.location.href = "/admin";
                }}
                className={`flex items-center gap-2 rounded hover:bg-gray-100 text-slate-500`}
              >
                {React.createElement(RocketLaunchIcon, {
                  className: `h-4 w-4`,
                  strokeWidth: 2,
                })}
                <Typography
                  placeholder={undefined}
                  as="span"
                  variant="small"
                  className=" text-[16px] font-medium"
                >
                  admin
                </Typography>
              </MenuItem>
            )}
            <MenuItem
              placeholder={undefined}
              onClick={signOut}
              className={`flex items-center gap-2 rounded hover:bg-gray-100 hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10`}
            >
              {React.createElement(PowerIcon, {
                className: `h-4 w-4 text-red-500`,
                strokeWidth: 2,
              })}
              <Typography
                placeholder={undefined}
                as="span"
                variant="small"
                className="font-medium text-[16px]"
                color="red"
              >
                sign out
              </Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <>
          <Button
            placeholder={undefined}
            className="flex items-center gap-1 p-3  font-normal rounded-full lg:ml-auto text-sm hover:font-semibold"
            onClick={() =>
              (
                document.getElementById(
                  "my_modal_login_nav"
                ) as HTMLDialogElement
              ).showModal()
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            SignIn
          </Button>
          <Dialog
            name_id="my_modal_login_nav"
            component={() => <LoginForm />}
          />
        </>
      )}
      <Dialog name_id="modal-change-account" component={() => <LoginForm />} />
    </>
  );
}
