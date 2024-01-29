"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import {useSession} from "next-auth/react";
import { UpdateSellerByAdmin } from "@/services/client/admin/api";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon as PencilSquareSolidIcon } from "@heroicons/react/24/solid";
import ButtonBack from "@/components/ButtonBack";
import { UpdateSeller } from "@/services/client/seller/api";

type Banks = {
    id: string
    name: string
  }

  type Seller={
    pen_name: string,
    full_name: string,
    phone:string,
    bank_name: string,
    bank_id: string
    address:string,
  }

  interface EditSellerProps {
    banks: Banks[];
    data_seller: any;
  }



export default  function EditSeller({ banks, data_seller }: EditSellerProps){

    const { data: session } = useSession();
    const router = useRouter();
    

    const [sid ,setSid]= useState<string>("")
    const [seller ,setSeller] = useState<Seller>({
        pen_name: data_seller?.pen_name ||"",
        full_name: data_seller?.full_name,
        phone:data_seller?.phone,
        bank_name: data_seller?.bank_name,
        bank_id: data_seller?.bank_id,
        address:data_seller?.address,
    })

    useEffect(() => {
        const id = session?.user.role === "ADMIN" ? data_seller!.id : session?.user.sid
       setSid(id)
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
      toast.loading("Sending request... 🚀👩🏾‍🚀",{id:"1"});
      const res = session?.user.role === "ADMIN" ? await UpdateSellerByAdmin(seller,sid):await UpdateSeller(seller);
      if (res && res.message === "Error"){
        toast.error("Error ! 🚀✖️",{id:"1"});
      }else{
        toast.success("Update successfully! 🚀✔️",{id:"1"})
      }
      }else toast.error("Error !!  🚀✖️",{id:"1"});

  };

  return (
    <form className='relative flex flex-col m-6 space-y-8 bg-white drop-shadow-2xl md:flex-row md:space-y-0 rounded-xl' onSubmit={handleSubmit}>
        <div className="space-y-6 p-10 rounded-s-md">
            <div className=" pb-4">
                <div className=" flex gap-4 text-base font-semibold leading-7 text-stone-700 text-[1.5rem] items-center">
                    <PencilSquareSolidIcon className=" h-8 w-8"/>
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
                <button type="submit" className="flex items-center btn  border border-white text-md p-2 px-4 rounded-lg mb-6 bg-amber-500 text-white hover:bg-amber-600">
                    <PencilSquareIcon className=" w-6 h-6"/>
                        Edit
                </button>
                <ButtonBack/>
            </div>
        </div>
    </form>
 


  )
}

