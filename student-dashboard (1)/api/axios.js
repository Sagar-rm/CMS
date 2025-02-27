import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000", // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout
  headers: {
    "Content-Type": "application/json",
  },
})

export default api

