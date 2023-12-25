"use client";

// Ref: https://github.com/soriya2/Login-Form

import { signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useScroll, MotionValue } from "framer-motion";
import Image from "next/image";

interface ImageErrorEvent
  extends React.SyntheticEvent<HTMLImageElement, Event> {
  target: HTMLImageElement;
}

const minRange = 1;
const maxRange = 3;
// import { UserCard } from "./userCard";

function handleGoogleLogin() {
  signIn("google", { callbackUrl: "http://localhost:3000" });
}

function handleFacebookLogin() {
  signIn("facebook", { callbackUrl: "http://localhost:3000" });
}

export default function LoginForm() {
  // get session from nextAuth

  const [randomImage, setRandomImage] = useState<number>(1);

  useEffect(() => {
    setRandomImage(
      Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange
    );
  }, []);

  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress }: { scrollYProgress: MotionValue<number> } =
    useScroll({
      target: ref,
      offset: ["start end", "end start"],
    });

  return (
    <div className="relative flex flex-col  space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
      {/* left side */}
      <div className="flex flex-col text-start px-8  py-2 md:p-14">
        <Image
          width={2000}
          height={2000}
          src="/images/tutor-logo.png"
          alt="Image "
          className="w-20 h-20 mb-4 hidden  md:block object-cover"
        />
        <span className="mb-3 text-4xl font-bold mt-5">Welcome</span>
        <span className="mb-3 text-2xl font-bold">Log in to your account</span>
        <span className="font-light text-gray-400 mb-8">
          Please sign in with google or facebook
        </span>

        <div className="flex justify-between w-full py-4"></div>
        <button
          onClick={() => handleFacebookLogin()}
          className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
        >
          <Image
            width={2000}
            height={2000}
            src="/images/facebook.png"
            alt="Image "
            className="w-6 h-6 inline mr-2"
          />
          Sign in with Facebook
        </button>
        <button
          onClick={() => handleGoogleLogin()}
          className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
        >
          <Image
            width={2000}
            height={2000}
            src="/images/google.png"
            alt="Image "
            className="w-6 h-6 inline mr-2"
          />
          Sign in with Google
        </button>
      </div>
      {/*  right side */}
      <div className="relative">
        <Image
          src={`/images/bg${randomImage}.jpg`}
          onError={(e: ImageErrorEvent) =>
            (e.target.src = "/images/bg1.jpge.jpg")
          }
          width={2000}
          height={2000}
          alt="Image "
          className="w-[400px] h-auto sm:h-full  hidden rounded-r-2xl md:block object-cover"
        />
        {/* text on image   */}
        <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block ml-5">
          <span className="text-white text-md">
            Education is the passport to the future,
            <br />
            for tomorrow belongs to those who prepare for it today
          </span>
        </div>
      </div>
    </div>
  );
}
