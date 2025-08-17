// TacticsBoard.jsx
import { useState } from "react";
import "../styles/TacticsBoard.css";

const initialPlayers = [
  { id: 1, name: "GK", position: { row: 6, col: 2 } },
  { id: 2, name: "LB", position: { row: 5, col: 1 } },
  { id: 3, name: "CB1", position: { row: 5, col: 2 } },
  { id: 4, name: "CB2", position: { row: 5, col: 3 } },
  { id: 5, name: "RB", position: { row: 5, col: 4 } },
  { id: 6, name: "CM1", position: { row: 4, col: 2 } },
  { id: 7, name: "CM2", position: { row: 4, col: 3 } },
  { id: 8, name: "LM", position: { row: 3, col: 1 } },
  { id: 9, name: "RM", position: { row: 3, col: 4 } },
  { id: 10, name: "ST1", position: { row: 2, col: 2 } },
  { id: 11, name: "ST2", position: { row: 2, col: 3 } },
];

export default function TacticsBoard() {
  const [players, setPlayers] = useState(initialPlayers);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("playerId", id);
  };

  const handleDrop = (e, row, col) => {
    const id = e.dataTransfer.getData("playerId");
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === parseInt(id) ? { ...p, position: { row, col } } : p
      )
    );
  };

  const allowDrop = (e) => e.preventDefault();

  return (
    <div className="pitch">
      {[...Array(6)].map((_, rowIdx) => (
        <div key={rowIdx} className="row">
          {[...Array(4)].map((_, colIdx) => {
            const playerHere = players.find(
              (p) => p.position.row === rowIdx + 1 && p.position.col === colIdx + 1
            );
            return (
              <div
                key={colIdx}
                className="cell"
                onDrop={(e) => handleDrop(e, rowIdx + 1, colIdx + 1)}
                onDragOver={allowDrop}
              >
                {playerHere && (
                  <div
                    className="player"
                    draggable
                    onDragStart={(e) => handleDragStart(e, playerHere.id)}
                  >
                    {playerHere.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
