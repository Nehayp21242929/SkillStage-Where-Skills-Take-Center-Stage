import { useState } from "react"
import { loginUser } from "../api/auth"
import { useAuth } from "../context/AuthContext"

const LoginForm = ({ onSuccess }) => {
  const { setUser } = useAuth()
  const [form, setForm] = useState({ email: "", password: "" })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await loginUser(form)
      setUser(res.data.data.user)
      onSuccess()
    } catch (err) {
      alert(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="email" placeholder="Email"
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 rounded"/>

      <input name="password" type="password" placeholder="Password"
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 rounded"/>

      <button className="w-full bg-red-600 p-2 rounded">Login</button>
    </form>
  )
}

export default LoginForm
