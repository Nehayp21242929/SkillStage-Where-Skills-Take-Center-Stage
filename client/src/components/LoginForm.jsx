import { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const LoginForm = ({ onSuccess }) => {
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      setUser(res.data.data.user);   // ✅ correct
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed Try again!!!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <input
        name="email"
        required
        placeholder="Email"
        onChange={handleChange}
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"
      />

      <input
        name="password"
        type="password"
        required
        placeholder="Password"
        onChange={handleChange}
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"
      />

      <button type="submit" className="w-full bg-blue-600 p-2 rounded text-white hover:bg-blue-500">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
