import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authcontext";
import { toast } from "react-toastify";
import DarkBG from "../../../../assets/bg.avif";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/login", {
        email,
        password,
      });

      if (res.data.token) {
        login(res.data.token);
        navigate("/dashboard");
      } else {
        toast.error("No token returned from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed");
      setError("Login failed. Please try again");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${DarkBG})` }}
    >
      <div className="bg-gray-900 bg-opacity-90 p-8 rounded-xl shadow-lg w-96 space-y-6">
        <h2 className="text-3xl font-bold text-white text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 p-3 rounded text-white font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-center">
          Don't have an account?{" "}
          <span
            className="text-green-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
