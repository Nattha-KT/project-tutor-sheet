import React, { useEffect } from 'react'
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react";
import SignInButton from './SignInButton';


function Nav() {

  return (
    
    <div className="navbar py-0 bg-white drop-shadow-md border rounded-b-2xl px-32">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl hover:bg-slate-100 border-2 border-neutral-100"  href={"/"} >
    <Image  src={"/tutor-sheet-black.svg"} alt={'My Image'} width={200} height={100}/>
    </a>
  </div>
  
  <div className=" flex justify-end flex-1 px-2">
    <div className="flex items-stretch">
      <a className="btn btn-ghost rounded-btn  btn-nav" href={"/"}>หน้าหลัก</a>
      <a className="btn btn-ghost rounded-btn  btn-nav" >ซื้อชีท</a>
      <a className="btn btn-ghost rounded-btn  btn-nav" href={"/seller"}>ขายชีท</a>
      <a className="btn btn-ghost rounded-btn  btn-nav" href={"/faq"}>คำถาม</a>
    </div>

    <div className="dropdown dropdown-bottom dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </label>
      <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    <SignInButton/>
  </div>
</div>

  )
}

export default Nav