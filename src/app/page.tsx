
import Hero from "../components/components_home/Hero";
import GuideTutorSheet from "@/components/components_home/Guide";

export default async function Home() {

  return (
  <div className=" flex-1 justify-center">
    <div className=" min-h-screen">
     <Hero className="pb-0 lg:pb-10"/>
     <GuideTutorSheet className="pb-0 lg:pb-5"/>
    </div> 
  </div>
    
  );
}







