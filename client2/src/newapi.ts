import axios from 'axios'

const newapi = axios.create({
    baseURL: 'http://localhost:7000',
})

export default newapi;