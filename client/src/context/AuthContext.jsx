import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentUser , loginUser, logoutUser} from "../api/auth"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser()
      setUser(res.data.data)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }
  const login = async (formData) => {
    const res = await loginUser(formData);
    setUser(res.data.data.user);
    return res;
  };

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      window.location.href = "/"; // or "/"
    } catch (err) {
      console.error("Logout failed", err);
    }
  };


  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
