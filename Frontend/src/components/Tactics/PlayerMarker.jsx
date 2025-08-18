// src/components/PlayerMarker.jsx
import React from "react";
import { useDrag } from "react-dnd";
export default function PlayerMarker({id ,number, color, top, left }) {
    const[{isDragging},drag]=useDrag(()=>({
        type:"Player",
        item:{id,number,color,top,left},
        collect:(monitor)=>({
            isDragging:monitor.isDragging(),
        }),
    }))
  return (
    <div
    ref={drag}
      className="absolute w-12 h-12 rounded-full flex items-center justify-center text-white font-bold cursor-move"
      style={{
        backgroundColor: color || "blue",
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%, -50%)",
        opacity:isDragging?0.5:1,
      }}
    >
      {number}
    </div>
  );
}
