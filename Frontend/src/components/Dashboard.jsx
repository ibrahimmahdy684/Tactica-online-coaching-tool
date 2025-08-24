import React, { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom"
import { AuthContext } from "../context/authcontext";
import mm from "../../../assets/wp13465765.jpg"
import axios from "axios";
import { toast } from "react-toastify";
// Example top players data (replace with your actual players)


export default function Dashboard() {
  const{logout}=useContext(AuthContext);
  const[topPlayers,setTopPlayers]=useState([]);
  const[loading,setLoading]=useState(true);
  useEffect(()=>{
  const fetchPlayers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/top-players");
        setTopPlayers(res.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to get players");
        setLoading(false);
      }
    };
    fetchPlayers();
  },[])
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 flex flex-col p-4">
        <h1 className="text-xl font-bold mb-6 text-green-400">Tactica</h1>
       
        <nav className="flex-1 space-y-2">
         <Link to={"/"}
         className="block py-2 px-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
         >
         Home
         </Link>
         <Link to={"/my-players"}
         className="block py-2 px-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
         >
          Squad
         </Link>
         <Link to={"/tactics-board"}
         className="block py-2 px-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
         >
          Tactics Board
        </Link>
          
        </nav>
        <div className="mt-auto">
        <button onClick={logout}  
        className="w-full text-left py-2 px-3 rounded bg-red-600 hover:bg-red-700 cursor-pointer mt-3"
        >
          Logout
        </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6 overflow-auto">
        {/* Header Image */}
       <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-6">
        <img
    src={mm}
    alt="Header"
    className="w-full h-full object-cover object-top"
       />
         </div>
        {/* Top Players Section */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4">Top Players</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topPlayers.map((player, idx) => (
              <div key={idx} className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-24 h-24 rounded-full mb-2 object-cover"
                />
                <h3 className="font-bold">{player.name}</h3>
                <p className="text-gray-400 text-sm">{player.position}</p>
              </div>
            ))}
          </div>
        </section>

       
      </main>

      {/* Right Sidebar - Upcoming Matches */}
      <aside className="w-64 bg-gray-800 flex flex-col p-4 overflow-auto">
        <h2 className="font-bold mb-4">Upcoming Matches</h2>
        {[
          "Manchester United vs Chelsea",
          "Liverpool vs Arsenal",
          "Barcelona vs Real Madrid",
          "Bayern vs Dortmund",
          "PSG vs Lyon"
        ].map((match, idx) => (
          <div key={idx} className="mb-3 p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer">
            <span>{match}</span>
          </div>
        ))}
      </aside>
    </div>
  );
}
