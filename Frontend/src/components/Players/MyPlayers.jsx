import { useEffect,useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../layout/LoadingSpinner";
import PlayerCard from "./PlayerCard";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const MyPlayers=()=>{
    const[players,setPlayers]=useState([]);
    const[loading,setLoading]=useState(true);

    const[nameSearch,setNameSearch]=useState("");
    const[minRating,setMinRating]=useState("");
    const[maxRating,setMaxRating]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchPlayers=async ()=>{
        try{
        const token=localStorage.getItem("token");
        const players= await axios.get("http://localhost:5000/api/v1/users/players",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
        setPlayers(players);
        setLoading(false);
        }
        catch(error){
        toast.error("Failed to get players");
        setLoading(false);
        }
    }
    fetchPlayers();

    },[])
    const handleDelete=async (id)=>{
        try{
            const token=localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/api/v1/players/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
                withCredentials:true
            });
            toast.success("Player deleted successfully");
            setPlayers(players.filter((p)=>p._id!=id));
        }
        catch(error){
        toast.error("Failed to delete player");
        }
    }
    
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
                  <button onClick={() => navigate("/player-form")}>Add Player</button>
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
                    
                    filteredPlayers.map((player)=> (<div key={player._id} style={{ marginBottom: "1rem" }}>
              <PlayerCard player={player} />
              <button onClick={() => navigate(`/player-form/${player._id}`)}>
                Edit
              </button>
              <button onClick={() => handleDelete(player._id)}>Delete</button>
            </div>)
                )
                    
                ):(
                    <p>No Players found</p>

                    
                )}
            </div>
        </div>
    )
}

export default MyPlayers;