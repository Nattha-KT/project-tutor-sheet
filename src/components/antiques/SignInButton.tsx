'use client'

import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link'
import Image from 'next/image';


export default  function SignInButton() {
    const { data: session } = useSession();
    let admin = false;
    if (session?.user && session.user.role == "ADMIN") {admin = true}
  return (
    <div>
      {session?.user ? (
      <div className="dropdown  dropdown-bottom dropdown-end ml-3">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Image  src={session?.user.image || ""} alt={'My Image'} width={300} height={200}/>
          </div>
        </label>
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-44">
          <li>
            <a className="justify-between">Favorite sheet 💖</a>
          </li>
          <li><a>Settings</a></li>
          {admin && (<li><Link href="/admin/permision">Permision</Link></li>)}
          {admin && (<li><Link href="/admin/manage_faq">Manage FAQ</Link></li>)}
          <li><a onClick={() => signOut()}>Logout</a></li>
        </ul>
    </div>
    ):( <Link  type="button" href={"/login"} className="btn-nav thai-font drop-shadow-lg  bg-slate-800 text-white p-2 rounded-lg ml-3 hover:text-black hover:border hover:border-gray-300">
      Sign in</Link>)}
    </div>
  )
}

