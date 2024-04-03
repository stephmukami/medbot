import Navbar from "../(components)/Navbar";
import Chatbody from "../(components)/Chatbody";
import Footer from "../(components)/Footer";

import React from 'react'

type Props = {}

function page({}: Props) {
  return (
    <div>
        <Navbar/>
        <Chatbody/>
        <Footer/>
    </div>
  )
}

export default page