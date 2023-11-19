'use client'
import React, { use, useEffect, useState } from 'react'
import UploadSamplePage from '@/app/(routes)/seller/new-sheet/_components/UploadSamplePage';
import UploadCoverPage from '@/app/(routes)/seller/new-sheet/_components/UploadCoverPage';
import UploadFile from '@/app/(routes)/seller/new-sheet/_components/UploadFile';
import {message, Image, Progress } from 'antd'
import { useUploadFileAll } from '@/hooks/useUploadFileAll';
import {useSession} from "next-auth/react";

export default function NewSheet() {

    const {data:session} = useSession();
    const sellerId = session && session!.user.sid  ;
    const [isUpload,setIsUpload] =useState(false)
    const [checkFile,setCheckFile] = useState(false);
    const [checkImage,setCheckImage] = useState(false);
    const [checkImageList,setCheckImageList] = useState(false);
    const {
            imageList,setImageList,
            file,setFile,
            image,setImage,
            sheet,setSheet,
            handleUploadFileAll,} = useUploadFileAll(sellerId)
      

    useEffect(()=>{
        setSheet((prevSheet) => ({
            ...prevSheet,sid:sellerId
          }));
    },[sellerId])

    const  handleInputChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>{
        const { name, value } = e.target;
        setSheet((prevSheet) => ({
            ...prevSheet,
            [name]: name !== "price" && name !== "num_page" ? value : parseInt(value, 10),
          }));
    }


    const handleSubmit = async (e:any) => {
        e.preventDefault();
        message.loading("Sending request... 🚀👩🏾‍🚀", 0); // Show loading message
        setIsUpload(true);
        if (!sheet) {
            message.destroy(); // Close the loading message
            return message.error("Error! Sheet not found!! 🚀✖️", 2);
        }
        
        try {
            const res = await handleUploadFileAll();
            if (res == "Success") {
                message.destroy(); // Close the loading message
                message.success("Upload successfully! 🚀✔️", 2);
                setTimeout(() => {
                    window.location.href = "/seller";
                }, 2000);
                    // message.destroy(); // Close the loading message
                    // message.error("Error Upload failed ! 🚀✖️", 2);
            } else {
                message.destroy(); // Close the loading message
                message.error("Error  handleUploadSheet failed! 🚀✖️", 2);
            }
          
        } catch (err:any) {
          message.destroy(); // Close the loading message
          message.error("An error occurred: " + err.message, 2);
        }
      };

    
      
    
  return (
    <div className='flex justify-center items-center z-10 mb-6' >
    <form className='relative flex flex-col m-6 space-y-8 bg-white drop-shadow-2xl md:flex-row md:space-y-0 rounded-xl lg: w-4/4'onSubmit={handleSubmit} >
        <div  className="space-y-12 p-10 rounded-s-md">
            <div className="border-b border-gray-900/10 pb-12">
                <div className='flex justify-center'>
                     <img src="/images/tutor-logo.png" alt="img" className="w-36 h-38  hidden  md:block object-cover" />
                </div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Add new sheets</h2>
                <p className="mt-1 text-sm leading-6">
                     Add new sheets for sale which must be verified.&nbsp;&nbsp;&nbsp;
                     <span className="text-red-600">*Please fill in all fields*</span>
                </p>
                <div className='flex justify-center '>
                     <img src="/warning_new_sheet.png" alt="img" className="max-w-full h-auto  md:w-[750px] md:h-[250px]  md:block object-cover mt-8 rounded-lg" />
                </div>
                
            </div>

            <div className="border-b border-gray-900/10 pb-2">

                <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-6 pb-10">
                    <div className="sm:col-span-4 col-span-5">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Course name&nbsp;&nbsp;
                        </label>
                        <div className="mt-2">
                            <input
                             required
                            type="text"
                            placeholder="ชื่อวิชา รวมข้อมูลที่อยากให้ปรากฎชัดๆบนหน้าปก"
                            onChange={handleInputChange}
                            name="name"
                            id="name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 px-3"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3 col-span-4">
                        <label htmlFor="course_code" className="block text-sm font-medium leading-6 text-gray-900">
                            Course code
                        </label>
                        <div className="mt-2">
                            <input
                             required
                            id="course_code"
                            onChange={handleInputChange}
                            name="course_code"
                            type="text"
                            placeholder='รหัสวิชา'
                            autoComplete="phone"
                            className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 "
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 col-span-4">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Types of sheets
                        </label>
                        <div className="mt-2">
                            <select
                             required
                            id="type"
                            onChange={handleInputChange}
                            name="type"
                            autoComplete="type"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option ></option>
                                <option >midterm</option>
                                <option >final</option>
                                <option >other</option>
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-1 col-span-4">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Semester
                        </label>
                        <div className="mt-2">
                            <select
                             required
                            id="semester"
                            onChange={handleInputChange}
                            name="semester"
                            autoComplete="semester"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option ></option>
                                <option >1</option>
                                <option >2</option>
                                <option >3</option>
                            {/* {banks && banks.map((bank:any)=>(
                                <option key={bank.id}>{bank.name}</option>
                            ))} */}
                            </select>
                        </div>
                        
                    </div>
                    <div className="sm:col-span-1 col-span-4">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                            Year
                        </label>
                        <div className="mt-2">
                            <select
                             required
                            id="year"
                            onChange={handleInputChange}
                            name="year"
                            autoComplete="year"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option ></option>
                                <option >2020</option>
                                <option >2021</option>
                                <option >2022</option>
                            {/* {banks && banks.map((bank:any)=>(
                                <option key={bank.id}>{bank.name}</option>
                            ))} */}
                            </select>
                        </div>
                    </div>
                    <div className="sm:col-span-2 col-span-4">
                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">
                        Number of page
                        </label>
                        <div className="mt-2">
                            <input
                             required
                            type="number"
                            onChange={handleInputChange}
                            placeholder= "จำนวนหน้าของเนื้อหาไม่รวมปก"
                            name="num_page"
                            id="num_page"
                            autoComplete="street-address"
                            className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2 col-span-4">
                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">
                        Price
                        </label>
                        <div className="mt-2">
                            <input
                             required
                            type="number"
                            onChange={handleInputChange}
                            placeholder= "ราคาที่ต้องการวางขาย"
                            name="price"
                            id="price"
                            autoComplete="street-address"
                            className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    

                    <div className="col-span-full">
                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                            Class Details
                        </label>
                        <div className="mt-2">
                            <textarea
                             required
                            id="class_details"
                            onChange={handleInputChange}
                            name="class_details"
                            placeholder="ระบุรายละเอียด เช่น เซคไหน เรียนวันไหน เรียนกับอาจารย์อะไร เนื้อหาเหมือนกันทุกเซคไหม"
                            rows={3}
                            className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                            Content Details
                        </label>
                        <div className="mt-2">
                            <textarea
                             required
                            id="content_details"
                            onChange={handleInputChange}
                            name="content_details"
                            placeholder="ระบุรายละเอียด เช่น มีหัวข้ออะไรบ้าง มีตัวอย่างหรือแบบฝึกทำไหม หรือสามารถระบุตามความเหมาะสม"
                            rows={3}
                            className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                            // defaultValue={''}
                            />
                        </div>
                    </div>

          
                    <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Add a sample image
                        </label>
                        <div className="mt-2">
                        <UploadSamplePage imageList={imageList} setImageList={setImageList} buttonDelete={isUpload} setCheckImageList={setCheckImageList}/>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Cover page
                        </label>
                        <div className="mt-2">
                        <UploadCoverPage image={image} setImage={setImage} buttonDelete={isUpload} setCheckImage={setCheckImage}/>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        File (File size not more than 60MB)
                        </label>
                        <div className="mt-2">
                        <UploadFile file={file} setFile={setFile} buttonDelete={isUpload} setCheckFile={setCheckFile} />
                        </div>
                    </div>

                </div>

                <div className=" flex justify-center ">
                    <p className="mt-1 text-sm leading-6 text-zinc-600">
                    Thank you for joining us Tutor-Sheet
                    </p>
                </div>
            </div>
            <button  className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-amber-500 hover:text-white" hidden={!(checkFile&&checkImage&&checkImageList)} >
                    🚀✨Add new sheet!!✨
            </button> 
        </div>
    </form>
   </div>
  )
}