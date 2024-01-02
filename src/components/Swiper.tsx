'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

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
      <h1 className=" p-[1rem] py-0 font-[550] text-stone-800 text-[1.7rem]  text-center">
        Sample Image{" "}
      </h1>
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
            <SwiperSlide>
              <Image
                width={1000}
                height={1000}
                src={`${image}`}
                alt="slide_image"
                className=" max-w-[16rem] max-h-[22rem] lg:max-w-[22rem] lg:max-h-[28rem] bg-cover rounded-xl"
              />
            </SwiperSlide>
          ))}

        <div className="slider-controler">
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default SwiperImage;
