'use client'
import React, { use, useState } from "react";
import axios from 'axios';
import fastapi from '@/fastapi';
import imageApi from "@/imageApi";
import visionapi from "@/visionapi";
type Props = {};

function Chatbody({}: Props) {
//state for file selection
    const [selectedFile, setSelectedFile] = useState(null);
    //state for classifed disease
    const [xrayContent, setXrayContent] = useState('');

//state for user question
    const [userQuery, setUserQuery] = useState({
        user_question: "",
    });

//state for server response
    const [serverResponse, setServerResponse] = useState('');

//state for handling user cards after submission
    const [formSubmitted, setFormSubmitted] = useState(false);

//state for the rendered super imposed image
    const [imageSrc, setImageSrc] = useState('');

//state for the original image
const [originalimageSrc, setOriginalImageSrc] = useState('');

//state for message rendering
const [messaging, setMessaging] = useState<{ role: string; message: string }[]>([]);

   // Function to handle image file selection
   const handleFileChange = (e: {
    target: any;
    preventDefault: () => void;
}) => {
    const file = e.target.files[0];
    if (file) {
        const fileName = file.name.toLowerCase();
        if (fileName.endsWith('.png') || fileName.endsWith('.jpeg') || fileName.endsWith('.jpg') ) {
            setSelectedFile(file);
        } else {
            console.error('Invalid file format. Please select a PNG or JPEG file.');
        }
    }
};

//handling submission of image file

const handleFileSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!selectedFile) {
        console.error('No file selected');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        // from original api
        //const response = await imageApi.post('/predict/', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // });

        const response = await visionapi.post('/predict/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log('File uploaded successfully:', response.data);
 //obtaning the image lime url and turning it to an image
    // Convert base64 string to image for the original image
const base64Image = response.data.Original_Image;
const binaryString = window.atob(base64Image);
const binaryBuffer = new ArrayBuffer(binaryString.length);
const byteArray = new Uint8Array(binaryBuffer);
for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
}
const blob = new Blob([binaryBuffer], { type: 'image/jpeg' });
const imageUrl = URL.createObjectURL(blob);

setOriginalImageSrc(imageUrl); 


  // Convert base64 string to image for the super imposed image
    const base64Image2 = response.data.Superimposed_Image;
    const binaryString2 = window.atob(base64Image2);
    const binaryBuffer2 = new ArrayBuffer(binaryString2.length);
    const byteArray2 = new Uint8Array(binaryBuffer2);
    for (let i = 0; i < binaryString2.length; i++) {
        byteArray2[i] = binaryString2.charCodeAt(i);
    }
    const blob2 = new Blob([binaryBuffer2], { type: 'image/jpeg' });
    const superimposedUrl = URL.createObjectURL(blob2);

    setImageSrc(superimposedUrl);


        setServerResponse(response.data.Prediction); 

        const prediction_data = response.data.Prediction
        const normal_text = 'The uploaded x-ray does not show signs of any respiratory disease'
        if (prediction_data ===! "Normal") {
          const  xray_context_response = await fastapi.post('/getChat/', { user_text: `Briefly tell me about this ${prediction_data} disease` });
          setXrayContent(xray_context_response.data.output_text)
        }else{
            setXrayContent(normal_text)

        }


    } catch (error) {
        console.error('Error uploading file:', error);
    }
};


    //submission of user question
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(userQuery);
        setFormSubmitted(true);
        //setUserQuery( {     user_question: "",})
        const question_data = userQuery.user_question;

        const userMessage = { role: 'human_user', message: question_data };

        setMessaging([...messaging, userMessage as { role: string; message: string }]);
        
        const response = await fastapi.post('/getChat/', { user_text: question_data });
        // await new Promise((resolve)=>setTimeout(resolve,50))
    const botMessage = { role: 'bot', message: response.data.output_text };

    setMessaging([...messaging, botMessage as { role: string; message: string }]);
        
        console.log(response.data)
        setServerResponse(response.data.output_text); // Update state with the response data

        // setFormSubmitted(false);


    };

    return (
        <div className="parent-div p-6">

<div className="top-part mb-80">
                <div className="chat-response mb-9">
                    <div className="bot-id flex items-center mb-4">
                        <div className="chat-icon mr-3 w-10 h-10 bg-gradient-to-br from-pink-300 to-blue-300 rounded-full"></div>
                        <h3 className="font-bold text-brand-blue">MedBot</h3>
                    </div>
                    <div className="bot-response text-white font-semibold bg-brand-blue p-5 rounded-xl">
                        <p>Ask away! 😊 Example: What are the symptoms of Tuberculosis? </p>
                    </div>
                </div>
    {messaging.map((message, index) => (
        <div key={index}>
            {message.role === 'human_user' && (
                <div className="user-query mb-9">
                    <div className="user-id flex items-center mb-6 font-bold">
                        <div className="chat-icon mr-3 w-10 h-10 bg-chat-icon rounded-full"></div>
                        <h3>You</h3>
                    </div>
                    <div className="user-query font-semibold">
                        <p>{message.message}</p>
                    </div>
                </div>
            )}
            {message.role === 'bot' && (
                <div className="chat-response mb-9">
                    <div className="bot-id flex items-center mb-4">
                        <div className="chat-icon mr-3 w-10 h-10 bg-gradient-to-br from-pink-300 to-blue-300 rounded-full"></div>
                        <h3 className="font-bold text-brand-blue">MedBot</h3>
                    </div>
                    <div className="bot-response text-white font-semibold bg-brand-blue p-5 rounded-xl">
                        <p>{message.message}</p>
                     
                    </div>
                </div>
            )}
       

        </div>
    ))}

{serverResponse && ( <div className="bg-dark-grey p-5 rounded-xl"> 
                <p> Predicted Disease is: {serverResponse}</p>
                        <p>Original Image</p>
                        {originalimageSrc && <img src={originalimageSrc} alt="Original Image" />}
                        <p>Superimposed Image</p>
                        {imageSrc && <img src={imageSrc} alt="Superimposed Image" />}
                       
                        <p>{xrayContent}</p>
             </div>)}
</div>




            <div className="bottom-part border border-red-800">
                <form action="" onSubmit={handleSubmit}>
                    <div className="navigation flex items-center justify-center space-x-2">
                        <input className="w-full bg-light-grey p-4 mb-6 rounded-xl outline-none focus:border-grey-800 focus:outline-none focus:ring-1 focus:ring-grey-800"
                            placeholder="Type in your medical question"
                            type="text"
                            id="question"
                            name="question"
                            value={userQuery.user_question}
                            onChange={(e) => setUserQuery({ ...userQuery, user_question: e.target.value })}
                        />
                        <svg onClick={handleSubmit} className='relative bottom-3 w-10 h-10 hover:fill-brand-blue' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>send-outline</title>
                            <path d="M4 6.03L11.5 9.25L4 8.25L4 6.03M11.5 14.75L4 17.97V15.75L11.5 14.75M2 3L2 10L17 12L2 14L2 21L23 12L2 3Z" />
                        </svg>
                    </div>
                </form>
                <div className="navigation flex items-center justify-center space-x-5">
                    <form onSubmit={handleFileSubmit}>
                        <div className="bg-brand-blue mb-8 mt-2 rounded-md text-white text-center">
                        <h5 >Upload an x-ray image for analysis</h5>

                        </div>
                        <input type="file" onChange={handleFileChange} />
                        <button className='sm:relative bottom-2  p-1  relative bottom-2 rounded-lg bg-white text-brand-blue border border-brand-blue border-2 hover:bg-brand-blue hover:text-white' type="submit">Upload File</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chatbody;