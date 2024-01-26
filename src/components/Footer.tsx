'use client'
import React,{useRef} from "react";
import { Typography } from "@material-tailwind/react";
import {motion,useScroll,useTransform,MotionValue, delay  } from 'framer-motion'

 
const LINKS = [
  {
    title: "Product",
    // items: ["Overview", "Market","Sell"],
    items: [{name:"Overview",href:"#Title"},
           {name:"Market",href:"/store"},
           {name:"Sell",href:"/seller"}],
    // ref:["#Title","/","/seller"]
  },
  {
    title: "Resource",
    items:  [{name:"Help",href:"/help"},
            {name:"FAQ",href:"/faq"},
            {name:"About Us",href:"/about-us"},],
  },
];
 
const currentYear = new Date().getFullYear();
 
export default function Footer() {

  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress }: { scrollYProgress: MotionValue<number> } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageScroll1 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);



  return (
    <section id="Footer" className=" container min-w-full relative w-full bg-slate-950 text-white p-8">
      <motion.footer
              initial={{opacity:-30,x:20}}
              whileInView={{
                opacity:1,
                x:1,
                transition:{
                  delay:0.4,
                  duration:0.5,
                }
              }}
              className=" "
              viewport={{once:true}}
              style={{y:imageScroll1}}
              >
        
          <div className="mx-auto w-full max-w-full mt-5">
            <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
              <Typography variant="h5" className="mb-6">
                  <svg width="240" height="25" viewBox="0 0 370.02912621359224 41.62478677853547" className="css-1j8o68f">
                <defs id="SvgjsDefs8445"></defs>
                <g id="SvgjsG8446" transform="matrix(0.5663412657254713,0,0,0.5663412657254713,-2.831352559774121,-7.5047482122481455)" fill="#ffffff">
                  <path xmlns="http://www.w3.org/2000/svg" fill="#ffffff" d="M94.958,45.535c-0.125-0.49-0.519-0.866-1.013-0.97l-0.605-0.126v-8.461l0.987-0.844  c0.39-0.332,0.553-0.86,0.419-1.354s-0.541-0.867-1.045-0.958l-5.545-1.006l0.002-7.124l-0.002-0.147l1.021-0.872  c0.389-0.333,0.553-0.861,0.419-1.354c-0.134-0.495-0.541-0.868-1.045-0.959l-44.817-8.087c-0.348-0.064-0.705,0.015-0.994,0.217  L8.013,37.709C7.357,38.073,4.955,39.722,5,44.305c0.051,4.977,2.996,7.237,3.122,7.331c0.017,0.013,0.036,0.021,0.054,0.033  c0.03,0.021,0.06,0.04,0.091,0.058c0.033,0.019,0.067,0.035,0.102,0.051c0.031,0.015,0.062,0.028,0.096,0.04  c0.038,0.014,0.076,0.024,0.115,0.034c0.022,0.007,0.043,0.016,0.065,0.021l2.051,0.43c-0.333,0.905-0.559,2.039-0.544,3.464  c0.025,2.466,0.76,4.264,1.511,5.463l-1.589,1.107c-0.66,0.368-3.058,2.02-3.011,6.596c0.05,4.977,2.994,7.242,3.123,7.331  c0.111,0.076,0.333,0.193,0.521,0.236l47.014,9.865c0.005,0.001,0.01,0.003,0.015,0.004l1.679,0.352  c0.09,0.019,0.182,0.028,0.272,0.028c0.312,0,0.618-0.111,0.86-0.317l30.899-26.394c0.385-0.329,0.549-0.848,0.424-1.337  c-0.126-0.49-0.519-0.866-1.014-0.97l-0.552-0.115v-7.131l4.229-3.612C94.919,46.543,95.084,46.024,94.958,45.535z M57.416,50.386  c0.313,0,0.619-0.111,0.861-0.318l27.244-23.271v8.426l-28.35,24.112V50.36C57.254,50.375,57.335,50.386,57.416,50.386z   M10.065,40.479l44.45,9.327v8.97l-44.45-9.308V40.479z M12.128,74.086v-8.982l44.449,9.329v8.982L12.128,74.086z M15.238,60.931  v-7.675l40.421,8.481c0.005,0.001,0.009,0.003,0.014,0.004l1.679,0.352c0.091,0.019,0.182,0.028,0.272,0.028  c0.312,0,0.619-0.111,0.861-0.317l0.735-0.629l0.444,0.093v8.979L15.238,60.931z M87.652,59.79L59.243,83.975l-0.009-8.987  c0.081,0.016,0.163,0.025,0.245,0.025c0.312,0,0.618-0.11,0.86-0.317l1.499-1.28l0.663,0.139c0.09,0.019,0.182,0.028,0.271,0.028  c0.313,0,0.619-0.111,0.861-0.317L87.652,52.74V59.79z M90.736,46.629L62.331,70.806l-0.01-8.983  c0.082,0.015,0.163,0.025,0.244,0.025c0.313,0,0.619-0.111,0.861-0.317l27.314-23.332L90.736,46.629z">
                  </path>
                </g>
                <g id="SvgjsG8447"  transform="matrix(1.0947653180340888,0,0,1.0947653180340888,69.93085781167518,-7.128581892032308)" fill="#ffffff">
                  <path d="M11.543 40 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 l0 -22.5 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l7.8125 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 l-5.0586 0 l0 19.746 q0 1.1328125 -0.810546875 1.943359375 t-1.9434 0.81055 z M3.7305 17.5 q-1.15234375 0 -1.953125 -0.80078125 t-0.80078 -1.9531 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 z M36.0159375 40 q-4.16015625 0 -7.34375 -2.67578125 q-0.80078125 -0.68359375 -1.58203125 -1.77734375 t-1.3184 -2.6367 t-0.53711 -3.5938 l0 -14.57 q0 -1.1328125 0.810546875 -1.943359375 t1.9434 -0.81055 t1.9434 0.81055 t0.81055 1.9434 l0 14.57 q0 1.9140625 0.810546875 3.046875 t2.0215 1.6309 t2.4414 0.49805 q1.2109375 0 2.421875 -0.498046875 t2.0215 -1.6309 t0.81055 -3.0469 l0 -6.9141 q0 -1.1328125 0.810546875 -1.943359375 t1.9434 -0.81055 q1.15234375 0 1.953125 0.810546875 t0.80078 1.9434 l0 6.9141 q0 2.05078125 -0.52734375 3.59375 t-1.3184 2.6367 t-1.5918 1.7773 q-3.18359375 2.67578125 -7.32421875 2.67578125 z M44.0239375 17.5 q-1.1328125 0 -1.943359375 -0.80078125 t-0.81055 -1.9531 q0 -1.1328125 0.810546875 -1.943359375 t1.9434 -0.81055 q1.15234375 0 1.953125 0.810546875 t0.80078 1.9434 q0 1.15234375 -0.80078125 1.953125 t-1.9531 0.80078 z M60.46878125 40 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 l0 -22.5 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l7.8125 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 l-5.0586 0 l0 19.746 q0 1.1328125 -0.810546875 1.943359375 t-1.9434 0.81055 z M52.65628125 17.5 q-1.15234375 0 -1.953125 -0.80078125 t-0.80078 -1.9531 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 z M87.96871875 40 q3.84765625 0 7.03125 -1.89453125 t5.0781 -5.0684 t1.8945 -7.0215 q0 -3.73046875 -1.9140625 -7.0703125 q-1.85546875 -3.14453125 -4.98046875 -5.01953125 q-0.703125 -0.37109375 -1.42578125 -0.37109375 q-0.33203125 0 -1.03515625 0.17578125 t-1.3281 1.1719 q-0.37109375 0.6640625 -0.37109375 1.3671875 q0 0.3515625 0.185546875 1.07421875 t1.1621 1.3281 q1.97265625 1.171875 3.0859375 3.125 t1.1133 4.2188 q0 2.32421875 -1.142578125 4.248046875 t-3.0762 3.0762 t-4.2773 1.1523 q-2.32421875 0 -4.2578125 -1.15234375 t-3.0859 -3.0762 t-1.1523 -4.248 q0 -0.703125 0.1171875 -1.38671875 l0.039063 -0.42969 q0 -0.8984375 -0.5859375 -1.69921875 q-0.7421875 -1.03515625 -2.1875 -1.03515625 q-0.8984375 0 -1.69921875 0.576171875 t-0.99609 1.709 t-0.19531 2.2656 q0 3.84765625 1.89453125 7.021484375 t5.0684 5.0684 t7.041 1.8945 z M109.02348125 40 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 l0 -11.25 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l9.7266 0 q1.7578125 0 2.40234375 -1.25 q0.41015625 -0.76171875 0.41015625 -1.62109375 q0 -0.83984375 -0.41015625 -1.6015625 q-0.64453125 -1.26953125 -2.40234375 -1.26953125 q-1.1328125 0 -1.943359375 -0.80078125 t-0.81055 -1.9531 q0 -1.1328125 0.810546875 -1.943359375 t1.9434 -0.81055 q3.75 0 6.25 2.6953125 q2.0703125 2.48046875 2.0703125 5.68359375 q0 3.22265625 -2.0703125 5.68359375 q-2.5 2.6953125 -6.25 2.6953125 l-6.9727 0 l0 8.4961 q0 1.1328125 -0.810546875 1.943359375 t-1.9434 0.81055 z M124.29678125 40 q-0.7421875 0 -1.42578125 -0.41015625 t-1.0352 -1.1328 l-2.4023 -4.8242 q-0.2734375 -0.625 -0.2734375 -1.23046875 q0 -1.640625 1.54296875 -2.4609375 q0.625 -0.29296875 1.23046875 -0.29296875 q1.640625 0 2.44140625 1.54296875 l2.4023 4.8438 q0.2734375 0.60546875 0.2734375 1.23046875 q0 1.640625 -1.54296875 2.44140625 q-0.60546875 0.29296875 -1.2109375 0.29296875 z M148.2421875 27.969 q1.1328125 0 1.943359375 -0.810546875 t0.81055 -1.9434 t-0.81055 -1.9434 t-1.9434 -0.81055 l-14.902 0 q-1.1328125 0 -1.943359375 0.810546875 t-0.81055 1.9434 t0.81055 1.9434 t1.9434 0.81055 l14.902 0 z M165.11684375 40 q-2.6171875 0 -4.970703125 -0.927734375 t-3.9355 -2.6074 q-0.72265625 -0.859375 -0.72265625 -1.875 q0 -0.05859375 0.01953125 -0.64453125 t0.87891 -1.3867 q0.8203125 -0.703125 1.81640625 -0.703125 q0.078125 0 0.6640625 0.01953125 t1.4063 0.87891 q1.15234375 1.15234375 3.18359375 1.5625 q0.859375 0.15625 1.6796875 0.15625 q1.15234375 0 2.24609375 -0.3125 q1.62109375 -0.5859375 1.953125 -1.58203125 q0.13671875 -0.44921875 0.13671875 -0.8984375 t-0.23438 -0.85938 q-0.46875 -0.83984375 -4.6484375 -1.89453125 q-1.58203125 -0.41015625 -3.14453125 -0.9375 q-6.15234375 -2.109375 -6.15234375 -7.6171875 q0 -4.4140625 3.76953125 -6.796875 q2.578125 -1.58203125 6.07421875 -1.58203125 q1.328125 0 2.119140625 0.810546875 t0.79102 1.9824 q-0.05859375 1.15234375 -0.849609375 1.93359375 t-1.9043 0.78125 l-0.17578 0 q-2.28515625 0 -3.57421875 1.0546875 q-0.76171875 0.625 -0.76171875 1.85546875 q0 0.5859375 0.283203125 1.083984375 t1.4258 0.99609 t3.5254 1.1035 q1.50390625 0.390625 3.0078125 0.87890625 t2.7734 1.3281 q3.1640625 2.12890625 3.1640625 5.83984375 q0 0.44921875 -0.0390625 0.91796875 q-0.60546875 5 -5.8203125 6.8359375 q-1.9140625 0.60546875 -3.984375 0.60546875 z M171.97284375 20.078 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 q0 -1.15234375 0.80078125 -1.953125 t1.9531 -0.80078 q1.1328125 0 1.943359375 0.80078125 t0.81055 1.9531 q0 1.1328125 -0.810546875 1.943359375 t-1.9434 0.81055 z M182.0117625 40 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 l0 -22.5 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 l0 22.5 q0 1.1328125 -0.810546875 1.943359375 t-1.9434 0.81055 z M198.9840625 40 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 l0 -22.5 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 l0 22.5 q0 1.1328125 -0.810546875 1.943359375 t-1.9434 0.81055 z M190.3520625 28.75 q-1.1328125 0 -1.943359375 -0.80078125 t-0.81055 -1.9531 q0 -1.1328125 0.810546875 -1.943359375 t1.9434 -0.81055 q1.15234375 0 1.953125 0.810546875 t0.80078 1.9434 q0 1.15234375 -0.80078125 1.953125 t-1.9531 0.80078 z M223.53503125 40 l-14.355 0 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 t0.80078 -1.9434 t1.9531 -0.81055 l14.355 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 t-0.81055 1.9434 t-1.9434 0.81055 z M223.53503125 17.5 l-14.355 0 q-1.15234375 0 -1.953125 -0.80078125 t-0.80078 -1.9531 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l14.355 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 z M223.53503125 28.75 l-14.355 0 q-1.15234375 0 -1.953125 -0.80078125 t-0.80078 -1.9531 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l14.355 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 z M247.499875 40 l-14.355 0 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 t0.80078 -1.9434 t1.9531 -0.81055 l14.355 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 t-0.81055 1.9434 t-1.9434 0.81055 z M247.499875 17.5 l-14.355 0 q-1.15234375 0 -1.953125 -0.80078125 t-0.80078 -1.9531 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l14.355 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 z M247.499875 28.75 l-14.355 0 q-1.15234375 0 -1.953125 -0.80078125 t-0.80078 -1.9531 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l14.355 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 z M263.55471875 40 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 l0 -22.5 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l7.8125 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 l-5.0586 0 l0 19.746 q0 1.1328125 -0.810546875 1.943359375 t-1.9434 0.81055 z M255.74221875 17.5 q-1.15234375 0 -1.953125 -0.80078125 t-0.80078 -1.9531 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 z"></path>
                </g>
              </svg>
              </Typography>
              {/* <p>A source of summary sheets for various subjects. from universities across the country
                For exam tutoring and revision in that subject</p> */}
              <div className="grid grid-cols-2 justify-between gap-1 xl:pl-96">
                {LINKS.map(({ title, items }) => (
                  <ul key={title}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-3 font-medium opacity-80"
                    >
                      {title}
                    </Typography>
                    {items.map((item) => (
                      <li key={item.name}>
                        <Typography
                          as="a"
                          href={item.href}
                          color="gray"
                          className="py-1.5 font-normal text-white transition-colors hover:text-gray-400"
                        >
                          {item.name}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
            <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
              <Typography
                variant="small"
                className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
              >
                &copy; {currentYear} <a href="/">Tutor Sheet</a>. All
                Rights Reserved.
              </Typography>
              <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
                <Typography as="a" href="https://web.facebook.com/natthaphon.kantatham" className="opacity-80 transition-opacity hover:opacity-100">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Typography>
                <Typography as="a" href="https://www.instagram.com/nattha_anun/?igshid=OGQ5ZDc2ODk2ZA%3D%3D" className="opacity-80 transition-opacity hover:opacity-100">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Typography>
                <Typography as="a" href="https://github.com/Nattha-KT?tab=repositories" className="opacity-80 transition-opacity hover:opacity-100">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Typography>
                <Typography as="a" href="https://www.linkedin.com/in/ณัฏฐพล-กันทะถ้ํา-44aa68291" className="opacity-80 transition-opacity hover:opacity-100">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Typography>
              </div>
            </div>
          </div>
      </motion.footer>
    </section>
  );
}