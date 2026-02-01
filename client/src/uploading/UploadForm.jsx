import { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UploadForm= ({ onSuccess }) => {
    
  const navigate = useNavigate(); 

//   const handleChange = (e) => {

//     // setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await loginUser(form);
//       setUser(res.data.data.user); 
//       onSuccess();
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed Try again!!!");
//     }
//   };

  return (
   <div>
        <h2>Upload a ...</h2>
        <button onClick={() => navigate("/upload")} className="w-full bg-blue-600 p-20 rounded text-white hover:bg-blue-500">Video</button>
        <button onClick={() => navigate("/uploadPhoto")} className="w-full bg-blue-600 p-20 rounded text-white hover:bg-blue-500">Photo</button>

    </div>
  );
};

export default UploadForm;
