'use client'
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
 
interface ArrayStringComponentProps {
    image: string[];
  }

const  CarouselCompo:React.FC<ArrayStringComponentProps>=({image})=> {
    console.log(image);
  return (
    <Carousel className="rounded-xl w-[100%] min-[450px]:w-[60%] xl:w-[28%] h-auto shadow-2xl">

      {image && image.map((img) =>(
        <Image width={1000} height={1000} src={img} alt="image-sample" className="h-auto max-h-[420px] bg-cover"/>
      ))}

    </Carousel>
  );
}

export default CarouselCompo