import { useState } from "react";
import axios from "axios";
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
      alert("Error simulating match");
    }
    setLoading(false);
  };
    return (
    <div style={{ padding: "20px" }}>
      <h1>⚽ Match Simulator</h1>

      <div style={{ display: "flex", gap: "40px" }}>
        {/* Team A Selection */}
        <div>
          <h2>Team A</h2>
          <p>Selected ({teamA.length}/11)</p>
          <ul>
            {teamA.map(p => (
              <li key={p._id}>
                {p.name} ({p.position}){" "}
                <button onClick={() => handleRemove("A", p)}>❌</button>
              </li>
            ))}
          </ul>
          <h3>Available Players</h3>
          <ul>
            {squad
              .filter(p => !teamA.includes(p) && !teamB.includes(p))
              .map(p => (
                <li key={p._id}>
                  {p.name} ({p.position}){" "}
                  <button onClick={() => handleSelect("A", p)}>Add</button>
                </li>
              ))}
          </ul>
        </div>

        {/* Team B Selection */}
        <div>
          <h2>Team B</h2>
          <p>Selected ({teamB.length}/11)</p>
          <ul>
            {teamB.map(p => (
              <li key={p._id}>
                {p.name} ({p.position}){" "}
                <button onClick={() => handleRemove("B", p)}>❌</button>
              </li>
            ))}
          </ul>
          <h3>Available Players</h3>
          <ul>
            {squad
              .filter(p => !teamA.includes(p) && !teamB.includes(p))
              .map(p => (
                <li key={p._id}>
                  {p.name} ({p.position}){" "}
                  <button onClick={() => handleSelect("B", p)}>Add</button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <button
        onClick={simulateMatch}
        disabled={teamA.length !== 11 || teamB.length !== 11 || loading}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        {loading ? "Simulating..." : "Simulate Match"}
      </button>

      {/* Match Result Display */}
      {matchResult && (
        <div style={{ marginTop: "40px" }}>
          <h2>📊 Match Result</h2>
          <p>
            Final Score: Team A {matchResult.score.teamA} -{" "}
            {matchResult.score.teamB} Team B
          </p>

          <h3>Goalscorers</h3>
          <ul>
            {matchResult.goals.map((g, i) => (
              <li key={i}>
                {g.player} ({g.team}) - {g.minute}'
              </li>
            ))}
          </ul>

          <h3>Match Stats</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Stat</th>
                <th>Team A</th>
                <th>Team B</th>
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

          <h3>Player Ratings</h3>
          <ul>
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