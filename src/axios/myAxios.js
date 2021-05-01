import axios from "axios";
import router from "@/router/router";
const requestAxios = axios.create({
    baseURL: 'https://project-one-91cc9-default-rtdb.firebaseio.com'
})
requestAxios.interceptors.response.use(null, error => {
    if (error.response.status === 401) {
        router.push('/auth?message=auth')
    }
    return Promise.reject(error)
})
export default requestAxios