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
        console.log("API response:", res.data);
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
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          value={nameSearch}
          placeholder="Player Name"
          onChange={(e) => setNameSearch(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          value={minRating}
          placeholder="Min Rating"
          onChange={(e) => setMinRating(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          value={maxRating}
          placeholder="Max Rating"
          onChange={(e) => setMaxRating(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleClearFilters}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Clear Filters
        </button>
      </div>

      {/* Players Grid */}
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player._id} player={player} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-10">No Players found</p>
      )}
    </div>
  );
};

export default PlayersList;
