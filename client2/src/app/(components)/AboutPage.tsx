import React from "react";
import "./animations.css"; // Assuming the CSS file containing the animations is named animations.css
import Image from "next/image";

type Props = {};

function AboutPage({}: Props) {
  return (
    <div >
      <div className="upper  ">
        <h1 className="font-bold text-center text-5xl text-brand-blue  m-4 ">
          What is Medbot?
        </h1>

        <div className="flex justify-center items-center ">
          <div className=" w-3/4">
            <p className="text-center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
              sapiente laborum ad, nostrum ab quasi iste repellendus amet nam
              inventore suscipit aperiam quo voluptatum pariatur.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <img src="./Doctor.gif" alt="doctor image" />
        </div>
      </div>


      <div className="lower bg-brand-blue p-5 text-white">
            <h2 className="font-semibold text-4xl mb-3">Quick Guide </h2>

            <div className="flex flex-col md:flex-row justify-center items-center  space-y-4  lg:space-x-16 md:space-x-16 mb-8">
                <div className=" lg:relative top-2  lg:w-1/5 p-4 bg-white text-brand-blue rounded-2xl">
                <h4 className="font-semibold">Step 1</h4>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam,
                    fugit!
                </p>
                </div>

            <div className=" bg-white text-brand-blue rounded-2xl lg:w-1/5 p-4">
            <h4 className="font-semibold">Step 2</h4>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam,
                fugit!
            </p>
            </div>

            <div className=" bg-white text-brand-blue rounded-2xl lg:w-1/5 p-4">
            <h4 className="font-semibold">Step 3</h4>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam,
                fugit!
            </p>
            </div>
        </div>
</div>


  

    </div>
  );
}

export default AboutPage;
