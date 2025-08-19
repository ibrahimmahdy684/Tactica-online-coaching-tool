// src/components/Pitch.jsx
import React, { useRef } from "react";
import { useDrop } from "react-dnd";

export default function Pitch({ children, onDropPlayer }) {
  const dropRef = useRef(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "Player",  
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      const pitchRect = dropRef.current.getBoundingClientRect();

      // Calculate new position relative to pitch
      const left = ((offset.x - pitchRect.left) / pitchRect.width) * 100;
      const top = ((offset.y - pitchRect.top) / pitchRect.height) * 100;

      const snap = 10;
      left = Math.round(left / snap) * snap;
      top = Math.round(top / snap) * snap;

      left = Math.max(0, Math.min(100, left));
      top = Math.max(0, Math.min(100, top));


      onDropPlayer(item.id, left, top);  
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  drop(dropRef); // connect ref with drop target

  return (
    <div
      ref={dropRef}
      className={`relative w-full h-[600px] bg-green-600 rounded-lg shadow-lg overflow-hidden ${
        isOver ? "ring-4 ring-yellow-400" : ""
      }`}
    >
      {/* Halfway line */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full bg-white"></div>

      {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>

      {/* Center spot */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>

      {/* Penalty areas */}
      <div className="absolute top-1/4 left-0 w-24 h-1/2 border-2 border-white border-l-0"></div>
      <div className="absolute top-1/4 right-0 w-24 h-1/2 border-2 border-white border-r-0"></div>

      {/* Players */}
      {children}
    </div>
  );
}
