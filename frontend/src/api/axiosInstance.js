import axios from "axios"
import { toast } from "react-hot-toast"

const API = axios.create({
    baseURL: import.meta.env.MODE === "development" ? import.meta.env.VITE_URL : "",
    withCredentials: true
})

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token")
            if (window.location.pathname !== '/login') {
                toast.error("login/signup first")

                setTimeout(() => {
                    window.location.href = '/login';
                }, 700)
                
            }
        }
        return Promise.reject(error)
    }
)

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config

})
export default API