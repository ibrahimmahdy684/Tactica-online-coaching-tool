import React from "react";
import HomeBG from "../../../assets/bg.avif"
import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigate=useNavigate();
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage:
          `url(${HomeBG})`,
      }}
    >
      <h1 className="text-5xl font-bold mb-4 text-center">Welcome to Tactica!</h1>
      <h2 className="text-2xl mb-8 text-center">The top leading coaching tool</h2>

      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-green-500 hover:bg-green-400 rounded text-lg font-semibold" onClick={()=>navigate('/register')}>
          Register
        </button>
        <button className="px-6 py-3 bg-green-500 hover:bg-green-400 rounded text-lg font-semibold" onClick={()=>navigate('/login')}>
          Login
        </button>
      </div>
    </div>
  );
}
