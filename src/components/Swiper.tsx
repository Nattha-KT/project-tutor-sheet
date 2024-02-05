'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from 'uuid';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import "./Swiper.css";

import Image from "next/image";
interface ArrayStringComponentProps {
    images: string[];
}

const SwiperImage:React.FC<ArrayStringComponentProps>=({images}) =>{
  return (
    <div className="container">
      {/* <h1 className=" p-[1rem] py-0 font-[580] text-slate-800 text-[1.5rem]  text-center">
        Sample Image{" "}
      </h1> */}
      <div className="  xl:ml-[-6.2rem]">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          // loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {images &&
            images.map((image) => (
              <SwiperSlide key={uuidv4()}>
                <Image
                  width={1000}
                  height={1000}
                  src={`${image}`}
                  alt="slide_image"
                  className=" max-w-[16rem] max-h-[22rem] lg:max-w-[22rem] lg:max-h-[28rem] bg-cover rounded-xl"
                />
              </SwiperSlide>
            ))}

          <div className="slider-controler lg:pl-[6.5rem]">
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default SwiperImage;
