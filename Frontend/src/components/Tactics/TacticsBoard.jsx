import React, { useState } from "react";
import Pitch from "./Pitch";
import PlayerMarker from "./PlayerMarker";
import { useEffect } from "react";
import axios from "axios";
   // ✅ Predefined formations
const formations = {
  "4-4-2": [
    { id: 1, position: "GK", top: 50, left: 5 },
    { id: 2, position: "DEF", top: 20, left: 20 },
    { id: 3, position: "DEF", top: 40, left: 20 },
    { id: 4, position: "DEF", top: 60, left: 20 },
    { id: 5, position: "DEF", top: 80, left: 20 },
    { id: 6, position: "MID", top: 20, left: 50 },
    { id: 7, position: "MID", top: 40, left: 50 },
    { id: 8, position: "MID", top: 60, left: 50 },
    { id: 9, position: "MID", top: 80, left: 50 },
    { id: 10, position: "ATT", top: 35, left: 85 },
    { id: 11, position: "ATT", top: 65, left: 85 },
  ],
  "4-3-3": [
    { id: 1, position: "GK", top: 50, left: 5 },
    { id: 2, position: "DEF", top: 20, left: 20 },
    { id: 3, position: "DEF", top: 40, left: 20 },
    { id: 4, position: "DEF", top: 60, left: 20 },
    { id: 5, position: "DEF", top: 80, left: 20 },
    { id: 6, position: "MID", top: 30, left: 50 },
    { id: 7, position: "MID", top: 50, left: 50 },
    { id: 8, position: "MID", top: 70, left: 50 },
    { id: 9, position: "ATT", top: 20, left: 75 },
    { id: 10, position: "ATT", top: 80, left: 75 },
    { id: 11, position: "ATT", top: 50, left: 85 },
  ],
  "3-5-2": [
    { id: 1, position: "GK", top: 50, left: 5 },
    { id: 2, position: "DEF", top: 30, left: 20 },
    { id: 3, position: "DEF", top: 50, left: 20 },
    { id: 4, position: "DEF", top: 70, left: 20 },
    { id: 5, position: "MID", top: 20, left: 40 },
    { id: 6, position: "MID", top: 35, left: 50 },
    { id: 7, position: "MID", top: 50, left: 50 },
    { id: 8, position: "MID", top: 65, left: 50 },
    { id: 9, position: "MID", top: 80, left: 40 },
    { id: 10, position: "ATT", top: 40, left: 85 },
    { id: 11, position: "ATT", top: 60, left: 85 },
  ],
  "4-2-3-1": [
    { id: 1, position: "GK", top: 50, left: 5 },
    { id: 2, position: "DEF", top: 20, left: 20 },
    { id: 3, position: "DEF", top: 40, left: 20 },
    { id: 4, position: "DEF", top: 60, left: 20 },
    { id: 5, position: "DEF", top: 80, left: 20 },
    { id: 6, position: "MID", top: 40, left: 40 },
    { id: 7, position: "MID", top: 60, left: 40 },
    { id: 8, position: "MID", top: 50, left: 60 },
    { id: 9, position: "ATT", top: 20, left: 70 },
    { id: 10, position: "ATT", top: 80, left: 70 },
    { id: 11, position: "ATT", top: 50, left: 85 },
  ],
  "5-3-2": [
    { id: 1, position: "GK", top: 50, left: 5 },
    { id: 2, position: "DEF", top: 20, left: 20 },
    { id: 3, position: "DEF", top: 35, left: 20 },
    { id: 4, position: "DEF", top: 50, left: 20 },
    { id: 5, position: "DEF", top: 65, left: 20 },
    { id: 6, position: "DEF", top: 80, left: 20 },
    { id: 7, position: "MID", top: 35, left: 50 },
    { id: 8, position: "MID", top: 50, left: 50 },
    { id: 9, position: "MID", top: 65, left: 50 },
    { id: 10, position: "ATT", top: 40, left: 85 },
    { id: 11, position: "ATT", top: 60, left: 85 },
  ],
};
// assign backend players to formation spots
const assignPlayersToFormation = (players, formationKey) => {
  const formation = formations[formationKey];

  // Track which players are already assigned
  const used = new Set();

  const starters = formation.map((spot) => {
    // find the first unused player matching this position
    const matched = players.find(
      (p) => p.position === spot.position && !used.has(p._id)
    );
    if (matched) used.add(matched._id);

    return {
      ...spot,
      player: matched || null,
    };
  });

  const bench = players.filter((p) => !used.has(p._id));

  return { starters, bench };
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

      const res = await axios.get("http://localhost:5000/api/v1/user/players", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

      // If your backend returns { players: [...] }
      setPlayers(res.data.players || res.data);
    } catch (err) {
      console.error("Error fetching players:", err);
    }
  };

  fetchPlayers();
}, []);


   useEffect(() => {
    const { starters, bench } = assignPlayersToFormation(players, formation);
    setPitchPlayers(starters);
    setBench(bench);
  }, [players, formation]);


  const handleSwap = (slotId, newPlayer) => {
    setPitchPlayers((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, player: newPlayer } : s))
    );
    setBench((prev) => {
      // remove the new bench player
      const withoutNew = prev.filter((p) => p._id !== newPlayer._id);
      // old starter goes to bench
      const oldStarter = pitchPlayers.find((s) => s.id === slotId)?.player;
      return oldStarter && oldStarter._id
        ? [...withoutNew, oldStarter]
        : withoutNew;
    });
  };


const handleDropPlayer = (id, left, top) => {
  setPitchPlayers((prev) =>
    prev.map((p) =>
      p.id === id ? { ...p, left, top } : p
    )
  );
};


  const handleReset=()=>{
   const { starters, bench } = assignPlayersToFormation(players, formation);
  setPitchPlayers(starters);
  setBench(bench);
  }
  return (
  <div className="p-6 flex flex-col items-center min-h-screen bg-gray-900 text-white">
    <h1 className="text-3xl font-bold mb-6">Tactical Board</h1>

    {/* Pitch */}
    <div className="w-full max-w-4xl bg-green-800 rounded-lg shadow-lg p-4 mb-4">
      <Pitch onDropPlayer={handleDropPlayer}>
        {pitchPlayers.map((p) => (
          <PlayerMarker
            key={p.id}
            id={p.id}
            player={p.player}
            top={p.top}
            left={p.left}
            bench={bench}
            onSwap={handleSwap}
          />
        ))}
      </Pitch>
    </div>

    {/* Controls */}
    <div className="flex space-x-2 mb-6">
      <select
        value={formation}
        onChange={(e) => setFormation(e.target.value)}
        className="px-3 py-2 bg-gray-700 text-white rounded shadow hover:bg-gray-600"
      >
        {Object.keys(formations).map((f) => (
          <option value={f} key={f}>
            {f}
          </option>
        ))}
      </select>

      <button
        onClick={handleReset}
        className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700"
      >
        Reset
      </button>
    </div>

    {/* Bench */}
    <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow p-4">
      <h3 className="font-bold mb-2 text-lg">Bench</h3>
      <div className="flex flex-wrap gap-3">
        {bench.map((p) => (
          <div
            key={p._id}
            className="px-3 py-2 bg-gray-700 rounded shadow text-sm font-medium"
          >
            #{p.number} {p.name} ({p.position})
          </div>
        ))}
      </div>
    </div>
  </div>
);

}

