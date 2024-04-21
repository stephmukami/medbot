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
           Medbot is an innovative solution meant to assist in the diagnosis of respiratory diseases.
           It consists of a transformer powered chat module and a machine learning computer vision model.
           These two work together to assist in analysis of symptoms and chest x-rays.
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
                  Create an account  and login.You will be redirected to the chat module where you can interact with Medbot.
                </p>
                </div>

            <div className=" bg-white text-brand-blue rounded-2xl lg:w-1/5 p-4">
            <h4 className="font-semibold">Step 2</h4>
            <p>
                Ask a question related to respiratory diseases eg pneumonia and tuberculosis by typing in the user input section.
            </p>
            </div>

            <div className=" bg-white text-brand-blue rounded-2xl lg:w-1/5 p-4">
            <h4 className="font-semibold">Step 3</h4>
            <p>
                Upload a picture of an x-ray and the system will give an analysis of the x-ray outlining the sources of interest.
            </p>
            </div>
        </div>
</div>


  

    </div>
  );
}

export default AboutPage;
