import axios from "axios"

const API = axios.create({
  baseURL: "https://skillstage-where-skills-take-center-h12u.onrender.com/api/v1", 
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

export default API