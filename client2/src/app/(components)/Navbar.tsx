'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Limelight } from "next/font/google";
import { useSession, signOut } from 'next-auth/react'
import { useState,useEffect } from "react";


type Props = {};

function Navbar({}: Props) {
  const session = useSession()
 //session tracking
const [logged, setLogged] = useState(false)

useEffect(() => {
  if (session?.status === 'authenticated') {
    setLogged(true)
  }
})

  return (
    <div className=" mb-1 w-full shadow-md ring-1 ring-black ring-opacity-5">
      <div className="ctas flex items-center  justify-between ">
        <div>
        <Link href="/">
              <img
                src="./front-icon.webp"
                alt="medbot-icon"
                className="w-10 h-10 m-2"
              />
        </Link>
        </div>

        <div className=" normal-div font-semibold flex items-center space-x-6 p-4 text-sm md:text-sm lg:text-lg">
        <Link href= "/about">
        <h5 className="hover:border-b-2 border-brand-blue">About Medbot</h5>
        </Link>
        
       
        {
          logged ? (
            <Link href="/login">
            <h5 onClick={() => signOut()} className="hover:border-b-2 border-brand-blue">Log out </h5>
            </Link>
          ) :(
            <Link href="/login">
            <h5 className="hover:border-b-2 border-brand-blue">Login</h5>
            </Link>
          )
        }

        <Link href="/register">
        <button className="p-1 rounded-lg bg-white text-brand-blue border border-brand-blue border-2 hover:bg-brand-blue hover:text-white">
          Get Started
        </button>
        </Link>
 

        </div>

     

      </div>
     

    </div>
  );
}

export default Navbar;
