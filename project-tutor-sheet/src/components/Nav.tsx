"use client";
import Link from 'next/link'
import React, { useEffect } from 'react'
import Image from 'next/image'
import logo from '../img/logo.png'

// import 'flowbite/dist/flowbite.min.css'; // Import Flowbite styles
// import 'flowbite/dist/flowbite.min.js';  // Import Flowbite scripts
import { Navbar } from "flowbite-react";

function Nav() {

  return (
    
    <div>
    <nav className=' bg-gray-100 shadow-lg flex-col justify-center items-center' >
      <div className=" blue-grey darken-1 px-10">
        <Link  href="#!" className="brand-logo  blue-grey-text text-darken-3">
       LOGO
        </Link>
        <Link href="#" data-target="mobile-demo" className="sidenav-trigger "><i className="material-icons">menu</i></Link>
        <ul className="right hide-on-med-and-down ">
          <li><Link href="sass.html" className='blue-grey-text text-darken-3'>Sass</Link></li>
          <li><Link href="badges.html" className='text-nav'>Components</Link></li>
          <li><Link href="collapsible.html" className='text-nav'>Javascript</Link></li>
          <li><Link href="mobile.html" className='text-nav'>Mobile</Link></li>
          <li><a className="waves-effect waves-light btn" >button</a></li>
        </ul>
      </div>

      
    </nav>

  <ul className="sidenav" id="mobile-demo">
    <li><Link href="sass.html">Sass</Link></li>
    <li><Link href="badges.html">Components</Link></li>
    <li><Link href="collapsible.html">Javascript</Link></li>
    <li><Link href="mobile.html">Mobile</Link></li>
  </ul>
    </div>



    


  )
}

export default Nav