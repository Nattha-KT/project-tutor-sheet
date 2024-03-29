import "./globals.css";
import type { Metadata } from "next";
import { ComplexNavbar } from "../components/nav/ComplexNavbar";
import NextAuthWrapper from "@/context/NextAuthWrapper";
import Head from "next/head";
import ToasterContext from "@/context/ToasterContext";

import { Inter, Lato, Source_Sans_3 } from "next/font/google";
import Footer from "@/components/Footer";
import { getAuthSession } from "@/lib/auth";
import { AppWrapper } from "@/context/AppContext";

// const inter = Inter({ subsets: ["latin"] });
const lato = Source_Sans_3({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tutor Sheet",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* เพิ่ม link เพื่อกำหนด favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${lato.className}`}>
        <NextAuthWrapper session={session}>
          <AppWrapper>
            <div className=" mb-20">
              <ComplexNavbar className="flex justify-center" />
            </div>
            <main className=" mx-auto min-h-screen min-w-full z-10">
              {children}
            </main>
          </AppWrapper>
        </NextAuthWrapper>
        <ToasterContext />
        <Footer />
      </body>
    </html>
  );
}
