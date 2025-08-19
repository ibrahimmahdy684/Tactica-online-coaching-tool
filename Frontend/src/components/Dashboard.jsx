import React from "react";

// Example top players data (replace with your actual players)
const topPlayers = [
  { name: "Lionel Messi", position: "Forward", img: "https://via.placeholder.com/100" },
  { name: "Cristiano Ronaldo", position: "Forward", img: "https://via.placeholder.com/100" },
  { name: "Kylian Mbappe", position: "Forward", img: "https://via.placeholder.com/100" },
  { name: "Kevin De Bruyne", position: "Midfielder", img: "https://via.placeholder.com/100" },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 flex flex-col p-4">
        <h1 className="text-xl font-bold mb-6 text-green-400">FOOTBALLSHURU</h1>
        <input
          type="text"
          placeholder="Search"
          className="mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <nav className="flex-1">
          {["Home", "Leader Board", "Ground", "Chat", "Notification"].map((item) => (
            <div
              key={item}
              className="py-2 px-3 rounded hover:bg-gray-700 cursor-pointer mb-1"
            >
              {item}
            </div>
          ))}
        </nav>
        <div className="mt-auto">
          <p className="text-sm mb-1">Varun_kubal</p>
          <p className="text-xs text-gray-400">varun_kubal@gmail.com</p>
          <div className="flex justify-between mt-3">
            <button className="px-2 py-1 bg-gray-700 rounded">Light</button>
            <button className="px-2 py-1 bg-gray-700 rounded">Dark</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6 overflow-auto">
        {/* Header Image */}
        <div className="w-full h-48 rounded-lg overflow-hidden mb-6">
          <img
            src="https://images.unsplash.com/photo-1561939985-39e27cd7e32b"
            alt="Header"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Players Section */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4">Top Players</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topPlayers.map((player, idx) => (
              <div key={idx} className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
                <img
                  src={player.img}
                  alt={player.name}
                  className="w-24 h-24 rounded-full mb-2 object-cover"
                />
                <h3 className="font-bold">{player.name}</h3>
                <p className="text-gray-400 text-sm">{player.position}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tabs / Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            {["Live", "Yesterday", "Today", "Tomorrow", "Sunday", "Monday"].map((day) => (
              <button
                key={day}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
              >
                {day}
              </button>
            ))}
          </div>
          <button className="px-3 py-1 rounded bg-green-500 hover:bg-green-400">
            View Calendar
          </button>
        </div>

        {/* Matches List */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { league: "FIFA World Cup", matches: ["Spain vs Netherlands", "Japan vs Sweden"] },
            { league: "La Liga", matches: ["Real Madrid vs Barcelona", "Atletico vs Sevilla"] },
          ].map((league, idx) => (
            <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="font-bold mb-2">{league.league}</h3>
              <ul className="space-y-2">
                {league.matches.map((match, i) => (
                  <li key={i} className="flex justify-between p-2 bg-gray-700 rounded hover:bg-gray-600">
                    <span>{match}</span>
                    <span className="text-green-400">Upcoming</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      {/* Right Sidebar - Upcoming Matches */}
      <aside className="w-64 bg-gray-800 flex flex-col p-4 overflow-auto">
        <h2 className="font-bold mb-4">Upcoming Matches</h2>
        {[
          "Manchester United vs Chelsea",
          "Liverpool vs Arsenal",
          "Barcelona vs Real Madrid",
          "Bayern vs Dortmund",
          "PSG vs Lyon"
        ].map((match, idx) => (
          <div key={idx} className="mb-3 p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer">
            <span>{match}</span>
          </div>
        ))}
      </aside>
    </div>
  );
}
