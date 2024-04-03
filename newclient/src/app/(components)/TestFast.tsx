'use client'
import React, { useEffect, useState } from 'react';
import fastapi from '@/fastapi';

type Props = {};

function TestFast({}: Props) {
  const [fastData, setFastData] = useState('');
  const [userQuery, setUserQuery] = useState({
    user_question: '',
  });
  const [serverResponse, setServerResponse] = useState('');

  const fetchFast = async () => {
    const response = await fastapi.get('/');
    setFastData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchFast();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const question_data = userQuery.user_question;
    const response = await fastapi.post('/getChat/', { user_text: question_data });
    setServerResponse(response.data); // Update state with the response data
  };

  return (
    <div>
      <p>data from the fast api</p>

      <form action="" onSubmit={handleSubmit}>
        <div className="navigation flex items-center justify-center space-x-2">
          <input
            className="w-full bg-light-grey p-4 mb-6 rounded-xl outline-none focus:border-grey-800 focus:outline-none focus:ring-1 focus:ring-grey-800"
            placeholder="Type in your medical question"
            type="text"
            id="question"
            name="question"
            value={userQuery.user_question}
            onChange={(e) =>
              setUserQuery({ ...userQuery, user_question: e.target.value })
            }
          />

          <button type="submit">
            <svg
              className="relative bottom-3 w-10 h-10 hover:fill-brand-blue"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>send-outline</title>
              <path d="M4 6.03L11.5 9.25L4 8.25L4 6.03M11.5 14.75L4 17.97V15.75L11.5 14.75M2 3L2 10L17 12L2 14L2 21L23 12L2 3Z" />
            </svg>
          </button>
        </div>
      </form>

      {/* Display server response */}
      {serverResponse && (
        <div>
          <p>Server Response:</p>
          <p>{serverResponse}</p>
        </div>
      )}
    </div>
  );
}

export default TestFast;
