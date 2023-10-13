'use client'
import Link from "next/link"
import {motion} from "framer-motion"
import {
  FaMoneyBill,
  FaQuestion,
  FaUserTie,
} from "react-icons/fa"
import {
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Step } from "@material-tailwind/react";

const content = {
  headling :{
    title: "Where Createtivity Meets Structure",
    subTitle:"How it works",
    description:"lorem ipsum dolor sit amet, consectetur lorem ipsum dolor lorem ipsum dolor lorem ipsum dolordasds asdasdaa asdasdk"
  },
  steps:[
    {
      number:"01",
      img:'/images/recoment1.jpg',
      icon:FaUserTie,
      titile:"Projext Initial",
      description:"Lorem ipsum dolor sit amet, consectetur",
      btn:{
        href:"/about-us",
        label:"Click Here"
      }
    },
    {
      number:"02",
      img:'/images/recoment2.jpg',
      icon:FaMoneyBill,
      titile:"Conceptual Design",
      description:"Lorem ipsum dolor sit amet, consectetur",
      btn:{
        href:"/seller",
        label:"Click Here"
      }
    },
    {
      number:"03",
      img:'/images/recoment3.jpg',
      icon:FaQuestion,
      titile:"Construction Document",
      description:"Lorem ipsum dolor sit amet, consectetur",
      btn:{
        href:"/faq",
        label:"Click Here"
      }
    }
  ],
  // features:[
  //   {
  //     icon:BiHardHat,
  //     title:"Design Dev",
  //     description:"lorem ipsum dolor sit amet, consectetur lorem ipsum dolor lorem ipsum dolor",
  //     btn:{
  //       href:"#",
  //       label:"Click Here",
  //     }
  //   },
  //   {
  //     icon:BiBulb,
  //     title:"Construction Administratoion",
  //     description:"lorem ipsum dolor sit amet, consectetur lorem ipsum dolor lorem ipsum dolor",
  //     btn:{
  //       href:"#",
  //       label:"Learn More ",
  //     }
  //   },
  //   {
  //     icon:BiOutline,
  //     title:"Post Occupancy Evaluation",
  //     description:"lorem ipsum dolor sit amet, consectetur lorem ipsum dolor lorem ipsum dolor",
  //     btn:{
  //       href:"#",
  //       label:"Learn More ",
  //     }
  //   },
  //   {
  //     icon:BiLayer,
  //     title:"Schematic Design",
  //     description:"lorem ipsum dolor sit amet, consectetur lorem ipsum dolor lorem ipsum dolor",
  //     btn:{
  //       href:"#",
  //       label:"Learn More ",
  //     }
  //   }
  // ]
}

