import axios from 'axios';
 
const API_URI="http://localhost:5000/api/v1";

const axiosInstance=axios.create({
    baseURL:API_URI,
    withCredentials:true
})
export default axiosInstance;