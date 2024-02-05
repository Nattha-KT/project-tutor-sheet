import React, { FC } from 'react'
import { cn } from "@/lib/utils";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    disable?:boolean;
    customIcon?:string
    Icon?: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>>
  }

const   IconButton:FC<ButtonProps>=({Icon,className,customIcon,disable,...props})=> {
  return (
    <button {...props} className={cn(" flex items-center  rounded-full",className,{})}>
      {Icon &&(
        <Icon className={cn(" w-4 h-4 text-blue-300 hover:scale-150",customIcon,)}/>
       )}
    </button>
  )
}

export default IconButton