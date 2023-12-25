'use client'
import React, { useEffect, useState } from 'react'
import { PropSheet  } from '../../../../types/type'
import toast from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@material-tailwind/react";
import { DialogDeleteSheet } from '@/components/dialog';
import { useDeleteSheet } from '@/hooks/useDeleteSheet';
import { UpdateSheet } from '@/services/seller/api';
  
 type Sheet = {
    course_code:string,
    name:string,
    semester:string,
    type:string,
    year: string,
    class_details:string,
    content_details:string,
  }


export default  function EditSheet({sheet}: {sheet:PropSheet}) {

    const [updateSheet,setUpdateSheet] = useState<Sheet>({
        course_code:sheet.course_code,
        name:sheet.name,
        semester:sheet.semester,
        type:sheet.type,
        year: sheet.year,
        class_details:sheet.class_details,
        content_details:sheet.content_details,
    });
    const [years, setYears] = useState<number[]>([]);
    const {DeleteSheet,deleteFilesInDirectory}= useDeleteSheet();


    const  handleInputChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>{
        const { name, value } = e.target;
        setUpdateSheet((prevSheet) => ({
            ...prevSheet,
            [name]: value,
          }));
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if(updateSheet&&sheet){
          toast.loading("Sending request... 🚀👩🏾‍🚀",{id:"1"});
          const res = await UpdateSheet(updateSheet,sheet.id);
          if (res && res.message == "Error"){
            toast.error("Error ! 🚀✖️",{id:"1"});
          }else{
            toast.success("Update successfully! 🚀✔️",{id:"1"})
          }
          }else toast.error("Error !!  🚀✖️",{id:"1"});
      };

      
      const handleDelete = async () => {
        try {
          toast.loading("Deleting request... 🚀👩🏾‍🚀", { id: "1" });
    
          const deleteSheetPromise = DeleteSheet(sheet.id);
          const deleteFilesPromise = deleteFilesInDirectory(sheet.file_path);
      
          // Wait for both promises to complete
          await Promise.all([deleteFilesPromise,deleteSheetPromise]);
      
          toast.success("Deleted! 🚀✔️", { id: "1" });
      
          // Use a Promise-based setTimeout to make it asynchronous
          await new Promise((resolve) => setTimeout(resolve, 500));
      
          window.location.reload();
        } catch (error) {
          console.error("Error occurred during deletion:", error);
          toast.error("Error occurred during deletion: DeleteSheet", { id: "1" });
        }
      };


      useEffect(()=>{
        const startYear = 2020;
        const currentYear = new Date().getFullYear();
        const yearsArray = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);
        setYears(yearsArray);
    },[])



   
  return (

    <form className='relative flex flex-col min-w-full space-y-6 bg-white drop-shadow-2xl md:flex-row md:space-y-0 rounded-xl lg: w-4/4' >
        <div  className="space-y-6 p-8 rounded-s-md">
            <div className="border-b border-gray-900/10 pb-2">
            <div className=' flex justify-center font-[1000] text-2xl text-gray-600 mb-6 gap-x-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                EDIT SHEET
            </div>
                <div className=" grid grid-cols-6 gap-x-6 gap-y-4 sm:grid-cols-6 pb-10">
                    <div className="sm:col-span-4 col-span-5">
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-500">
                        Course name&nbsp;&nbsp;
                        </label>
                        <div className="mt-2">
                            <input
                            required
                            value={updateSheet.name}
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
                        <label htmlFor="course_code" className="block text-sm font-semibold leading-6 text-gray-500">
                            Course code
                        </label>
                        <div className="mt-2">
                            <input
                            required
                            value={updateSheet.course_code}
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
                        <label htmlFor="country" className="block text-sm font-semibold leading-6 text-gray-500">
                        Types of sheets
                        </label>
                        <div className="mt-2">
                            <select
                            required
                            id="type"
                            value={updateSheet.type}
                            onChange={handleInputChange}
                            name="type"
                            autoComplete="type"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option ></option>
                                <option >midterm</option>
                                <option >final</option>
                                <option >all term</option>
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-3 col-span-4">
                        <label htmlFor="country" className="block text-sm font-semibold leading-6 text-gray-500">
                        Semester
                        </label>
                        <div className="mt-2">
                            <select
                            required
                            value={updateSheet.semester}
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
                            </select>
                        </div>
                        
                    </div>
                    <div className="sm:col-span-3 col-span-4">
                        <label htmlFor="country" className="block text-sm font-semibold leading-6 text-gray-500">
                            Year
                        </label>
                        <div className="mt-2">
                            <select
                            required
                            id="year"
                            value={updateSheet.year}
                            onChange={handleInputChange}
                            name="year"
                            autoComplete="year"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                             <option ></option>
                             {years.map((year) => (
                             <option key={year}>{year}</option>
                             ))}
                            </select>
                        </div>
                    </div>
                    

                    <div className="col-span-full">
                        <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-500">
                            Class Details
                        </label>
                        <div className="mt-2">
                            <textarea
                            required
                            value={updateSheet.class_details}
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
                        <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-500">
                            Content Details
                        </label>
                        <div className="mt-2">
                            <textarea
                            required
                            value={updateSheet.content_details}
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

                </div>
            </div>
            <div className='flex justify-between'>
            <Button color="amber" className='text-white hover:text-slate-900'
            onClick={handleSubmit}
            >Edit now</Button>
            <Button color="red" className='text-white hover:text-slate-900'
              onClick={() => (document.getElementById(`${sheet.id}_delete`) as HTMLDialogElement).showModal()}
            >Delete</Button>
                <DialogDeleteSheet name_id={sheet.id+"_delete"} handleDelete={handleDelete}/>
            </div>
        </div>
    </form>
  )
}