export default function RecommendSheet({className}:{className:string}) {
  return (
   <>
   <section id="RecomendedSection" className={`${className}`}>
      <div className=" container mx-auto w-11/12">
        <div className="2xl:flex justify-center mb-20 lg:mb-36 ">
          <div className=" lg:px-0 w-full 2xl:w-9/12 lg:flex-col gap-0 items-center">
            <div className=" lg:w-7/12 mb-5 lg:mb-2">
              {content.headling.subTitle &&(
                <motion.span
                initial={{opacity: 0,y:20}}
                whileInView={{
                  opacity:1,
                  y:0,
                  transition:{
                    delay:0.2,
                    duration:0.5,
                  }
                }} 
                viewport={{once:true}}
                className=" uppercase tracking-[3px] text-md mb-5
                inline-block text-gray-500">
                {content.headling.subTitle}
              </motion.span>
              )}
              {content.headling.title &&(
                <motion.h2
                initial={{opacity: 0,y:20}}
                whileInView={{
                  opacity:1,
                  y:0,
                  transition:{
                    delay:0.3,
                    duration:0.5,
                  }
                }} 
                viewport={{once:true}}
                className="text-2xl lg:text-4xl">
                {content.headling.title}
                </motion.h2>
              )}
             
            </div>
            <div className="lg:w-5/12 self-end xl:mb-10">
              {content.headling.description && (
                <motion.p
                initial={{opacity: 0,y:20}}
                whileInView={{
                  opacity:1,
                  y:0,
                  transition:{
                    delay:0.6,
                    duration:0.5,
                  }
                }} 
                viewport={{once:true}}
               className="text-gray-500">
               {content.headling.description}
             </motion.p>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:w-12/12 -mb-72 mt-8 mx-auto">
              {content.steps && content.steps.map((step:any,idx:any) =>{
                idx *= 0.2
                return (
                  <motion.div
                  key={idx}
                    initial={{opacity: 0,y:30}}
                    whileInView={{
                      opacity:1,
                      y:0,
                      transition:{
                        delay:idx,
                        duration:0.4,
                      }
                    }} 
                    viewport={{once:true}}
                    whileHover={{y:-10,transition: { duration: 0.1 }}}
                  className={`group duration-300 pt-32 pl-10 pr-10 pb-10 rounded-md
                  bg-white relative overflow-hidden shadow-md hover:shadow-2xl sm:h-[360px]`} > 
                    <span className={`inline-block z-[1]
                     absolute  -top-[250px] opacity-70 hover:opacity-30 left-0 leading-0`}>
                    <img
                    src={step.img}
                    alt="img"
                    className="w-[730px] lg:w-[560px] h-[620px] rounded-r-md shadow-md sm:block object-cover z-[15]"/>
                     
                    </span>
                    <div className=" absolute top-2 right-2">
                      <span className=" text-3xl text-sky-800 duration-300 
                      transition-all ease-in-out group-hover:text-teal-600">
                        <step.icon/>
                      </span>
                    </div>
               
                    <div>
                      <h3 className=" group-hover:text-[20px]  text-[18px] mb-4 duration-300 transition-all
                       ease-in-out group-hover:text-sky-950  font-semibold ">
                        {step.titile}
                      </h3>
                      <p className=" leading-relaxed text-[15px] text-gray-900 mb-7 duration-300
                       transition-all ease-in-out group-hover:text-teal-700 group-hover:text-[16px]">
                        {step.description}
                      </p>
                      <p className="z-[20] absolute ">
                        <a href={step.btn.href}
                        className="Z-[30] text-[13px] tracking-[2px] uppercase border-b-2 pb-2
                        inline-block border-sky-800 duration-300 transition-all ease-in-out
                        group-hover:border-teal-600 group-hover:text-slate-700 group-hover:text-[17px]">
                          {step.btn.label}
                        </a>
                      </p>
                    </div>
                    
                  </motion.div>
                )
              }) }
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <motion.div 
       initial={{opacity:0,y:20}}
       whileInView={{opacity:1,y:0,transition:{delay:0.2,duration:0.5, timeline: "incorrect-offset 50%",}}}
       viewport={{once:true,}}
       className=" container flex justify-center pt-72 lg:pt-[220px] pb-16 bg-slate-100 mb-6 px-6 mx-auto ">
        <div className=" text-center lg:w-7/12">
          <p className="leading-relaxed text-[15px] text-stone-700 duration-300 pb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad provident explicabo, 
            ipsum consequatur obcaecati labore eius voluptate impedit incidunt quibusdam alias nulla 
            cum laboriosam magnam iusto libero reprehenderit, ab odit.
          </p>
         <div className="flex justify-center items-center ">
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
            href="/login"
            className="transition-all duration-300 ease-in-out text-[11px]
            tracking-[2px] font-bold uppercase bg-white py-4 px-5 text-slate-900
            flex shadow-md hover:shadow-lg  hover:text-amber-400 rounded-md  ">
           <CursorArrowRaysIcon className="h-[18px] w-[18px]"/>
            Sign In
          </motion.a>

         </div>
        </div>
       
      </motion.div>
    </section>
   </> 
  )
}