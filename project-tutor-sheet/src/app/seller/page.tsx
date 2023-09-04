"use client"
import React from 'react';






export default function Seller() {

  return (
   <div className='flex justify-center items-center '>
    <form className='relative flex flex-col m-6 space-y-8 bg-white shadow-xl  md:flex-row md:space-y-0 rounded-2xl'>
        <div className="space-y-12 p-10 rounded-s-md">
            <div className="border-b border-gray-900/10 pb-12">
                <div className='flex justify-center'>
                     <img src="/images/tutor-logo.png" alt="img" className="w-36 h-38  hidden  md:block object-cover" />
                </div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Apply to be a sheet seller</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                    <label htmlFor="pen_name" className="block text-sm font-medium leading-6 text-gray-900">
                        Pen name
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-500 sm:max-w-md">
                        <input
                            type="text"
                            name="pen_name"
                            id="pen_name"
                            autoComplete="pen_name"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder=""
                        />
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 px-3"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Last name
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div className="sm:col-span-4">
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone
                    </label>
                    <div className="mt-2">
                        <input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder='เฉพาะตัวเลข'
                        autoComplete="phone"
                        className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div className="sm:col-span-4">
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                        ID number
                    </label>
                    <div className="mt-2">
                        <input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder='เลขบัตรประชาชน 13 หลัก'
                        autoComplete="phone"
                        className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div className="col-span-full">
                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                        Address (เพื่อออกใบกำกับภาษี)
                    </label>
                    <div className="mt-2">
                        <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                        defaultValue={''}
                        />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">ที่อยู่: บ้านเลขที่ ถนน ตรอก/ซอย หมู่, ตำบล/แขวง, อำเภอ/เขต, จังหวัด, เลขไปรษณีย์</p>
                    </div>

                    <div className="sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Bank
                    </label>
                    <div className="mt-2">
                        <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                        </select>
                    </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Bank account number
                        </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    </div>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                    Bank account number (numbers only)
                    </p>
                </div>
                <button className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-amber-500 hover:text-white">
                    🚀✨Start selling sheets!!✨
             </button>
        </div>
    </form>
   </div>


  )
}