"use client"
import { Fragment, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import {useSession} from "next-auth/react";


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
    image:string
  }

  const AddSeller = async (seller:Seller) => {
    const res = fetch("http://localhost:3000/api/seller",{
      method: "POST",
      body: JSON.stringify(seller),
      // @ts-ignore
      "Content-Type":"application/json",
    //   'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
    });
    return (await res).json();
  };


export default  function Register_Seller({ banks }: { banks: Banks[] }){

    const {data:session,update,status} = useSession();
    
    const [seller ,setSeller] = useState<Seller>({
        pen_name: "",
        full_name: "",
        phone:"",
        bank_name: "",
        bank_id: "",
        address:"",
        image:""
    })

    useEffect(() => {
        // เมื่อ session มีค่าและ image ไม่ได้ถูกตั้งค่าใน state แล้ว
        if (status === 'authenticated' && !seller.image) {
          // ดึงข้อมูลรูปภาพจาก session
          const userImage = session?.user?.image || '';
    
          // ตั้งค่า state
          setSeller((prevSeller) => ({
            ...prevSeller,
            image: userImage,
          }));
        }
      }, [session, seller, status]);

    async function updateUser(seller_id:string){
        await update({
            ...session,
            user:{
                ...session?.user,
                role:"SELLER",
                sid:seller_id,
            }
        })
    }

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
      const res = await AddSeller(seller);
      if (res && res.message == "Error"){
        toast.error("Error ! 🚀✖️",{id:"1"});
      }else{
        updateUser(res.seller.id);
        await toast.success("Added successfully! 🚀✔️",{id:"1"})
        setTimeout(() => {
            window.location.reload();
        },500);
      }
      }else toast.error("Error !!  🚀✖️",{id:"1"});

  };

  return (
   <div className='flex justify-center items-center z-10 mb-6'>
    <form className='relative flex flex-col m-6 space-y-8 bg-white drop-shadow-2xl md:flex-row md:space-y-0 rounded-xl' onSubmit={handleSubmit}>
        <div className="space-y-12 p-10 rounded-s-md">
            <div className="border-b border-gray-900/10 pb-12">
                <div className='flex justify-center'>
                     <img src="/images/tutor-logo.png" alt="img" className="w-36 h-38  hidden  md:block object-cover" />
                </div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Apply to be a sheet seller💸</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                    <label htmlFor="pen_name" className="block text-sm font-medium leading-6 text-gray-900">
                        Pen name
                    </label>
                    <div className="mt-2">
                        <div className="flex px-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-500 sm:max-w-md">
                        <input
                            type="text"
                            onChange={handleInputChange}
                            name="pen_name"
                            id="pen_name"
                            autoComplete="pen_name"
                            className="block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder=""
                        />
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="border-b border-gray-900/10 pb-2">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-6 pb-10">
                    <div className="sm:col-span-4 col-span-5">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Full name  
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            placeholder="(ไม่ต้องมีคำนำหน้า)"
                            onChange={handleInputChange}
                            name="full_name"
                            id="full_name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 px-3"
                            />
                        </div>
                    </div>

                

                    <div className="sm:col-span-3 col-span-4">
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone
                    </label>
                    <div className="mt-2">
                        <input
                        id="phone"
                        onChange={handleInputChange}
                        name="phone"
                        type="text"
                        placeholder='เฉพาะตัวเลข'
                        autoComplete="phone"
                        className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 "
                        />
                    </div>
                    </div>

                    <div className="col-span-full">
                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                        Address (เพื่อออกใบกำกับภาษี)
                    </label>
                    <div className="mt-2">
                        <textarea
                        id="address"
                        onChange={handleInputChange}
                        name="address"
                        placeholder="ที่อยู่: บ้านเลขที่ ถนน ตรอก/ซอย หมู่, ตำบล/แขวง, อำเภอ/เขต, จังหวัด, เลขไปรษณีย์"
                        rows={3}
                        className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                        // defaultValue={''}
                        />
                    </div>
                    {/* <p className="mt-3 text-sm leading-6 text-gray-600">ที่อยู่: บ้านเลขที่ ถนน ตรอก/ซอย หมู่, ตำบล/แขวง, อำเภอ/เขต, จังหวัด, เลขไปรษณีย์</p> */}
                    </div>

                    <div className="sm:col-span-3 col-span-4">
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Bank
                    </label>
                    <div className="mt-2">
                        <select
                        id="bank_name"
                        onChange={handleInputChange}
                        name="bank_name"
                        autoComplete="bank_name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                             <option ></option>
                        {banks && banks.map((bank:any)=>(
                             <option key={bank.id}>{bank.name}</option>
                        ))}
                        </select>
                    </div>
                    </div>

                    <div className="col-span-3">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Bank account number
                        </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        onChange={handleInputChange}
                        placeholder= "numbers onl"
                        name="bank_id"
                        id="bank_id"
                        autoComplete="street-address"
                        className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                </div>

                <div className=" flex justify-center ">
                    <p className="mt-1 text-sm leading-6 text-zinc-600">
                    Thank you for joining us Tutor-Sheet
                    </p>
                </div>
            </div>
            <button className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-amber-500 hover:text-white">
                    🚀✨Start selling sheets!!✨
            </button>
        </div>
    </form>
    <Toaster />
   </div>


  )
}

