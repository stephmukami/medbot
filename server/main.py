from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import os
from dotenv import load_dotenv

# Loading variables from .env file
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
# from langchain_openai import OpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_openai import OpenAIEmbeddings

from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory

import numpy as np


app = FastAPI()
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
     
    #prompt for the question-answering chain with memory
     template = """You are MedBot, a medical AI assistant. Please answer the following questions related to respiratory diseases only.If you lack the necessarry context to answer the medical realted question posed Say sorry and
    state that you currently lack the needed information to answer the question at the moment but it will be addressed soon.If the question is not medical related state that you are only able to answer
    medical questions about respiratory diseases.

    {context}

    {chat_history}
    Human: {human_input}
    Chatbot:"""

     prompt = PromptTemplate(
        input_variables=["chat_history", "human_input", "context"], template=template
    )
     memory = ConversationBufferMemory(memory_key="chat_history", input_key="human_input")
     chain = load_qa_chain(
        OpenAI(temperature=0), chain_type="stuff", memory=memory, prompt=prompt
    )

    #retrieval of the answer
     answer = chain({"input_documents": docs, "human_input": query}, return_only_outputs=True)
     
     return answer

