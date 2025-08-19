import React, { useState } from "react";
import Pitch from "./Pitch";
import PlayerMarker from "./PlayerMarker";
import { useEffect } from "react";
import axios from "axios";
   // ✅ Predefined formations
const formations = {
  "4-4-2": [
    { id: 1, name: "GK", top: 50, left: 5 },
    { id: 2, name: "LB", top: 20, left: 20 },
    { id: 3, name: "CB", top: 40, left: 20 },
    { id: 4, name: "CB", top: 60, left: 20 },
    { id: 5, name: "RB", top: 80, left: 20 },
    { id: 6, name: "LM", top: 20, left: 50 },
    { id: 7, name: "CM", top: 40, left: 50 },
    { id: 8, name: "CM", top: 60, left: 50 },
    { id: 9, name: "RM", top: 80, left: 50 },
    { id: 10, name: "ST", top: 35, left: 85 },
    { id: 11, name: "ST", top: 65, left: 85 },
  ],
  "4-3-3": [
    { id: 1, name: "GK", top: 50, left: 5 },
    { id: 2, name: "LB", top: 20, left: 20 },
    { id: 3, name: "CB", top: 40, left: 20 },
    { id: 4, name: "CB", top: 60, left: 20 },
    { id: 5, name: "RB", top: 80, left: 20 },
    { id: 6, name: "CM", top: 30, left: 50 },
    { id: 7, name: "CM", top: 50, left: 50 },
    { id: 8, name: "CM", top: 70, left: 50 },
    { id: 9, name: "LW", top: 20, left: 75 },
    { id: 10, name: "RW", top: 80, left: 75 },
    { id: 11, name: "ST", top: 50, left: 85 },
  ],
  "3-5-2": [
    { id: 1, name: "GK", top: 50, left: 5 },
    { id: 2, name: "CB", top: 30, left: 20 },
    { id: 3, name: "CB", top: 50, left: 20 },
    { id: 4, name: "CB", top: 70, left: 20 },
    { id: 5, name: "LM", top: 20, left: 40 },
    { id: 6, name: "CM", top: 35, left: 50 },
    { id: 7, name: "CM", top: 50, left: 50 },
    { id: 8, name: "CM", top: 65, left: 50 },
    { id: 9, name: "RM", top: 80, left: 40 },
    { id: 10, name: "ST", top: 40, left: 85 },
    { id: 11, name: "ST", top: 60, left: 85 },
  ],
  "4-2-3-1": [
    { id: 1, name: "GK", top: 50, left: 5 },
    { id: 2, name: "LB", top: 20, left: 20 },
    { id: 3, name: "CB", top: 40, left: 20 },
    { id: 4, name: "CB", top: 60, left: 20 },
    { id: 5, name: "RB", top: 80, left: 20 },
    { id: 6, name: "CDM", top: 40, left: 40 },
    { id: 7, name: "CDM", top: 60, left: 40 },
    { id: 8, name: "CAM", top: 50, left: 60 },
    { id: 9, name: "LW", top: 20, left: 70 },
    { id: 10, name: "RW", top: 80, left: 70 },
    { id: 11, name: "ST", top: 50, left: 85 },
  ],
  "5-3-2": [
    { id: 1, name: "GK", top: 50, left: 5 },
    { id: 2, name: "LWB", top: 20, left: 20 },
    { id: 3, name: "CB", top: 35, left: 20 },
    { id: 4, name: "CB", top: 50, left: 20 },
    { id: 5, name: "CB", top: 65, left: 20 },
    { id: 6, name: "RWB", top: 80, left: 20 },
    { id: 7, name: "CM", top: 35, left: 50 },
    { id: 8, name: "CM", top: 50, left: 50 },
    { id: 9, name: "CM", top: 65, left: 50 },
    { id: 10, name: "ST", top: 40, left: 85 },
    { id: 11, name: "ST", top: 60, left: 85 },
  ],
};
export default function TacticsBoard() {
  const[formation,setFormation]=useState("4-4-2");
  const [players, setPlayers] = useState(formations[formation]);
 const [pitchPlayers, setPitchPlayers] = useState([]); // players currently on pitch
  const [bench, setBench] = useState([]); // players off pitch
  // fetch user’s players from backend
useEffect(() => {
  const fetchPlayers = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/v1/players", {
        
      });

      // If your backend returns { players: [...] }
      setPlayers(res.data.players || res.data);
    } catch (err) {
      console.error("Error fetching players:", err);
    }
  };

  fetchPlayers();
}, []);


  // assign players to pitch + bench when formation changes
  useEffect(() => {
    if (!players.length) return;

    const formationSpots = formations[formation];
    const starters = [];
    const usedIds = new Set();
   
    // assign first matching players
    formationSpots.forEach((spot) => {
      const player = players.find(
        (p) => p.position === spot.position && !usedIds.has(p._id)
      );
      if (player) {
        starters.push({ ...spot, player });
        usedIds.add(player._id);
      } else {
        starters.push({ ...spot, player: { name: "Empty", number: "?", color: "gray" } });
      }
    });

    setPitchPlayers(starters);
    setBench(players.filter((p) => !usedIds.has(p._id)));
  }, [formation, players]);

  // swap function (called from PlayerMarker)
  const handleSwap = (pitchId, newPlayer) => {
    setPitchPlayers((prev) =>
      prev.map((slot) =>
        slot.player._id === pitchId
          ? { ...slot, player: newPlayer }
          : slot
      )
    );

    // move old one to bench & remove new one
    const oldPlayer = pitchPlayers.find((slot) => slot.player._id === pitchId)?.player;
    setBench((prev) => {
      const withoutNew = prev.filter((p) => p._id !== newPlayer._id);
      return oldPlayer && oldPlayer._id ? [...withoutNew, oldPlayer] : withoutNew;
    });
  };

  const handleDropPlayer = (id, left, top) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, left, top } : p
      )
    );
  };
  const handleReset=()=>{
    setPlayers(formations[formation]);
  }
  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Tactical Board</h1>
      <Pitch onDropPlayer={handleDropPlayer}>
        {players.map((p) => (
          <PlayerMarker key={p._id} {...p} />
        ))}
      </Pitch>
      <div className="flex space-x-2">
        <select
        value={formation}
        onChange={(e)=>{
          setFormation(e.target.value);
          setPlayers(formations[e.target.value])
        }}
        className="px-2 py-1 border rounded"
        >
          {Object.keys(formations).map((f)=>(
            <option value={f} key={f}>{f}</option>
          ))}
        </select>
       
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
        >
          Reset
        </button>
      </div>
      {/* Bench list */}
      <div className="w-full bg-gray-100 rounded p-3 shadow">
        <h3 className="font-bold mb-2">Bench</h3>
        <div className="flex flex-wrap gap-2">
          {bench.map((p) => (
            <div
              key={p._id}
              className="px-2 py-1 bg-gray-300 rounded text-sm font-medium"
            >
              #{p.number} {p.name} ({p.position})
            </div>
          ))}
        </div>
      </div>
    </div>
    
    

  );
}
