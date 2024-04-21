'use client'
import React, { use, useState } from "react";
import axios from 'axios';
import fastapi from '@/fastapi';
import imageApi from "@/imageApi";
import visionapi from "@/visionapi";
import newapi from "@/newapi";
import sessionStatus from "../utils/session";

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

//state for predicted disease
const [predictedDisease,setPredictedDisease] = useState('')

//sate for loading
const [ loading,setLoading] = useState(false)

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
    setLoading(true)

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

        const response = await newapi.post('/predict/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
            setLoading(false)
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


        //setServerResponse(response.data.Prediction); 

        const prediction_data = response.data.Prediction
        setPredictedDisease(prediction_data)
        const normal_text = 'The uploaded x-ray does not show signs of any respiratory disease'
        if (prediction_data === "Normal") {
            setXrayContent(normal_text)
        }else{
          const  xray_context_response = await fastapi.post('/getChat/', { user_text: `Briefly tell me about this ${prediction_data} disease` });
          setXrayContent(xray_context_response.data.output_text)

        }


    } catch (error) {
        // console.error('Error uploading file:', error);
        console.log('error found')
        console.log(error)
    }
};


    //submission of user question
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(userQuery);
        setFormSubmitted(true);
        setLoading(true)
        const question_data = userQuery.user_question;

        const userMessage = { role: 'human_user', message: question_data };

        setMessaging([...messaging, userMessage as { role: string; message: string }]);
        
        const response = await fastapi.post('/getChat/', { user_text: question_data });
        //setUserQuery( {     user_question: "",})

        // await new Promise((resolve)=>setTimeout(resolve,50))
    const botMessage = { role: 'bot', message: response.data.output_text };

    setMessaging([...messaging, botMessage as { role: string; message: string }]);
        
        console.log(response.data)
        setServerResponse(response.data.output_text); 
        setLoading(false)

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

        {loading && (
            <div className="text-center">
            <div role="status">
                <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>

        )}

{xrayContent && ( <div className="bg-dark-grey p-5 rounded-xl"> 
                <p> Predicted Disease is: {predictedDisease}</p>
                        <p>Original Image</p>
                        {originalimageSrc && <img src={originalimageSrc} alt="Original Image" />}
                        <p>Image with bounded features used for prediction</p>
                        {imageSrc && <img src={imageSrc} alt="Superimposed Image" />}
                       
                        <p>{xrayContent}</p>
             </div>)}
</div>




            <div className="bottom-part  ">
                <form action="" onSubmit={handleSubmit}>
                    <div className="navigation flex items-center justify-center space-x-2">
                        <input className="w-full bg-light-grey p-4 mb-6 rounded-xl outline-none focus:border-grey-800 focus:outline-none focus:ring-1 focus:ring-grey-800"
                            placeholder="Type in your medical question"
                            type="text"
                            required
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