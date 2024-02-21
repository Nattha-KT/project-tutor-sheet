'use client'
import Footer from '@/components/Footer'
import React,{useState, useEffect,useRef, useCallback} from 'react'
import {motion} from 'framer-motion'
import {BiChevronLeft,BiChevronRight} from 'react-icons/bi'
import Image from 'next/image'
import {
  FaUserTie,
} from "react-icons/fa"

import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"

const content = {
  heading:{
    title:"Hear What Our Customer Say.",
    subTitle:"lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amets",
  },
  testimonials:[
    {
      img:"/images/homewall.jpg",
      name:"Natthaphonder1",
      titleRole:"Owner website",
      quote :"lorem ipsum dolor sit amet, consectetur lore lorem ipsum dolor sit ",
    },
    {
      img:"/images/recoment2.jpg",
      name:"Natthaphonder2",
      titleRole:"Owner website",
      quote :"lorem ipsum dolor sit amet, consectetur lore lorem ipsum dolor sit ",
    },
    {
      img:"/images/recoment3.jpg",
      name:"Natthaphonder3",
      titleRole:"Owner website",
      quote :"lorem ipsum dolor sit amet, consectetur lore lorem ipsum dolor sit ",
    }
  ]
} 


export default function Aboute() {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [isEnd, setIsEnd] = useState<boolean>();
  const [isBeginning, setIsBeginning] = useState<boolean>();
  const sliderRef = useRef<any>(null); 

  useEffect(()=>{
    setIsEnd(sliderRef.current.swiper.isEnd);
    setIsBeginning(sliderRef.current.swiper.isBeginning); 
  })

  const prevHandler = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const nextHandler = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div>
      <section className=" flex justify-center items-center min-h-screen">
        <div className=' container px-4 mx-auto pt-10'>
          <div className=' flex justify-center'>
            <div className=' w-full md:w-8/12 flex gap-0 items-center'>
              <div className=' text-center w-auto md:w-screen max-w-full md:max-w-xl mx-auto mb-6'>
                {content.heading.subTitle &&(
                    <motion.span
                    initial={{opacity: 0,y:20}}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition:{delay:0.2,duration:0.5}
                    }}
                    viewport={{once:true}} 
                    className=' uppercase tracking-[3px] text-[12px] mb-5 inline-block text-gray-500'>
                      {content.heading.subTitle}
                  </motion.span>
                )}
                {content.heading.title && (
                  <motion.h2
                  initial={{opacity: 0,y:20}}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition:{delay:0.3,duration:0.5}
                  }}
                  viewport={{once:true}} 
                  className=' uppercase tracking-[3px] text-[25px] font-medium mb-5 inline-block text-stone-800'>
                 {content.heading.title}
                 </motion.h2>
                )}
              </div>
            </div>
          </div>
          <div className=' lg:flex justify-start lg:justify-center'>
           <motion.div
            initial={{opacity: 0,y:20}}
            whileInView={{opacity:1,y:0,transition:{delay:0.4,duration:0.5}}}
            viewport={{once:true}}
            className=' w-full lg:w-10/12 lg:flex gap-0 items-center'>
            <Swiper
              ref={sliderRef}
              speed={700}
              spaceBetween={30}
              onSlideChange={(swiper:any)=>setSlideIndex(swiper.activeIndex)}
              className='z-30  mb-7 relative flex '
              >
              {content.testimonials.map((testimonial,idx)=>(
                <SwiperSlide className='w-full  ' key={testimonial.name}>
                  <div className='block md:flex  overflow-y-visible mt-10 items-stretch bg-stone-100 h-full mx-3 my-5 rounded-lg  shadow-lg'>
                    <div className=' md:w-3/12 rounded-l-lg'>
                      <Image 
                        src={testimonial.img}
                        alt={testimonial.name}
                        width={320}
                        height={320}
                        className=' object-cover object-center h-[360px] w-[25rem]  rounded-l-lg  '
                      />
                    </div>
                    <div className=' md:w-8/12 p-7 md:p-16 flex items-center'>
                      <div>
                        <blockquote className=' text-lg mb-7'>
                          <span className=' text-[100px] leading-[0] relative text-stone-600 block'>
                          <FaUserTie className=' w-[30px] h-[30px] mb-6'/>
                          </span>
                          {testimonial.quote}
                        </blockquote>
                        <div className='flex space-x-3 text-sm'>
                          <strong>{testimonial.name}</strong>
                          <span>&mdash;</span>
                          <span>{testimonial.titleRole}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
           </motion.div>
          </div>
          <motion.div
           initial={{opacity: 0,y:20}}
           whileInView={{opacity:1,y:0,transition:{delay:0.9,duration:0.5}}}
           viewport={{once:true}}
           className='flex justify-center mb-10'>
            <div className='flex space-x-3'>
              <div onClick={prevHandler} className={`${isBeginning == true ? " opacity-40 bg-gray-300 text-stone-600 !cursor-pointer"
              :" opacity-100 bg-stone-300 text-white"} relative top-0 group transition-all duration-300
              ease-in-out w-12 h-12 cursor-pointer rounded-full inline-flex justify-center items-center`}>
                <BiChevronLeft className={` text-3xl text-stone-800 transition-all duration-300 ease-in-out
                  group-hover:text-white ${isBeginning == true ?" group-hover:text-gray-600":" group-hover:text-white"}`}/>
              </div>
              <div onClick={nextHandler} className={`${isEnd == true ? " opacity-30 bg-gray-300 text-stone-600 !cursor-pointer"
              :" opacity-100 bg-stone-300 text-white"} relative top-0 group transition-all duration-300
              ease-in-out w-12 h-12 cursor-pointer rounded-full inline-flex justify-center items-center`}>
                <BiChevronRight className={` text-3xl text-stone-800   transition-all duration-300 ease-in-out
                  group-hover:text-white ${isEnd == true ?" group-hover:text-gray-600":" group-hover:text-white"}`}/>
              </div>
            </div>

          </motion.div>
        </div>
      </section>  
    </div>
  )
}