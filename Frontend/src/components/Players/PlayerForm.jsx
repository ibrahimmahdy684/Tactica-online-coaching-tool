import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PlayerForm({ initialValues }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    position: "DEF",
    image: "",
    number: "",
    rating: "",
    pace: "",
    shooting: "",
    passing: "",
    defense: "",
    physical: "",
    diving: "",
    reflexes: "",
    handling: "",
    positioning: "",
    kicking: "",
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({ ...initialValues });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/v1/players/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        toast.success("Player Updated successfully");
      } else {
        await axios.post(`http://localhost:5000/api/v1/players`, formData, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        toast.success("Player Created successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-90 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg space-y-4"
      >
        <h2 className="text-3xl font-bold text-white text-center">
          {id ? "Edit Player" : "Create Player"}
        </h2>

        <input
          name="name"
          placeholder="Player Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          name="rating"
          placeholder="Player Rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          name="number"
          placeholder="Player Number"
          value={formData.number}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="GK">GK</option>
          <option value="DEF">DEF</option>
          <option value="MID">MID</option>
          <option value="ATT">ATT</option>
        </select>

        {formData.position === "GK" ? (
          <>
            <input
              name="diving"
              placeholder="Diving"
              value={formData.diving}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="reflexes"
              placeholder="Reflexes"
              value={formData.reflexes}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="handling"
              placeholder="Handling"
              value={formData.handling}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="positioning"
              placeholder="Positioning"
              value={formData.positioning}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="kicking"
              placeholder="Kicking"
              value={formData.kicking}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </>
        ) : (
          <>
            <input
              name="pace"
              placeholder="Pace"
              value={formData.pace}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="shooting"
              placeholder="Shooting"
              value={formData.shooting}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="passing"
              placeholder="Passing"
              value={formData.passing}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="defense"
              placeholder="Defense"
              value={formData.defense}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="physical"
              placeholder="Physical"
              value={formData.physical}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </>
        )}

        <div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 p-3 rounded text-white font-semibold transition"
          >
            {id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
