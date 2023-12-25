"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import {useSession} from "next-auth/react";
import { UpdateSeller } from "@/services/seller/api";

type Banks = {
    id: string
    name: string
  }

  type Seller={
    id:string
    pen_name: string,
    full_name: string,
    phone:string,
    bank_name: string,
    bank_id: string
    address:string,
  }

  interface EditSellerProps {
    banks: Banks[];
    data_seller: Seller;
  }



export default  function EditSeller({ banks, data_seller }: EditSellerProps){

    const { data: session } = useSession();
    const router = useRouter();

    
    const [seller ,setSeller] = useState<Seller>({
        id: "",
        pen_name: data_seller.pen_name,
        full_name: data_seller.full_name,
        phone:data_seller.phone,
        bank_name: data_seller.bank_name,
        bank_id: data_seller.bank_id,
        address:data_seller.address,
    })

    useEffect(() => {
        setSeller( {
            ...seller,
            id : session?.user.sid
        });
    },[session])
    
    const  handleInputChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>{
        const name = e.target.name;
        setSeller( {
            ...seller,
            [name] : e.target.value
        });
    }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if(seller){
      console.log(seller);
      toast.loading("Sending request... 🚀👩🏾‍🚀",{id:"1"});
      const res = await UpdateSeller(seller);
      console.log(res);
      if (res && res.message === "Error"){
        toast.error("Error ! 🚀✖️",{id:"1"});
      }else{
        toast.success("Update successfully! 🚀✔️",{id:"1"})
        setTimeout(() => {
            router.back();
        },1000);
      }
      }else toast.error("Error !!  🚀✖️",{id:"1"});

  };

  return (
   <div className='flex justify-center items-center z-10 mb-6'>
    <form className='relative flex flex-col m-6 space-y-8 bg-white drop-shadow-2xl md:flex-row md:space-y-0 rounded-xl' onSubmit={handleSubmit}>
        <div className="space-y-6 p-10 rounded-s-md">
            <div className=" pb-4">
                <div className=" flex gap-4 text-base font-semibold leading-7 text-stone-700 text-[1.5rem] items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                    Edit personal information 💵
                </div>
                <div className="mt-1 text-sm leading-10 text-stone-600">
                    You can edit the information. And don't forget to check the accuracy.
                </div>

                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                    <label htmlFor="pen_name" className="block text-sm font-semibold leading-6 text-stone-600">
                        Pen name
                    </label>
                    <div className="mt-2">
                        <div className="flex px-2 rounded-md shadow-sm ring-1 ring-stone-400   focus-within:ring-amber-500 sm:max-w-md">
                        <input
                            value={seller.pen_name}
                            type="text"
                            onChange={handleInputChange}
                            name="pen_name"
                            id="pen_name"
                            autoComplete="pen_name"
                            className="block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-stone-700 placeholder:text-stone-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder=""
                        />
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="border-b border-stone-900/10 pb-2">
                <h2 className=" text-lg font-semibold leading-7 text-stone-700">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-stone-600">Use a permanent address where you can receive mail.</p>

                <div className="mt-5 grid grid-cols-6 gap-x-6 gap-y-5 sm:grid-cols-6 pb-5">
                    <div className="sm:col-span-4 col-span-5">
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-stone-700">
                            Full name  
                        </label>
                        <div className="mt-2 ">
                            <input
                            value={seller.full_name}
                            type="text"
                            placeholder="(ไม่ต้องมีคำนำหน้า)"
                            onChange={handleInputChange}
                            name="full_name"
                            id="full_name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-stone-700 shadow-sm ring-1  ring-stone-400   focus:ring-amber-500 sm:text-sm sm:leading-6 px-3"
                            />
                        </div>
                    </div>

                

                    <div className="sm:col-span-3 col-span-4">
                    <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-stone-700">
                        Phone
                    </label>
                    <div className="mt-2">
                        <input
                        value={seller.phone}
                        id="phone"
                        onChange={handleInputChange}
                        name="phone"
                        type="text"
                        placeholder='เฉพาะตัวเลข'
                        autoComplete="phone"
                        className="block w-full px-3 rounded-md border-0 py-1.5 text-stone-700 shadow-sm ring-1  ring-stone-400 focus:ring-amber-500 sm:text-sm sm:leading-6 "
                        />
                    </div>
                    </div>

                    <div className="col-span-full">
                    <label htmlFor="address" className="block text-sm font-semibold leading-6 text-stone-700">
                        Address (เพื่อออกใบกำกับภาษี)
                    </label>
                    <div className="mt-2">
                        <textarea
                        value={seller.address}
                        id="address"
                        onChange={handleInputChange}
                        name="address"
                        placeholder="ที่อยู่: บ้านเลขที่ ถนน ตรอก/ซอย หมู่, ตำบล/แขวง, อำเภอ/เขต, จังหวัด, เลขไปรษณีย์"
                        rows={3}
                        className="block px-3 w-full rounded-md border-0 py-1.5 text-stone-700 shadow-sm ring-1  ring-stone-400  focus:ring-amber-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div className="sm:col-span-3 col-span-4">
                    <label htmlFor="country" className="block text-sm font-semibold leading-6 text-stone-700">
                        Bank
                    </label>
                    <div className="mt-2">
                        <select
                        value={seller.bank_name}
                        id="bank_name"
                        onChange={handleInputChange}
                        name="bank_name"
                        autoComplete="bank_name"
                        className="block w-full rounded-md border-0 py-1.5 text-stone-700 shadow-sm ring-1  ring-stone-400  focus:ring-amber-500 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                             <option ></option>
                        {banks && banks.map((bank:any)=>(
                             <option key={bank.id}>{bank.name}</option>
                        ))}
                        </select>
                    </div>
                    </div>

                    <div className="col-span-3">
                        <label htmlFor="street-address" className="block text-sm font-semibold leading-6 text-stone-600">
                        Bank account number
                        </label>
                    <div className="mt-2">
                        <input
                        value={seller.bank_id}
                        type="text"
                        onChange={handleInputChange}
                        placeholder= "numbers onl"
                        name="bank_id"
                        id="bank_id"
                        autoComplete="street-address"
                        className="block w-full px-3 rounded-md border-0 py-1.5 text-stone-700 shadow-sm ring-1 ring-stone-400 focus:ring-amber-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <button className=" btn  border border-white text-md p-2 px-4 rounded-lg mb-6 bg-amber-500 text-white hover:bg-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                        Edit
                </button>

                <a className=" btn  border border-white text-md p-2 px-4 rounded-lg mb-6 " href="/seller">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                        back
                </a>
            </div>
        </div>
    </form>
   </div>


  )
}

