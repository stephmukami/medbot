import React from "react";
import Navbar from "../(components)/Navbar";
import SignupBody from "../(components)/SignupBody";
import Footer from "../(components)/Footer";

type Props = {};

function page({}: Props) {
  return (
    <div>
      <Navbar />
      <SignupBody />
      <Footer/>

    </div>
  );
}

export default page;
