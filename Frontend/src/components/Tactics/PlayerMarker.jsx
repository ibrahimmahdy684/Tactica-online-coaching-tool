// src/components/PlayerMarker.jsx
import React, { useState } from "react";
import { useDrag } from "react-dnd";
export default function PlayerMarker({id ,player,bench, top, left }) {
  const[open,setOpen]=useState(false);
    const[{isDragging},drag]=useDrag(()=>({
        type:"Player",
        item:{id,player,bench,top,left},
        collect:(monitor)=>({
            isDragging:monitor.isDragging(),
        }),
    }))
    if(!player)return null;
    const benchSamePos=bench.filter((b)=>b.position===player.position)
  return (
    <div
    ref={drag}
      className="absolute flex flex-col items-center cursor-pointer"
      style={{
        
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%, -50%)",
        opacity:isDragging?0.5:1,
      }}
      onClick={()=>setOpen(!open)}
    >
       <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow"
        style={{ backgroundColor:"blue" }}
      >
        {player.number}
      </div>
       <span className="mt-1 text-white text-xs font-medium">
        {player.name}
      </span>
      {/* Dropdown for bench players */}
      {open && benchSamePos.length > 0 && (
        <div className="absolute top-full mt-2 bg-white text-black rounded shadow-lg p-2 z-10 w-32">
          <p className="text-xs font-bold mb-1">Switch Player</p>
          {benchSamePos.map((b) => (
            <button
              key={b._id}
              className="w-full text-left text-sm p-1 hover:bg-gray-200 rounded"
              onClick={() => {
                console.log(`Replace ${player.name} with ${b.name}`);
                
                setOpen(false);
              }}
            >
              #{b.number} {b.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
