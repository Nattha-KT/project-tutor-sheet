'use client'
import '../app/globals.css'
import { SessionProvider } from 'next-auth/react'


export default function ProviderWrapper({children,session}: {children: React.ReactNode,session:any}) {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}
