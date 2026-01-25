import React, { useEffect, useState } from 'react'
import { Sun, Moon } from "lucide-react";


const DarkMode = () => {
    const [theme,setTheme]= useState(
        localStorage.getItem("theme")? localStorage.getItem("theme"):"light"
    );
    const element= document.documentElement; //html element

    useEffect(() => {
        if(theme === "dark"){
            element.classList.add("dark");
            localStorage.setItem("theme","dark");
            
        }
        else{
            element.classList.remove("dark");
            localStorage.setItem("theme","light");
        }
    },[theme]);

  return (
     <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full border border-black dark:border-white
                 transition hover:scale-110"
    >
      {theme === "light" ? (
        <Sun className="w-6 h-6 text-blue-400" />
      ) : (
        <Moon className="w-6 h-6 text-gray-900 dark:text-white" />
      )}
    </button>
  )
}

export default DarkMode
