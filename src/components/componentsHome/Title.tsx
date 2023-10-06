'use client'
import React,{useRef} from "react";
import Link from 'next/link';
import Image from 'next/image';
import {motion,useScroll,useTransform,MotionValue, delay  } from 'framer-motion'

const content ={
  intro:{
    title:"Last-Minute Camming Night",
    subTitle:"Welcome",
    description:"A collection of various summary sheets from Suranaree University of Technology for preparing for exams in that subject.",
    btn:{
      href:"/sheets",
      label:"View Sheet"
    }
  }
}

export default function Title({className}:{className:string}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress }: { scrollYProgress: MotionValue<number> } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageScroll1 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const imageScroll2 = useTransform(scrollYProgress, [0, 1], ['100%', '-50%']);

  return (
    <section className={`${className}`} ref={ref}>
    
        <div className="2xl:flex justify-center w-full lg:w-10/12 mx-auto h-auto 2xl:h-[400px] lg:min-h-[700px] pt-2 ">
          <div className="lg:w-4/12 z-[3] relative">
            {content.intro.subTitle && (
              <motion.span 
                  initial={{opacity:0,y:20}}
                  whileInView={{opacity:1,y:0,transition:{delay:0.2,duration:0.5, timeline: "incorrect-offset 50%",}}}
                  viewport={{once:true,}}
                  className="uppercase tracking-[3px] text-[20px] mb-5 inline-block text-gray-500"
                  >
                    {content.intro.subTitle}
              </motion.span>
            )}
            {content.intro.title && (
              <motion.h1 
                  initial={{opacity:0,y:20}}
                  whileInView={{opacity:1,y:0,transition:{delay:0.2,duration:0.5, timeline: "incorrect-offset 50%",}}}
                  viewport={{once:true,}}
                  className="text-gray-800 text-3xl sm:text-4xl md:text-5xl 2xl:shadow-xl 2xl:p-6 lg:text-6xl w-auto lg:w-screen max-w-xl mb-4 md:mb-8"
                  >
                    {content.intro.title}
              </motion.h1>
            )}
              {content.intro.description && (
              <motion.p 
                  initial={{opacity:0,y:20}}
                  whileInView={{opacity:1,y:0,transition:{delay:0.2,duration:0.5, timeline: "incorrect-offset 50%",}}}
                  viewport={{once:true,}}
                  className=" leading-relaxed text-gray-500 w-auto
                  lg:w-screen max-w-xl text-base lg:text-lg mb-10 lg:mb-16"
                  >
                    {content.intro.description}
              </motion.p>
            )}
                 {content.intro.btn.label && (
              <motion.p 
                  initial={{opacity:0,y:20}}
                  whileInView={{opacity:1,y:0,transition:{delay:0.2,duration:0.5, timeline: "incorrect-offset 50%",}}}
                  viewport={{once:true,}}
              >
                    <Link href={content.intro.btn.href}
                    className="transition-all duration-300 ease-in-out text-[10px]
                     tracking-[2px] font-bold uppercase bg-slate-900 py-4 px-5 text-white
                      inline-block hover:bg-slate-800 hover:shadow-xl rounded-lg"
                    >
                      {content.intro.btn.label}
                    </Link>
         
              </motion.p>
            )}

          </div>
          <div className="lg:w-5/12 relative">
            <motion.div
              initial={{opacity:0,x:20}}
              whileInView={{
                opacity:1,
                x:1,
                transition:{
                  delay:0.4,
                  duration:0.5,
                }
              }}
              viewport={{once:true}}
              style={{y:imageScroll1}}
              className="z-[2] relative bg-cover bg-center"
              >
              <img
                src={`/images/homewall2.jpg`}
                alt="img"
                className="w-[560px] h-[560px] hidden rounded-r-md shadow-md 2xl:block object-cover"
                />
            </motion.div>
            <motion.div 
              initial={{opacity:0,x:-30}}
              whileInView={{
                opacity:1,
                x:1,
                transition:{
                  delay:0.4,
                  duration:0.5,
                }
              }}
              viewport={{once:true}}
              style={{y:imageScroll2}}
              className=" absolute bottom-0 lg:bottom-[200px] -left-[120px] top-[320px] ">
              <img src={`/images/dots.svg`}
                alt="img dot"
                className=" w-52 hidden  2xl:block" />
            </motion.div>
          </div>
        </div>
      
    </section>
  )
}