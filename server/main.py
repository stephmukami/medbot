from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()
qdrant_link =  os.environ.get("QDRANT_LINK")
qdrant_api = os.environ.get("QDRANT_API")
# openai_api_key = os.environ.get("OPEN_AI_API")


#loading qdrant and open ai apis
import openai

openai_client = openai.Client(
    api_key= os.environ.get("OPENAI_API_KEY")
)

from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance

client =  QdrantClient(
    qdrant_link,
    api_key= qdrant_api,
)



from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
# retrieve answer
from langchain_openai import OpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_openai import OpenAIEmbeddings

import numpy as np


app = FastAPI()
#add this part for the CORS policy
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class UserResponse(BaseModel):
    user_text: str

@app.get('/')
async def root():
    return {'example':'jacob'}

    

@app.post('/getChat/')
async def getInput( user_response: UserResponse):
     query = user_response.user_text
     search_result = client.query(
        collection_name="diseases",
        query_text= query)
     
     file_path = 'output.txt'

            # Save the output list to the text file
     def save_to_text_file(output_list, file_path):
            with open(file_path, 'w') as f:
                for item in output_list:
                    f.write("%s\n" % item)
     file_path = 'output.txt'
     save_to_text_file(search_result, file_path)


     loader = TextLoader("output.txt")
     documents = loader.load()
     text_splitter = CharacterTextSplitter(chunk_size=800, chunk_overlap=0)

     docs = text_splitter.split_documents(documents)
    

    # formulating answer
     model_name = "gpt-3.5-turbo-instruct"
     llm = OpenAI(model_name=model_name)

     chain = load_qa_chain(llm, chain_type="stuff")

     answer = chain.run(input_documents=docs, question=query)
     
     return answer



