import { CursorArrowRaysIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import React from 'react'
import { useSession} from "next-auth/react";
import LoginPage from '../components_login/LoginPage';
import DialogLogin from '../../components/components_login/DialogLogin';


export default function ButtonLogin() {
    const {data: session} = useSession() 
  return (
    <>
        {!session?.user ? (
            <div className="flex justify-center items-center ">
            <motion.button
                initial={{opacity: 0,y:30}}
                whileInView={{
                  opacity:1,
                  y:0,
                  transition:{
                    delay:0.001,
                    duration:0.01,
                  }
                }} 
                viewport={{once:true}}
                whileHover={{y:-3,transition: { duration: 0.1 }}} 
                onClick={() => (document.getElementById('modal_button_login') as HTMLDialogElement).showModal()}
                className="btn transition-all duration-300 ease-in-out text-[11px]
                tracking-[2px] font-bold uppercase bg-white py-4 px-5 text-slate-900
                flex shadow-md hover:shadow-lg  hover:text-amber-400 rounded-md  ">
              <CursorArrowRaysIcon className="h-[18px] w-[18px]"/>
               Sign In
             </motion.button>
                <DialogLogin name_id='modal_button_login'/>
          </div>
        ):(<div className="flex justify-center items-center ">
        <motion.a
            initial={{opacity: 0,y:30}}
            whileInView={{
              opacity:1,
              y:0,
              transition:{
                delay:0.001,
                duration:0.01,
              }
            }} 
            viewport={{once:true}}
            whileHover={{y:-3,transition: { duration: 0.1 }}} 
           href="/store"
           className="transition-all duration-300 ease-in-out text-[11px]
           tracking-[2px] font-bold uppercase bg-white py-4 px-5 text-slate-900
           flex shadow-md hover:shadow-lg  hover:text-amber-400 rounded-md  ">
          <CursorArrowRaysIcon className="h-[18px] w-[18px]"/>
           Shop Sheet
         </motion.a>
   </div>)}
    </>
  )
}