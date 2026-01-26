import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import UploadVideo from "./pages/UploadVideo";
import { AuthProvider } from "./context/AuthContext";

function App() {

  return (
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/upload" element={<UploadVideo />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;
