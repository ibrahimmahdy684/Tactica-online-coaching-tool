import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../layout/LoadingSpinner";
import PlayerCard from "./PlayerCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nameSearch, setNameSearch] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/v1/user/players", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setPlayers(res.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to get players");
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/v1/players/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success("Player deleted successfully");
      setPlayers(players.filter((p) => p._id !== id));
    } catch (error) {
      toast.error("Failed to delete player");
    }
  };

  const filteredPlayers = players.filter((player) => {
    return (
      player.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
      (minRating === "" || player.rating >= minRating) &&
      (maxRating === "" || player.rating <= maxRating)
    );
  });

  const handleClearFilters = () => {
    setNameSearch("");
    setMinRating("");
    setMaxRating("");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Top actions */}
      <div className="flex flex-col md:flex-row md:justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <button
          onClick={() => navigate("/player-form")}
          className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-semibold"
        >
          Add Player
        </button>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
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
      </div>

      {/* Players Grid */}
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <div key={player._id} className="flex flex-col items-center space-y-2">
              <PlayerCard player={player} />
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/player-form/${player._id}`)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(player._id)}
                  className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-10">No Players found</p>
      )}
    </div>
  );
};

export default MyPlayers;
