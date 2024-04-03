import React from "react";
import Link from "next/link";

function Homebody() {
  return (
    <div className="flex-body  lg:flex bg-stone-50 flex-col sm:flex-col md:flex-col lg:flex-row w-screen h-full">
      <div className="text-body flex-4 p-10 text-center md:text-left sm:text-center">
        <h2 className="text-8xl mb-3 text-brand-blue">Medbot</h2>
        <h2 className="text-3xl m-1 mb-2">Easy and accurate diagnosis</h2>
        <h4 className="text-base mb-3">
          A medical chat-bot that provides access to health information and 
          assistance in diagnosing respiratory diseases.
        </h4>

        <Link href="/about">
        <h5 className="text-sm text-brand-blue mb-6 hover:font-bold">Quick Guide</h5>
        </Link>

        <Link href="/register">
        <button className="w-32 h-19 relative p-1 rounded-lg bg-brand-blue text-white transition-transform transform-gpu hover:translate-y-1">
            Get Started
        </button>
        </Link>


      </div>
      <div className="img-body  relative bottom-6">
        <img
          src="./lung-redone.png"
          srcSet="./lung-redone.png 640w, ./Lungs-smallest.png 320w"
          alt="landing-icon"
          className=" relative right-4 m-2 h-15 w-15 w-full h-full object-cover "
        />
      </div>
    </div>
  );
}

export default Homebody;
