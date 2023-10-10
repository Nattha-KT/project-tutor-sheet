
import Faq from "@/components/Faq";
import Footer from "@/components/componentsHome/Footer";

async function fetchFaq(){
    const res = await fetch("http://localhost:3000/api/faq",{
      cache:"no-store", // bypass its cache when making the HTTP request to the specified URL.
       next: {
         tags: ["faq"]
      }
    });
    const data = await res.json();
    return data.faq;
  }


export default async function FaqPage() {

    const data = await fetchFaq();

  return (

      <>
        <div className="sm:flex justify-center sm:px-32">
        <Faq data={data}></Faq>
        </div>
        <Footer/>
      </>
  )
}