import React from 'react'
import Navbar from '../(components)/Navbar'
import AboutPage from '../(components)/AboutPage'
import Footer from '../(components)/Footer'

type Props = {}

function page({}: Props) {
  return (
   <div>
    <Navbar/>
    <AboutPage/>
    <Footer/>

   </div>
  )
}

export default page