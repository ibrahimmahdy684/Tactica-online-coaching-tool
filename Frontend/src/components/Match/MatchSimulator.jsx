import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function MatchSimulator({squad=[]}){
    const[teamA,setTeamA]=useState([]);
    const[teamB,setTeamB]=useState([]);
    const[matchResult,setMatchResult]=useState(null);
    const[loading,setLoading]=useState(false);

    const handleSelect=(team,player)=>{
        if(team=="A"&&teamA.length<11&&!teamA.includes(player)){
            setTeamA([...teamA,player]);
        }
        if(team=="B"&&teamB.length<11&&!teamB.includes(player)){
            setTeamB([...teamB,player]);
        }
    }
    const handleRemove=(team,player)=>{
        if(team=="A") setTeamA(teamA.filter((t)=>t!=player));
        if(team=="B") setTeamB(teamB.filter((t)=>t!=player));
    }
    const simulateMatch = async () => {
    setLoading(true);
    try {
      const token=localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/v1/match", {
        teamA,
        teamB
      },{
        headers:{
            Authorization:`Bearer ${token}`
        },
        withCredentials:true
      },);
      setMatchResult(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error simulating match");
    }
    setLoading(false);
  };
    return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">⚽ Match Simulator</h1>

      <div className="flex flex-col md:flex-row justify-center gap-10">
        {/* Team A */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Team A</h2>
          <p className="mb-4">Selected ({teamA.length}/11)</p>
          <ul className="mb-4 space-y-2">
            {teamA.map((p) => (
              <li
                key={p._id}
                className="flex justify-between items-center bg-gray-700 px-3 py-2 rounded"
              >
                {p.name} ({p.position})
                <button
                  onClick={() => handleRemove("A", p)}
                  className="text-red-400 hover:text-red-600"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <h3 className="font-medium mb-2">Available Players</h3>
          <ul className="space-y-2">
            {squad
              .filter((p) => !teamA.includes(p) && !teamB.includes(p))
              .map((p) => (
                <li
                  key={p._id}
                  className="flex justify-between items-center bg-gray-700 px-3 py-2 rounded"
                >
                  {p.name} ({p.position})
                  <button
                    onClick={() => handleSelect("A", p)}
                    className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-white text-sm"
                  >
                    Add
                  </button>
                </li>
              ))}
          </ul>
        </div>

        {/* Team B */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Team B</h2>
          <p className="mb-4">Selected ({teamB.length}/11)</p>
          <ul className="mb-4 space-y-2">
            {teamB.map((p) => (
              <li
                key={p._id}
                className="flex justify-between items-center bg-gray-700 px-3 py-2 rounded"
              >
                {p.name} ({p.position})
                <button
                  onClick={() => handleRemove("B", p)}
                  className="text-red-400 hover:text-red-600"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <h3 className="font-medium mb-2">Available Players</h3>
          <ul className="space-y-2">
            {squad
              .filter((p) => !teamA.includes(p) && !teamB.includes(p))
              .map((p) => (
                <li
                  key={p._id}
                  className="flex justify-between items-center bg-gray-700 px-3 py-2 rounded"
                >
                  {p.name} ({p.position})
                  <button
                    onClick={() => handleSelect("B", p)}
                    className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-white text-sm"
                  >
                    Add
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Simulate Button */}
      <div className="text-center mt-8">
        <button
          onClick={simulateMatch}
          disabled={teamA.length !== 11 || teamB.length !== 11 || loading}
          className={`px-6 py-2 rounded-lg font-semibold ${
            loading || teamA.length !== 11 || teamB.length !== 11
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {loading ? "Simulating..." : "Simulate Match"}
        </button>
      </div>

      {/* Match Result */}
      {matchResult && (
        <div className="bg-gray-800 mt-10 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">📊 Match Result</h2>
          <p className="mb-4">
            Final Score: Team A {matchResult.score.teamA} -{" "}
            {matchResult.score.teamB} Team B
          </p>

          <h3 className="font-semibold mb-2">Goalscorers</h3>
          <ul className="mb-4 list-disc list-inside">
            {matchResult.goals.map((g, i) => (
              <li key={i}>
                {g.player} ({g.team}) - {g.minute}'
              </li>
            ))}
          </ul>

          <h3 className="font-semibold mb-2">Match Stats</h3>
          <table className="w-full border border-gray-600 text-center mb-6">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-2">Stat</th>
                <th className="p-2">Team A</th>
                <th className="p-2">Team B</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Shots</td>
                <td>{matchResult.stats.shotsA}</td>
                <td>{matchResult.stats.shotsB}</td>
              </tr>
              <tr>
                <td>Shots on Target</td>
                <td>{matchResult.stats.shotsOnTargetA}</td>
                <td>{matchResult.stats.shotsOnTargetB}</td>
              </tr>
              <tr>
                <td>Possession</td>
                <td>{matchResult.stats.possessionA}%</td>
                <td>{matchResult.stats.possessionB}%</td>
              </tr>
              <tr>
                <td>Fouls</td>
                <td>{matchResult.stats.foulsA}</td>
                <td>{matchResult.stats.foulsB}</td>
              </tr>
              <tr>
                <td>Corners</td>
                <td>{matchResult.stats.cornersA}</td>
                <td>{matchResult.stats.cornersB}</td>
              </tr>
              <tr>
                <td>Yellow Cards</td>
                <td>{matchResult.stats.yellowCardsA}</td>
                <td>{matchResult.stats.yellowCardsB}</td>
              </tr>
              <tr>
                <td>Red Cards</td>
                <td>{matchResult.stats.redCardsA}</td>
                <td>{matchResult.stats.redCardsB}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="font-semibold mb-2">Player Ratings</h3>
          <ul className="list-disc list-inside">
            {matchResult.ratings.map((r, i) => (
              <li key={i}>
                {r.player} ({r.team}) – {r.rating}/10
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}