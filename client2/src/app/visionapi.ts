import axios from 'axios'

const visionapi = axios.create({
    baseURL: 'http://localhost:7000',
})

export default visionapi;