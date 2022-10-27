import React, { useState, useEffect } from "react";
import "./styles.css";

export default function Skeletons(){
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, [])
    
    if (isLoading){
    return (
        <div className="w-full h-full bg-sky-300 dark:bg-purple-300">
        <div className="container  w-screen h-screen" />
       
        </div>
    )
}}




