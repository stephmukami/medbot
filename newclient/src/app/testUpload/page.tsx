import React from 'react'
import axios from 'axios';
import { useState,useEffect } from "react";
import Upload from '../(components)/Upload';
import TestFast from '../(components)/TestFast';
 // removed this         <Upload/>

type Props = {}



function page({}: Props) {
  return (
    <div> 
      <TestFast/>
    </div>

  )
}

export default page