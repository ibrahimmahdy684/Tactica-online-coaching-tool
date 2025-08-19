import React, { useState, useRef, useEffect } from "react";
import { useDrag } from "react-dnd";

export default function PlayerMarker({ id, player, top, left, bench = [], onSwap }) {
  const [open, setOpen] = useState(false);
  const [dropAbove, setDropAbove] = useState(false);
  const markerRef = useRef();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Player",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (markerRef.current && !markerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine if dropdown should open above based on marker position
  useEffect(() => {
    if (markerRef.current) {
      const rect = markerRef.current.getBoundingClientRect();
      setDropAbove(rect.top > window.innerHeight / 3);
    }
  }, [open]);

  return (
    <div
      ref={markerRef}
      className="absolute flex flex-col items-center"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 10, // ensures marker is above pitch
      }}
    >
      {/* Draggable circle */}
      <div
        ref={drag}
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg cursor-move transition-transform duration-200 hover:scale-110 z-20"
        style={{ backgroundColor: "blue", opacity: isDragging ? 0.5 : 1 }}
        onClick={() => setOpen((v) => !v)}
      >
        {player?.number ?? "?"}
      </div>

      <span className="mt-1 text-white text-xs font-medium text-center z-20">
        {player?.name ?? "Empty"}
      </span>

      {/* Bench dropdown - directly inside marker container */}
      {open && bench.length > 0 && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-44 bg-gray-800 text-white rounded-lg shadow-xl p-2 z-30"
          style={{
            top: dropAbove ? "auto" : "100%",
            bottom: dropAbove ? "100%" : "auto",
            marginTop: dropAbove ? 0 : "0.5rem",
            marginBottom: dropAbove ? "0.5rem" : 0,
          }}
        >
          <p className="text-sm font-semibold mb-2 border-b border-gray-600 pb-1">
            Switch Player
          </p>
          <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
            {bench.map((b) => (
              <button
                key={b._id}
                className="w-full text-left text-sm px-2 py-1 rounded hover:bg-blue-600 transition-colors duration-150"
                onClick={(e) => {
                  e.stopPropagation();
                  onSwap?.(id, b); // works now
                  setOpen(false);
                }}
              >
                #{b.number} {b.name} ({b.position})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
