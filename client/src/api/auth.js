import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1", // change if needed
  withCredentials: true
})

// REGISTER
export const registerUser = (formData) => {
  return API.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

// LOGIN
export const loginUser = (data) => {
  return API.post("/users/login", data)
}

// LOGOUT
export const logoutUser = () => {
  return API.post("/users/logout")
}

// CURRENT USER
export const getCurrentUser = () => {
  return API.get("/users/current-user")
}
