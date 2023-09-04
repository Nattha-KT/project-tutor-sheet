'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { callbackify } from "util";


const minRange = 1;
const maxRange = 4;
// import { UserCard } from "./userCard";

function handleGoogleLogin(){
    signIn('google',{callbackUrl:"http://localhost:3000"});
}

export default function Login() {
    // get session from nextAuth
    const { data: session } = useSession();
    const [randomImg,setRandomImg] = useState<number>(0) 

    
    let min = Math.ceil(minRange);
    let max = Math.floor(maxRange);

    useEffect(() => {
        setRandomImg(Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange);
      }, []);
    

return (
    <div className="flex items-center justify-center min-h-screen">
    <div
      className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
    >
      {/* left side */}
      <div className="flex flex-col justify-center p-8 md:p-14">
        <span className="mb-3 text-4xl font-bold">Welcome</span>
        <span className="mb-3 text-2xl font-bold">Log in to your account</span>
        <span className="font-light text-gray-400 mb-8">
        Please sign in with google or facebook
        </span>

   
        <div className="flex justify-between w-full py-4">
          <div className="mr-24">
            <input type="checkbox" name="ch" id="ch" className="mr-2" />
      
          </div>
        </div>
        <button className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
          <img src="/images/facebook.png" alt="img" className="w-6 h-6 inline mr-2" />
          Sign in with Google
        </button>
        <button onClick={() => handleGoogleLogin()}
          className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
        >
          <img src="/images/google.png" alt="img" className="w-6 h-6 inline mr-2" />
          Sign in with Google
        </button>
       
      </div>
      {/*  right side */}
      <div className="relative">
        <img
          src={`/images/bg${randomImg}.jpg`}
          alt="img"
          className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
        />
        {/* text on image   */}
        <div
          className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
        >
          <span className="text-white text-xl"
            >Education is the passport to the future,<br />for tomorrow belongs to those who prepare for it today
          </span>
        </div>
      </div>
    </div>
  </div>
);
}