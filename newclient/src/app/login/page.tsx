import React from "react";
import Navbar from "../(components)/Navbar";
import LoginBody from "../(components)/LoginBody";
import Footer from "../(components)/Footer";
type Props = {};

function page({}: Props) {
  return (
    <div>
      <Navbar />
      <LoginBody />
      <Footer/>

    </div>
  );
}

export default page;
