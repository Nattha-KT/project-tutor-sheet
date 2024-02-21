"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaMoneyBill, FaQuestion, FaUserTie } from "react-icons/fa";
import React from "react";
import ButtonLogin from "../store/StoreButton";
import LoginButton from "../Login/LoginButton";
import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import content from "@/constant/home";
import StoreButton from "../store/StoreButton";
import Link from "next/link";

export default function GuideTutorSheet() {
  const { data: session } = useSession();
  return (
    <>
      <section aria-label="RecomendedSection" className={`pb-0 lg:pb-5`}>
        <div className=" container mx-auto w-11/12">
          <div className="2xl:flex justify-center mb-20 lg:mb-36 ">
            <div className=" lg:px-0 w-full 2xl:w-9/12 lg:flex-col gap-0 items-center">
              <div className=" lg:w-7/12 mb-5 lg:mb-2">
                {content.headling.subTitle && (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.2,
                        duration: 0.5,
                      },
                    }}
                    viewport={{ once: true }}
                    className=" uppercase tracking-[3px] text-md mb-5
                inline-block text-gray-500"
                  >
                    {content.headling.subTitle}
                  </motion.span>
                )}
                {content.headling.title && (
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.3,
                        duration: 0.5,
                      },
                    }}
                    viewport={{ once: true }}
                    className="text-2xl lg:text-4xl"
                  >
                    {content.headling.title}
                  </motion.h2>
                )}
              </div>
              <div className="lg:w-5/12 self-end xl:mb-10">
                {content.headling.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.6,
                        duration: 0.5,
                      },
                    }}
                    viewport={{ once: true }}
                    className="text-gray-500"
                  >
                    {content.headling.description}
                  </motion.p>
                )}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:w-12/12 -mb-72 mt-8 mx-auto">
                {content.steps &&
                  content.steps.map((step: any, idx: any) => {
                    idx *= 0.2;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: idx,
                            duration: 0.4,
                          },
                        }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10, transition: { duration: 0.1 } }}
                        className={`group duration-300 pt-32 pl-10 pr-10 pb-10 rounded-md
                  bg-white relative overflow-hidden shadow-md hover:shadow-2xl sm:h-[360px]`}
                      >
                        <span
                          className={`inline-block z-[1]
                     absolute  -top-[250px] opacity-70 hover:opacity-30 left-0 leading-0`}
                        >
                          <Image
                            priority={true}
                            width={2000}
                            height={2000}
                            src={step.img}
                            alt="img"
                            className="w-[770px] lg:w-[560px] h-[620px] rounded-r-md shadow-md sm:block object-cover z-[15]"
                          />
                        </span>

                        <div className=" absolute top-2 right-2">
                          <span
                            className=" text-3xl text-sky-800 duration-300 
                      transition-all ease-in-out group-hover:text-teal-600"
                          >
                            <step.icon />
                          </span>
                        </div>

                        <div className="mb-[60px] sm:mb-0">
                          <h3
                            className=" group-hover:text-[20px]  text-[18px] mb-4 duration-300 transition-all
                       ease-in-out group-hover:text-sky-950  font-semibold "
                          >
                            {step.titile}
                          </h3>
                          <p
                            className=" leading-relaxed text-[15px] text-gray-900 mb-7 duration-300
                       transition-all ease-in-out group-hover:text-teal-700 group-hover:text-[16px]"
                          >
                            {step.description}
                          </p>
                          <p className="z-[20] absolute ">
                            <Link
                              prefetch={true}
                              href={step.btn.href}
                              className="Z-[30] text-[13px] tracking-[2px] uppercase border-b-2 pb-2
                        inline-block border-sky-800 duration-300 transition-all ease-in-out
                        group-hover:border-teal-600 group-hover:text-slate-700 group-hover:text-[17px]"
                            >
                              {step.btn.label}
                            </Link>
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section aria-label="Lead to">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.2,
              duration: 0.5,
              timeline: "incorrect-offset 50%",
            },
          }}
          viewport={{ once: true }}
          className="  flex justify-center pt-72 lg:pt-[220px] pb-16 bg-slate-100 px-6 mx-auto "
        >
          <div className=" text-center lg:w-7/12">
            <p className="leading-relaxed text-[15px] text-stone-700 duration-300 pb-5">
            "If you're ready, feel free to visit our store now. You'll encounter a seamless user experience, whether it's for making purchases or browsing content. It's easy, with minimal steps. Dive in and start exploring!"
            </p>
            {!session?.user ? (
              <LoginButton/>
            ) : (
              <StoreButton/>
            )}
          </div>
        </motion.div>
      </section>
    </>
  );
}
