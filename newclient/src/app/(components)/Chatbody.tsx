'use client'
import React, { useState } from "react";
import axios from 'axios';
import fastapi from '@/fastapi';
import imageApi from "../imageApi";


type Props = {};

function Chatbody({}: Props) {
//state for file selection
    const [selectedFile, setSelectedFile] = useState(null);
    //state for classifed disease
    const [classified, setclassified] = useState(null);

//state for user question
    const [userQuery, setUserQuery] = useState({
        user_question: "",
    });

//state for server response
    const [serverResponse, setServerResponse] = useState('');

//state for handling user cards after submission
    const [formSubmitted, setFormSubmitted] = useState(false);

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
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                if (fileReader.result) {
                    const base64Data = (fileReader.result as string).split(',')[1];
                    const response = await imageApi.post('/predict/', { data: base64Data });
                    console.log('File uploaded successfully:', response.data);
                    setServerResponse(response.data)
                } else {
                    console.error('Error: Null file reader result');
                }
            };
            fileReader.readAsDataURL(selectedFile);
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
        const response = await fastapi.post('/getChat/', { user_text: question_data });
        setServerResponse(response.data); // Update state with the response data
        // setFormSubmitted(false);


    };

    return (
        <div className="parent-div p-6">
            <div className="top-part mb-80 border ">
                <div className="chat-response mb-9">
                    <div className="bot-id flex items-center mb-4">
                        <div className="chat-icon mr-3 w-10 h-10 bg-gradient-to-br from-pink-300 to-blue-300 rounded-full"></div>
                        <h3 className="font-bold text-brand-blue">MedBot</h3>
                    </div>
                    <div className="bot-response text-white font-semibold bg-brand-blue p-5 rounded-xl">
                        <p>Ask away! 😊 Example: What are the symptoms of Tuberculosis? </p>
                    </div>
                </div>
                {formSubmitted && (
                    <div className="user-query mb-9">
                        <div className="user-id flex items-center mb-6 font-bold ">
                            <div className="chat-icon mr-3 w-10 h-10 bg-chat-icon rounded-full"></div>
                            <h3>You</h3>
                        </div>
                        <div className="user-query font-semibold">
                            <p>{userQuery.user_question}</p>
                        </div>
                    </div>
                )}
                    {serverResponse && (
                          
                          <div className="chat-response mb-9">
                          <div className="bot-id flex items-center mb-4">
                              <div className="chat-icon mr-3 w-10 h-10 bg-gradient-to-br from-pink-300 to-blue-300 rounded-full"></div>
                              <h3 className="font-bold text-brand-blue">MedBot</h3>
                          </div>
                          <div className="bot-response text-white font-semibold bg-brand-blue p-5 rounded-xl">
                          <p>{serverResponse}</p>

                          </div>
                      </div>
                        )}

            </div>

            <div className="bottom-part">
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
                        <input type="file" onChange={handleFileChange} />
                        <button className='sm:relative bottom-8 p-1  relative bottom-4 rounded-lg bg-white text-brand-blue border border-brand-blue border-2 hover:bg-brand-blue hover:text-white' type="submit">Upload File</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chatbody;
