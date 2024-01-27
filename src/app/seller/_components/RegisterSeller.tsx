"use client"
import toast, { Toaster } from 'react-hot-toast';
import CheckBox from "@/components/CheckBox";
import useCheckBox from "@/hooks/useCheckBox";
import useRegisterSeller from "@/hooks/useRegisterSeller";
import { AddSeller } from '@/services/client/seller/api';


type Banks = {
    id: string
    name: string
  }


export default  function Register_Seller({ banks }: { banks: Banks[] }){

    // const {data:session,update,status} = useSession();
    const {checkbox,setCheckbox}= useCheckBox();
    const {seller,handleInputChange,updateUser} = useRegisterSeller();
    // console.log(checkbox);


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if(seller){
      toast.loading("Sending request... 🚀👩🏾‍🚀",{id:"1"});
      const res = await AddSeller(seller);
      if (res && res.message == "Error"){
        toast.error("Error ! 🚀✖️",{id:"1"});
      }else{
        updateUser(res.seller.id);
        toast.success("Added successfully! 🚀✔️",{id:"1"})
        setTimeout(() => {
            window.location.reload();
        },1500);
      }
      }else toast.error("Error !!  🚀✖️",{id:"1"});

  };

  return (
   <div className='flex justify-center items-center z-10 mb-6'>
    <form className='relative flex flex-col m-6 space-y-8 bg-white drop-shadow-2xl md:flex-row md:space-y-0 rounded-xl' onSubmit={handleSubmit}>
        <div className="space-y-6 px-10 py-4 rounded-s-md">
            <div className="border-b border-stone-900/10 pb-8">
                <div className="flex items-center mb-10 gap-4 text-[1.6rem] font-[900] leading-7 text-stone-700">
                    <img src="/images/tutor-logo.png" alt="img" className="w-16 h-16  hidden  md:block object-cover" />
                    Apply to be a sheet seller
                </div>
                <h2 className="text-lg font-semibold leading-7 text-stone-700">Public Information💸</h2>
                <p className="mt-1 text-sm text-stone-600 leading-8">
                    This information will be displayed publicly so be careful what you share.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                    <label htmlFor="pen_name" className="block text-sm font-semibold leading-6 text-stone-600">
                        Pen name
                    </label>
                    <div className="mt-2">
                        <div className="flex px-2 rounded-md shadow-sm ring-1 ring-stone-300  focus-within:ring-amber-500 sm:max-w-md">
                        <input
                            type="text"
                            required
                            onChange={handleInputChange}
                            name="pen_name"
                            id="pen_name"
                            autoComplete="pen_name"
                            className="block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-stone-700 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder=""
                        />
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="border-b border-stone-900/10 pb-2">
                <h2 className="text-lg font-semibold leading-7 text-stone-700">Personal Information📂</h2>
                <p className="mt-1 text-sm leading-6 text-stone-600">Use a permanent address where you can receive mail.</p>

                <div className="mt-6 grid grid-cols-6 gap-x-6 gap-y-5 sm:grid-cols-6 pb-6">
                    <div className="sm:col-span-4 col-span-5">
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-stone-600">
                            Full name  
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            required
                            placeholder="(ไม่ต้องมีคำนำหน้า)"
                            onChange={handleInputChange}
                            name="full_name"
                            id="full_name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-stone-700 shadow-sm ring-1 ring-stone-300  focus:ring-amber-500 sm:text-sm sm:leading-6 px-3"
                            />
                        </div>
                    </div>

                

                    <div className="sm:col-span-3 col-span-4">
                    <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-stone-600">
                        Phone
                    </label>
                    <div className="mt-2">
                        <input
                        required
                        id="phone"
                        onChange={handleInputChange}
                        name="phone"
                        type="text"
                        placeholder='เฉพาะตัวเลข'
                        autoComplete="phone"
                        className="block w-full px-3 rounded-md border-0 py-1.5 text-stone-700 shadow-sm ring-1  ring-stone-300  focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 "
                        />
                    </div>
                    </div>

                    <div className="col-span-full">
                    <label htmlFor="address" className="block text-sm font-semibold leading-6 text-stone-600">
                        Address (เพื่อออกใบกำกับภาษี)
                    </label>
                    <div className="mt-2">
                        <textarea
                        required
                        id="address"
                        onChange={handleInputChange}
                        name="address"
                        placeholder="ที่อยู่: บ้านเลขที่ ถนน ตรอก/ซอย หมู่, ตำบล/แขวง, อำเภอ/เขต, จังหวัด, เลขไปรษณีย์"
                        rows={3}
                        className="block px-3 w-full rounded-md border-0 py-1.5 text-stone-700 shadow-sm ring-1  ring-stone-300 focus:ring-amber-500 sm:text-sm sm:leading-6"
                        // defaultValue={''}
                        />
                    </div>
                    {/* <p className="mt-3 text-sm leading-6 text-stone-600">ที่อยู่: บ้านเลขที่ ถนน ตรอก/ซอย หมู่, ตำบล/แขวง, อำเภอ/เขต, จังหวัด, เลขไปรษณีย์</p> */}
                    </div>

                    <div className="sm:col-span-3 col-span-4">
                    <label htmlFor="country" className="block text-sm font-semibold leading-6 text-stone-600">
                        Bank
                    </label>
                    <div className="mt-2">
                        <select
                        required
                        id="bank_name"
                        onChange={handleInputChange}
                        name="bank_name"
                        autoComplete="bank_name"
                        className="block w-full rounded-md border-0 py-1.5 text-stone-700 shadow-sm ring-1  ring-stone-300 focus:ring-amber-500 sm:max-w-xs sm:text-sm sm:leading-6"
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
                        required
                        type="text"
                        onChange={handleInputChange}
                        placeholder= "numbers onl"
                        name="bank_id"
                        id="bank_id"
                        autoComplete="street-address"
                        className="block w-full px-3 rounded-md border-0 py-1.5 text-stone-700 shadow-sm ring-1  ring-stone-300  focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                </div>

                <div className=" flex justify-center ">
                <CheckBox checkbox={checkbox} setCheckbox={setCheckbox}></CheckBox>
                </div>
            </div>
            <div className="flex justify-between">
                <button className={`flex items-center btn text-md p-2 rounded-lg mb-6 bg-amber-500 text-white hover:bg-amber-600 ${(checkbox ?"":"hidden")}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                        ✨Start selling sheets!!✨
                </button>
                <a className=" btn  border border-white text-md p-2 px-4 rounded-lg mb-6 " href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                        back
                </a>
            </div>
        </div>
    </form>
    <Toaster />
   </div>


  )
}

