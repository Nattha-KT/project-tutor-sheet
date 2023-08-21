'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type Props = {}

export default function signupPage({}: Props) {

  const [user,setUser] = React.useState({
    email:"",
    password:"",
    usernames:"",
  });



  return (
    <div>signup</div>
  )
}