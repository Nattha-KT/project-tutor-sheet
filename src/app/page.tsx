
import Link from "next/link";
// import { useState, useEffect, cache } from "react";
import Nav from"../components/Nav";
import Head from 'next/head'
import Display from "../components/Display";
import Title from "../components/componentsHome/Title";
import RecommendSheet from "@/components/componentsHome/RecommendSheet";
import Footer from "@/components/componentsHome/Footer";





export default async function Home() {

  return (
  <div className=" flex-1 justify-center">
    <div className="">
     <Title className="pb-0 lg:pb-10"/>
     <RecommendSheet className="pb-0 lg:pb-10"/>
    </div> 
     <Footer/>
  </div>
    
  );
}







