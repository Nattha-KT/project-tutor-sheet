
import  AccordionCustomDetails  from "@/components/sheet/AccordionCustomDetails";
import CardProfile from "@/components/CardProfile";
import { getSheetById } from "@/services/server/user/api";
import Image from "next/image";
import ShowMoreSheet from "@/components/sheet/ShowMoreSheet";
import { fetchSheetBySearch } from "@/services/server/seller/api";
import Swiper from "@/components/Swiper";
import Comment from "../_components/Comment";
import { ViewColumnsIcon,BookOpenIcon,ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Metadata } from "next";
import { Rate } from "antd";

export const metadata: Metadata = {
  title: 'SUT-SHEET',
  description: 'Market for sell sheet summary',
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
})


export default async function InfoSheet({params}: {params: { id: string }}) {

  const sheet = await getSheetById(params.id);
 if(!sheet) return (
  <div className=" bg-red-300 flex justify-center items-center text-3xl font-semibold">something wrong!</div>
 )
 const sheetShow = await fetchSheetBySearch(sheet.sid!,4,0,"")


  return (
    <div className=" container flex flex-col px-5 sm:px-[3.5rem] gap-y-6 flex-1 mb-4 min-h-screen">
      <section id="point-view" className=" flex flex-col lg:flex-row gap-y-16">
        <div
          id="profile-header"
          className="flex flex-[0.7] gap-x-5 flex-col items-center gap-y-6"
        >
          <div id="cover-page" className="flex justify-center lg:justify-start">
            <Image
              width={600}
              height={600}
              src={`${sheet.cover_page}`}
              alt="emoji"
              className=" shadow-xl rounded-2xl max-w-[260px] max-h-[350px] md:max-w-[450px] md:max-h-[550px] bg-cover "
            />
          </div>
          <div
            id="profile"
            className="w-[80%] lg:w-[100%] 2xl:w-[80%] bg-stone-50/30 rounded-2xl shadow-lg px-3"
          >
            <CardProfile {...sheet.seller} {...sheet} />
          </div>
        </div>
        <div
          id="content"
          className="flex-1 flex flex-col p-2 md:pl-10 xl:pl-5 md:py-0 gap-0.5 md:gap-y-2"
        >
          <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-gray-800 mb-2">{`${sheet.course_code} ${sheet.name}`}</h2>
          <div className="flex flex-col sm:flex-row gap-x-7">
            <p className=" font-medium text-[1.1rem] md:text-[1.3rem] text-gray-500">{`${sheet.type}:  ${sheet.semester}/${sheet.year}`}</p>
            <p className=" font-medium text-[1.1rem] md:text-[1.3rem] text-gray-500">{`Date: ${dateFormatter.format(Date.parse(sheet.date))}`}</p>
          </div>
          <div className=" font-medium text-[1.1rem]  md:text-[1.3rem] text-gray-500 flex flex-row items-center">
            <BookOpenIcon className=" w-6 h-6"/>
            {` : ${sheet.num_page}`}
            <div className=" text-sm text-gray-500  ml-[2rem] flex items-center gap-2">
              <Rate allowHalf disabled defaultValue={4.5} className=""/>
              {`(4.5) reviews`}
            </div>
          </div>
          <div className="flex flex-col lg:items-start items-center mb-6  gap-y-5 md:gap-x-10 border-solid border-t-[1px] py-5 border-gray-200">
            <p className=" text-[1.2rem] md:text-[1.3rem] text-gray-600 font-semibold">{`Price: ${sheet.price}฿`}</p>
            <button className="btn border-0 max-w-[60%] px-auto sm:px-16 text-white bg-amber-500 hover:bg-amber-400 rounded-xl shadow-xl">
              <ShoppingCartIcon className=" w-6 h-6"/>
              Cart
            </button>
          </div>
          <AccordionCustomDetails
            data={[
              sheet.suggestion || "",
              sheet.class_details || "",
              sheet.content_details || "",
            ]}
          />
        </div>
      </section>
      <section
        id="carousel"
        className="sm:bg-stone-200/20 w-auto rounded-xl flex flex-col justify-center items-center p-5"
      >
        <span className="flex items-center gap-x-4 text-xl font-[600] text-slate-800">
          <ViewColumnsIcon className=" w-6 h-6 "/>
          Previews
        </span>
        <Swiper images={sheet.samples_page} />
      </section>
      {sheetShow &&(
        <section className=" bg-slate-50 mb-10">
          <ShowMoreSheet dataSheets={sheetShow.sheets} />
        </section>
      )}
      <section>
        <Comment comments={sheet.comment}/>
      </section>
    </div>
  );
}
