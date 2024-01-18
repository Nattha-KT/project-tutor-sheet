'use client'
import React,{useRef} from "react";
import Image from 'next/image';
import {motion,useScroll,useTransform,MotionValue, delay  } from 'framer-motion'

const content ={
  intro:{
    title:"Last-Minute Camming Night",
    subTitle:"Welcome",
    description:"A collection of various summary sheets from Suranaree University of Technology for preparing for exams in that subject.",
    btn:{
      href:"/store",
      label:"View Sheet"
    }
  }
}

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress }: { scrollYProgress: MotionValue<number> } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageScroll1 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const imageScroll2 = useTransform(scrollYProgress, [0, 1], ['100%', '-50%']);

  return (
    <section id="Title" className={`pb-0 lg:pb-10`} ref={ref}>
    
        <div className="2xl:flex justify-center w-11/12 mx-auto h-[450px] 2xl:min-h-[800px] pt-2">
          <div className="lg:w-4/12 z-[3] relative">
            {content.intro.subTitle && (
              <motion.span 
                  initial={{opacity:0,y:20}}
                  whileInView={{opacity:1,y:0,transition:{delay:0.2,duration:0.5, timeline: "incorrect-offset 50%",}}}
                  viewport={{once:true,}}
                  className="uppercase tracking-[3px] text-[20px] mb-5 inline-block text-gray-500 font-medium"
                  >
                    {content.intro.subTitle}
              </motion.span>
            )}
            {content.intro.title && (
              <motion.h1 
                  initial={{opacity:0,y:20}}
                  whileInView={{opacity:1,y:0,transition:{delay:0.2,duration:0.5, timeline: "incorrect-offset 50%",}}}
                  viewport={{once:true,}}
                  className="text-gray-800 text-3xl sm:text-4xl md:text-5xl 2xl:shadow-xl 2xl:p-6 lg:text-6xl w-auto lg:w-screen max-w-xl mb-4 md:mb-8 sm:bg-gray-50 rounded-md"
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
                    whileHover={{y:-4,transition: { duration: 0.1 }}} 
                     href={content.intro.btn.href}
                    className="transition-all duration-300 ease-in-out text-[10px]
                     tracking-[2px] font-bold uppercase bg-slate-900 py-4 px-5 text-white
                      inline-block hover:shadow-md rounded-lg hover:text-amber-400"
                    >
                      {content.intro.btn.label}
                    </motion.a>
         
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
              <Image
                width={2000}
                height={2000}
                priority={true}
                src={`/images/homewall2.jpg`}
                alt="img"
                className="w-full h-[650px] 2xl:h-[720px] hidden rounded-r-md shadow-md 2xl:block object-cover opacity-90"
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
              <Image
                width={2000}
                height={2000}
                priority={true} 
                src={`/images/dots.svg`}
                alt="img dot"
                className=" w-52 hidden  2xl:block" />
            </motion.div>
          </div>
        </div>
      
    </section>
  )
}