'use client'
import Navbar from "../(components)/Navbar";
import Chatbody from "../(components)/Chatbody";
import Footer from "../(components)/Footer";
import Loading from "../loading";
import { Suspense } from "react";
import sessionStatus from "../utils/session";
import { useSession, signOut } from 'next-auth/react'
import { useState,useEffect } from "react";

import LoginBody from "../(components)/LoginBody";

import React from 'react'

type Props = {}

function page({}: Props) {

  const session = useSession()
 //session tracking
const [logged, setLogged] = useState(false)

useEffect(() => {
  if (session?.status === 'authenticated') {
    setLogged(true)
  }
})
  return (
    <div>
        <Navbar/>
        <Suspense fallback={<Loading/>}>

          {logged ? <Chatbody/>: <LoginBody/>}
        </Suspense>
        <Footer/>
    </div>
  )
}

export default page