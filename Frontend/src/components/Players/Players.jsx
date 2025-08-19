import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../layout/LoadingSpinner";
import PlayerCard from "./PlayerCard";
import axios from "axios";

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nameSearch, setNameSearch] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/players");
        // Make sure to log the response to see its structure
        console.log("API response:", res.data);

        // Safe way: check if the array exists
        setPlayers(res.data || []); 
      } catch (error) {
        toast.error("Failed to get players");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Make sure players is always an array
  const filteredPlayers = Array.isArray(players)
    ? players.filter((player) => {
        return (
          player.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
          (minRating === "" || player.rating >= minRating) &&
          (maxRating === "" || player.rating <= maxRating)
        );
      })
    : [];

  const handleClearFilters = () => {
    setNameSearch("");
    setMinRating("");
    setMaxRating("");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div>
        <input
          type="text"
          value={nameSearch}
          placeholder="Player Name"
          onChange={(e) => setNameSearch(e.target.value)}
        />
        <input
          type="text"
          value={minRating}
          placeholder="Minimum Rating"
          onChange={(e) => setMinRating(e.target.value)}
        />
        <input
          type="text"
          value={maxRating}
          placeholder="Maximum Rating"
          onChange={(e) => setMaxRating(e.target.value)}
        />
        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>
      <div>
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <PlayerCard key={player._id} player={player} />
          ))
        ) : (
          <p>No Players found</p>
        )}
      </div>
    </div>
  );
};

export default PlayersList;
