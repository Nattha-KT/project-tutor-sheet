'use client'
import { Button } from '@material-tailwind/react';
import useHelp from '@/hooks/useHelp';
import {useRouter} from 'next/navigation'
import { useSession } from "next-auth/react"
import { useEffect, useMemo, useState } from 'react';
import addComplaint from '../../../../actions/add-complaint-action';

// @ts-ignore
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast';


export default function HelpComponent() {

    const router = useRouter()
    const { data: session } = useSession()
    console.log(session)
    // const uid = useMemo(()=> session?.user.id,[session])
    const [userId,setUserId] = useState<string>("")

    useEffect(()=>{
        setUserId(session?.user.id)
    },[session])
    
    const handleSubmit = async (e:any,formData:FormData) => {
        e.preventDefault();
         toast.loading("Sending request... 🚀👩🏾‍🚀",{id:"1"});
          const result = await addComplaint(formData, userId);
          if(result.success) {
          toast.success("Upload successfully! 🚀✔️",{id:"1"})
          setTimeout(() => {
            router.back();
          }, 1000);
          }else{
          toast.error(result.error,{id:"1"});
          }
      };

  return (
  <div className=' sm:px-10'>
    <form  onSubmit={(e)=>handleSubmit(e,new FormData(e.target as HTMLFormElement))}
        className=' flex flex-col space-y-6 bg-white drop-shadow-2xl md:space-y-6 rounded-xl lg:min-w-[60rem] min-w-full p-8 sm:px-16 ' >
        <div className="border-b border-gray-900/10 pb-2">
        <div className=' flex justify-center font-[1000] text-2xl text-gray-600 mb-6 gap-x-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            COMPLAINT
        </div>
            <div className=" grid grid-cols-6 gap-x-2 gap-y-4 sm:grid-cols-6 pb-10">
                <div className="sm:col-span-6 col-span-5">
                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-500">
                    Title&nbsp;&nbsp;
                    </label>
                    <div className="mt-2">
                        <input
                        required
                        type="text"
                        placeholder="ชื่อวิชา รวมข้อมูลที่อยากให้ปรากฎชัดๆบนหน้าปก"
                        name="head"
                        id="head"
                        autoComplete="given-name"
                        className="block w-full sm:w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 px-3"
                        />
                    </div>
                </div>

                <div className="sm:col-span-1 col-span-3">
                    <label htmlFor="country" className="block text-sm font-semibold leading-6 text-gray-500">
                    Category
                    </label>
                    <div className="mt-2">
                        <select
                        required
                        id="Category"
                        name="category"
                        autoComplete="category"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option ></option>
                            <option >something</option>
                            <option >final</option>
                            <option >all term</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-1 col-span-3">
                    <label htmlFor="country" className="block text-sm font-semibold leading-6 text-gray-500">
                    Role
                    </label>
                    <div className="mt-2">
                        <select
                        required
                        id="role"
                        name="role"
                        autoComplete="role"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option ></option>
                            <option >Seller</option>
                            <option >User</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-1 col-span-3">
                    <label htmlFor="country" className="block text-sm font-semibold leading-6 text-gray-500">
                    Piority Level
                    </label>
                    <div className="mt-2">
                        <select
                        required
                        id="level"
                        name="level"
                        autoComplete="level"
                        className="block w-4/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                        <option ></option>
                        <option >Hight</option>
                        <option >Medium</option>
                        <option >Low</option>
                        </select>
                    </div>
                    
                </div>

                <div className="col-span-full">
                    <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-500">
                        Complaint content
                    </label>
                    <div className="mt-2">
                        <textarea
                        required
                        id="content"
                        name="content"
                        placeholder="ระบุรายละเอียด"
                        rows={3}
                        className="block px-3 w-full min-h-[13rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className='flex justify-between'>
            <Button type='submit' color="green" className='text-white hover:text-gray-200'
            // onClick={handleSubmit}
                >Submit now
            </Button>

            <a className=" btn  border border-white text-md p-2 px-4 rounded-lg "  onClick={()=> router.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                back
            </a>
        </div>

    </form>
  </div> 
  )
}