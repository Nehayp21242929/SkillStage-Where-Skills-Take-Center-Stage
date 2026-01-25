import { useState } from "react"
import { registerUser } from "../api/auth"
import { useAuth } from "../context/AuthContext"

const RegisterForm = ({ onSuccess }) => {
  const { setUser } = useAuth()
  const [form, setForm] = useState({
    fullname: "", email: "", username: "", password: ""
  })
  const [avatar, setAvatar] = useState(null)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const data = new FormData()
    Object.keys(form).forEach(key => data.append(key, form[key]))
    data.append("avatar", avatar)

    try {
      const res = await registerUser(data)
      setUser(res.data.data)
      onSuccess()
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <input name="fullname" placeholder="Full name" onChange={handleChange}
        className="w-full p-2 bg-gray-800 rounded"/>

      <input name="username" placeholder="Username" onChange={handleChange}
        className="w-full p-2 bg-gray-800 rounded"/>

      <input name="email" placeholder="Email" onChange={handleChange}
        className="w-full p-2 bg-gray-800 rounded"/>

      <input name="password" type="password" placeholder="Password"
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 rounded"/>

      <input type="file" onChange={e => setAvatar(e.target.files[0])}
        className="w-full text-sm"/>

      <button className="w-full bg-red-600 p-2 rounded">Sign Up</button>
    </form>
  )
}

export default RegisterForm
