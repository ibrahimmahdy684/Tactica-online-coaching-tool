import React, { useState } from "react";
import Pitch from "./Pitch";
import PlayerMarker from "./PlayerMarker";

export default function TacticsBoard() {
  const [players, setPlayers] = useState([
    { id: 1, number: 10, color: "blue", top: 50, left: 25 },
    { id: 2, number: 9, color: "red", top: 50, left: 75 },
  ]);

  const handleDropPlayer = (id, left, top) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, left, top } : p
      )
    );
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Tactical Board</h1>
      <Pitch onDropPlayer={handleDropPlayer}>
        {players.map((p) => (
          <PlayerMarker key={p.id} {...p} />
        ))}
      </Pitch>
    </div>
  );
}
