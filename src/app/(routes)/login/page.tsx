'use client'

// Ref: https://github.com/soriya2/Login-Form

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import {motion,useScroll,useTransform,MotionValue, delay  } from 'framer-motion'


const minRange = 1;
const maxRange = 4;
// import { UserCard } from "./userCard";

function handleGoogleLogin(){
    signIn('google',{callbackUrl:"http://localhost:3000"});
}

function handleFacebookLogin(){
    signIn('facebook',{callbackUrl:"http://localhost:3000"});
}

export default function Login() {
    // get session from nextAuth
    
    const [randomImg,setRandomImg] = useState<number>(0) 

    useEffect(() => {
        setRandomImg(Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange);
      }, []);

      const ref = useRef<HTMLDivElement | null>(null);
      const { scrollYProgress }: { scrollYProgress: MotionValue<number> } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
      });
      const imageScroll1 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
    

return (
    <div className="flex items-center justify-center "> {/*min-h-screen*/}
     <motion.div
              initial={{opacity:0,x:-30}}
              whileInView={{
                opacity:1,
                x:1,
                transition:{
                  delay:0.3,
                  duration:0.5,
                }
              }}
              viewport={{once:true}}
              style={{y:imageScroll1}}>
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* left side */}
    
        <div className="flex flex-col  px-8  py-2 md:p-14">
                <div className='flex justify-start mb-4'>
                     <img src="/images/tutor-logo.png" alt="img" className="w-20 h-20  hidden  md:block object-cover" />
                </div>
            <span className="mb-3 text-4xl font-bold mt-5">Welcome</span>
            <span className="mb-3 text-2xl font-bold">Log in to your account</span>
            <span className="font-light text-gray-400 mb-8">
            Please sign in with google or facebook
            </span>

    
            <div className="flex justify-between w-full py-4">
            </div>
            <button onClick={()=>handleFacebookLogin()} className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
            <img src="/images/facebook.png" alt="img" className="w-6 h-6 inline mr-2" />
            Sign in with Facebook
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
            className="w-[400px]  hidden rounded-r-2xl md:block object-cover"
            />
            {/* text on image   */}
            <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block ml-5">
                <span className="text-white text-md"
                    >Education is the passport to the future,<br />for tomorrow belongs to those who prepare for it today
                </span>
            </div>
        </div>

        </div>
        </motion.div>
  </div>
);
}