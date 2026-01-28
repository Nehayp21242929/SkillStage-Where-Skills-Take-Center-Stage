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
      className="p-2 rounded-full border-2 border-black dark:border-white
                 transition hover:scale-110"
    >
      {theme === "light" ? (
        <Moon className="w-6 h-6 text-black" />
      ) : (
        <Sun className="w-6 h-6  dark:text-white" />
      )}
    </button>
  )
}

export default DarkMode
