
const { useEffect } = require("react");
const { useState } = require("react")
import { toast } from "react-toastify";
import LoadingSpinner from "../layout/LoadingSpinner";
import PlayerCard from "./PlayerCard";
const PlayersList=()=>{
    const[players,setPlayers]=useState([]);
    const[loading,setLoading]=useState(true);

    const[nameSearch,setNameSearch]=useState("");
    const[minRating,setMinRating]=useState("");
    const[maxRating,setMaxRating]=useState("");

    useEffect(()=>{
        try{
        const players=axios.get("http://localhost:3000/api/v1/players");
        setPlayers(players);
        setLoading(false);
        }
        catch(error){
        toast.error("Failed to get players");
        }

    },[])
    const filteredPlayers=players.filter((player)=>{
        return player.name.toLowerCase().includes(nameSearch.toLowerCase())&&
        (minRating==""||player.rating>=minRating)&&
        (maxRating==""||player.rating<=maxRating)
    });
    const handleClearFilters=()=>{
        setNameSearch("");
        setMinRating("");
        setMaxRating("");
    }
    if(loading)return <LoadingSpinner/>
    return(
        <div>
            <div>
                <input
                type="text"
                value={nameSearch}
                placeholder="Player Name"
                onChange={(e)=>setNameSearch(e.target.value)}
                />
                <input
                type="text"
                value={minRating}
                placeholder="Minimum Rating"
                onChange={(e)=>setMinRating(e.target.value)}
                />
                <input
                type="text"
                value={maxRating}
                placeholder="Maximum Rating"
                onChange={(e)=>setMaxRating(e.target.value)}
                />
                <button onClick={handleClearFilters}>
                    clear Filters
                </button>
            </div>
            <div>
                {filteredPlayers>0?(
                    
                    filteredPlayers.map((player)=> <PlayerCard key={player._id} player={player}/>)
                    
                ):(
                    <p>No Players found</p>

                    
                )}
            </div>
        </div>
    )
}

export default PlayersList;