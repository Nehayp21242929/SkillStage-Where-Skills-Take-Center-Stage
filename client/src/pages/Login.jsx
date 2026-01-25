import { useState } from "react"
import { loginUser } from "../api/auth"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" })
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await loginUser(form)
      setUser(res.data.data.user)
      navigate("/")
    } catch (err) {
      alert(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input name="email" placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800 rounded"/>

        <input name="password" type="password" placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800 rounded"/>

        <button className="w-full bg-red-600 p-2 rounded">Login</button>
      </form>
    </div>
  )
}

export default Login
