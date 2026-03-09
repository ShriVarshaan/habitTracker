import axios from "axios"

const API = axios.create({
    baseURL: import.meta.env.MODE === "development" ? import.meta.env.VITE_URL : "",
    withCredentials: true
})

export default API