'use client'
import React from 'react'
import axios from 'axios';
import { useState } from "react";

type Props = {}

export default function Upload({}: Props) {
    // State to store the selected file
    const [selectedFile, setSelectedFile] = useState(null);

    // Function to handle file selection
    const handleFileChange = (e: {
        target: any;
        preventDefault: () => void;
    }) => {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name.toLowerCase();
            if (fileName.endsWith('.png') || fileName.endsWith('.jpeg')) {
                setSelectedFile(file);
            } else {
                console.error('Invalid file format. Please select a PNG or JPEG file.');
            }
        }
    };

    // Function to handle form submission
    const handleFileSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        try {
            // Read the contents of the selected file
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                if (fileReader.result) {
                    // Serialize the file data (using Base64 in this example)
                    const base64Data = (fileReader.result as string).split(',')[1];
                    // Send the serialized file data to the API endpoint
                    const response = await axios.post('/api/upload', { data: base64Data });
                    console.log('File uploaded successfully:', response.data);
                } else {
                    console.error('Error: Null file reader result');
                }
            };
            fileReader.readAsDataURL(selectedFile);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <div>
                <h1>File Upload</h1>
                <form onSubmit={handleFileSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <button className='border border-black' type="submit">Upload File</button>
                </form>
            </div>
        </div>
    )
}
