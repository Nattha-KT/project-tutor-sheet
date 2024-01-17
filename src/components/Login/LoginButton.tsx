"use client";
import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import React from "react";
import LoginPage from "./LoginForm";
import Dialog from "../dialog/Dialog";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disable?: boolean;
  content?: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
}

export default function LoginButton({
  className,
  content,
  Icon,
  ...props
}: ButtonProps) {
  return (
    <div className="flex justify-center items-center ">
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.001,
            duration: 0.01,
          },
        }}
        viewport={{ once: true }}
        whileHover={{ y: -3, transition: { duration: 0.1 } }}
        onClick={() =>(document.getElementById("modal_button_login") as HTMLDialogElement).showModal()}
        className="btn transition-all duration-300 ease-in-out text-[11px]
                tracking-[2px] font-bold uppercase bg-white py-4 px-5 text-slate-900
                flex shadow-md hover:text-amber-400 hover:bg-white rounded-md  "
      >
        {Icon ? (
          <Icon className="h-[18px] w-[18px]" />
        ) : (
          <CursorArrowRaysIcon className="h-[18px] w-[18px]" />
        )}
        {content ? content : " Sign In"}
      </motion.button>
      <Dialog name_id="modal_button_login" component={() => <LoginPage />} />
    </div>
  );
}
