import  AccordionCustomDetails  from "@/components/sheet/AccordionCustomDetails";
import CardProfile from "@/components/CardProfile";
import { getSheetById } from "@/services/server/user/api";
import Image from "next/image";
import ShowMoreSheet from "@/components/sheet/ShowMoreSheet";
import Swiper from "@/components/Swiper";
import Comment from "../../_components/Comment";
import { ViewColumnsIcon,BookOpenIcon,ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Rate } from "antd";
import SomethingWrong from "@/components/error-page/SomethingWrong";
import HeartBtn from "@/components/buttons/HeartBtn";
import ButtonInfoCart from "../../_components/BtnInfoCart";
import { Seller } from "../../../../../../types/type";


const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
})


export default async function InfoSheet({params}: {params: { id: string }}) {

  const sheet = await getSheetById(params.id as string);
  

  if(!sheet) return (
    <><SomethingWrong/></>
  )

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
            <CardProfile seller={sheet.seller as Seller} ratingSeller={sheet.ratingSeller as number}/>
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
          <div className=" font-medium text-[1.1rem] gap-y-2 mb-2  md:text-[1.3rem] text-gray-500 flex flex-col sm:flex-row items-start sm:items-center">
            <div className=" flex gap-1 items-center">
              <BookOpenIcon className=" w-6 h-6"/>
              {` : ${sheet.num_page}`}
            </div>
            <div className=" text-sm text-gray-500 sm:ml-[2rem] flex flex-col-reverse sm:flex-row items-start sm:items-center gap-y-2 gap-x-6">
              <div className=" flex gap-1 items-center">
                <Rate allowHalf disabled defaultValue={sheet.ratingSheet ?sheet.ratingSheet:0} className=""/>
                {`(${sheet.ratingSheet}) ${sheet.reviewserSheet} reviews`}
              </div>
              <div className=" flex items-center pt-0 px-2 text-sm text-gray-500 bg-gray-100 rounded-md shadow-sm border border-gray-200">
                favorite
                <HeartBtn favorite={sheet.favorite} sheetId={sheet.id}/>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:items-start items-center mb-6  gap-y-5 md:gap-x-10 border-solid border-t-[1px] py-5 border-gray-200">
            <p className=" text-[1.2rem] md:text-[1.3rem] text-gray-600 font-semibold">{`Price: ${sheet.price}฿`}</p>
            <ButtonInfoCart sheetId={sheet.id} inCart={sheet.inCart} owner={sheet.owner}/>
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
      {(sheet.sheetShows && sheet.sheetShows.length !== 0 ) &&(
        <section className=" bg-slate-50 mb-10">
          <ShowMoreSheet dataSheets={sheet.sheetShows} />
        </section>
      )}
      <section>
        <Comment comments={sheet.comment}/>
      </section>
    </div>
  );
}
