
import  AccordionCustomDetails  from "@/components/sheet/AccordionCustomDetails";
import CardProfile from "@/components/CardProfile";
import { getSheetById } from "@/services/server/user/api";
import Image from "next/image";
import ShowMoreSheet from "@/components/sheet/ShowMoreSheet";
import { fetchSheetBySearch } from "@/services/server/seller/api";
import Swiper from "@/components/Swiper";
import Comment from "../_components/Comment";
import { ViewColumnsIcon } from '@heroicons/react/24/outline'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'SUT-SHEET',
  description: 'Market for sell sheet summary',
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
})


export default async function InfoSheet({params,}: {params: { id: string };}) {

  const sheet = await getSheetById(params.id);
 if(!sheet) return (
  <div className=" bg-red-300 flex justify-center items-center text-3xl font-semibold">something wrong!</div>
 )
 const sheetShow = await fetchSheetBySearch(sheet.sid!,4,0,"")


  return (
    <div className=" container flex flex-col px-5 sm:px-[70px] gap-y-6 flex-1 mb-4 min-h-screen">
      <section id="point-view" className=" flex flex-col lg:flex-row gap-y-16">
        <div
          id="profile-header"
          className="flex flex-[0.7] gap-x-5 flex-col items-center lg:items-start gap-y-6"
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
          className="flex-1 flex flex-col p-2 md:pl-5 md:py-0 gap-0.5 md:gap-y-2"
        >
          <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-gray-800 mb-2">{`${sheet.course_code} ${sheet.name}`}</h2>
          <div className="flex gap-x-7">
            <p className=" font-medium text-[1.1rem] md:text-[1.3rem] text-gray-500">{`${sheet.type}:  ${sheet.semester}/${sheet.year}`}</p>
            <p className=" font-medium text-[1.1rem] md:text-[1.3rem] text-gray-500">{`Date: ${dateFormatter.format(Date.parse(sheet.date))}`}</p>
          </div>
          <div className=" font-medium text-[1.1rem]  md:text-[1.3rem] text-gray-500 flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            {` : ${sheet.num_page}`}
          </div>
          <div className="flex flex-col md:items-start items-center mb-6  gap-y-5 md:gap-x-10 border-solid border-t-[1px] py-5 border-gray-200">
            <p className=" text-[1.2rem] md:text-[1.3rem] text-gray-600 font-semibold">{`Price: ${sheet.price}฿`}</p>
            <button className="btn border-0 max-w-[60%] px-16 text-white bg-amber-500 hover:bg-amber-400 rounded-xl shadow-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
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
          Sample Images
        </span>
        {/* <Swiper images={sheet.samples_page} /> */}
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
