
import Title from "../components/components_home/Title";
import RecommendSheet from "@/components/components_home/RecommendSheet";
import Footer from "@/components/components_home/Footer";





export default async function Home() {

  return (
  <div className=" flex-1 justify-center">
    <div className=" min-h-screen">
     <Title className="pb-0 lg:pb-10"/>
     <RecommendSheet className="pb-0 lg:pb-5"/>
    </div> 
     <Footer/>
  </div>
    
  );
}







