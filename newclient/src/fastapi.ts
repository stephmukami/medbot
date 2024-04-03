import axios from 'axios'

const fastapi = axios.create({
    baseURL: 'http://localhost:8000',
})

export default fastapi;