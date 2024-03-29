from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

class UserResponse(BaseModel):
    user_text: str

@app.get('/')
async def root():
    return {'example':'jacob'}

    

@app.post('/getChat/')
async def getInput( user_response: UserResponse):
     query  = user_response.user_text
     return query

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

