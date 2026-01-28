// import { useState } from "react"
// import LoginForm from "./LoginForm"
// import RegisterForm from "./RegisterForm"

// const AuthModal = ({ isOpen, onClose }) => {
//   const [mode, setMode] = useState("login")

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-gray-900 w-[400px] rounded-xl p-6 relative">

//         <button
//           onClick={onClose}
//           className="absolute right-3 top-2 text-gray-400 text-xl"
//         >×</button>

//         <div className="flex justify-center gap-6 mb-5">
//           <button
//             onClick={() => setMode("login")}
//             className={`font-semibold ${mode === "login" && "text-red-500"}`}
//           >
//             Login
//           </button>
//           <button
//             onClick={() => setMode("register")}
//             className={`font-semibold ${mode === "register" && "text-red-500"}`}
//           >
//             Sign Up
//           </button>
//         </div>

//         {mode === "login" 
//           ? <LoginForm onSuccess={onClose} /> 
//           : <RegisterForm onSuccess={onClose} />
//         }

//       </div>
//     </div>
//   )
// }

// export default AuthModal
