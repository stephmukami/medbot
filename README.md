
<h1 align="center">
  <br>
  <img src="https://github.com/stephmukami/medbot/blob/main/client2/project_images/title-image.png" alt="medbot logo" width="200">
  <br>
  Medbot
  <br>
</h1>

<h4 align="center">Enhancing diagnosis ofrespiratory diseases through machine learning and generative AI .</h4>
<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#tech-skills">Technical Skills Gained</a> •
  <a href="#license">License</a>
</p>

<div >
  <img src="https://github.com/stephmukami/medbot/blob/main/client2/project_images/medbot_capture_1.PNG" alt="medbot home page" width="400">
  <img src="https://github.com/stephmukami/medbot/blob/main/client2/project_images/medbot_cap_two.PNG" alt="medbot about page" width="400">
  <img src="https://github.com/stephmukami/medbot/blob/main/client2/project_images/med_cap_three.PNG" alt="register page" width="400">
  <img src="https://github.com/stephmukami/medbot/blob/main/client2/project_images/med_cap_four.PNG" alt="chat page" width="400">
  <img src="https://github.com/stephmukami/medbot/blob/main/client2/project_images/med_cap_five.PNG" alt="computer vision page" width="400">
</div>


## Key Features

* Authentication and authorization
  - Create your own account and log in
* Chat-based consultation
  - The app answers questions about Tuberculosis and Pneumonia following RAG principles

* Image Classification
  - Contains a DenseNet-121 computer vision model to classify chest X-ray images into three categories: Normal, Tuberculosis, and Pneumonia.
*Adherence to responsible computing aspects
  - Chat agent adheres to a meta prompt that limits its capabilities to asnwering questions about Pneumonia and Tuberculosis
  - Has an application of the LIME Python library to enhance computer vision's model interpretability
## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) [Python](https://www.python.org/downloads/) and [Flask](https://flask.palletsprojects.com/en/stable/installation/) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/stephmukami/medbot.git

# Go into the repository
$ cd client2

# Install dependencies
$ npm install

# Run the app
$ npm start

# Run the ml backend
$ newenv\Scripts\activate
$ cd server
$ uvicorn main:app --host 0.0.0.0 --port 7000
$ newenv\Scripts\deactivate 
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## License

MIT
## Technical Skills Gained
- Integration of Vector Databases  ie Qdrant and Pinecone
- Data scraping using Beautiful Soup
- RAG architecure
- Intergration of LLMs ie Open AI
- API design using FastAPI
- Responsive web design
- Use of ORMs and Postgres as a service  ie Prisma & Railway
- Testing using PyTest and [RAGAs](https://docs.ragas.io/en/stable/) (Retrieval-Augmented Generation Assessment)

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) [Python](https://www.python.org/downloads/) and [Flask](https://flask.palletsprojects.com/en/stable/installation/) installed on your computer. From your command line:


---
## Dream Team :
### Stephanie Mukami
> GitHub [@stephmukami](https://github.com/stephmukami) &nbsp;&middot;&nbsp;
### Rose Kimu 
> GitHub [@Rose-Kimu](https://github.com/Rose-Kimu) &nbsp;&middot;&nbsp;



