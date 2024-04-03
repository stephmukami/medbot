import axios from 'axios'

const imageApi = axios.create({
    baseURL: 'https://image-classification-xray-2.onrender.com',
})

export default imageApi;

