const PlayerCard = ({ player }) => {
  return (
    <div className="bg-gray-800 text-white rounded-xl shadow-lg p-4 w-64 flex flex-col items-center hover:scale-105 transform transition">
      {/* Top: rating and position */}
      <div className="flex justify-between w-full mb-2">
        <span className="bg-green-500 px-2 py-1 rounded font-semibold text-sm">
          {player.rating}
        </span>
        <span className="bg-gray-700 px-2 py-1 rounded font-medium text-sm">
          {player.position}
        </span>
      </div>

      {/* Player image */}
      <img
        src={player.image}
        alt={player.name}
        className="w-32 h-32 object-cover rounded-full border-2 border-green-500 mb-3"
      />

      {/* Player name */}
      <h3 className="text-xl font-bold mb-3 text-center">{player.name}</h3>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 w-full text-sm">
        {player.position === "GK" ? (
          <>
            <div className="bg-gray-700 px-2 py-1 rounded text-center">DIV: {player.diving}</div>
            <div className="bg-gray-700 px-2 py-1 rounded text-center">REF: {player.reflexes}</div>
            <div className="bg-gray-700 px-2 py-1 rounded text-center">HAN: {player.handling}</div>
            <div className="bg-gray-700 px-2 py-1 rounded text-center">POS: {player.positioning}</div>
            <div className="bg-gray-700 px-2 py-1 rounded text-center col-span-2">KIC: {player.kicking}</div>
          </>
        ) : (
          <>
            <div className="bg-gray-700 px-2 py-1 rounded text-center">PAC: {player.pace}</div>
            <div className="bg-gray-700 px-2 py-1 rounded text-center">SHO: {player.shooting}</div>
            <div className="bg-gray-700 px-2 py-1 rounded text-center">PAS: {player.passing}</div>
            <div className="bg-gray-700 px-2 py-1 rounded text-center">DEF: {player.defense}</div>
            <div className="bg-gray-700 px-2 py-1 rounded text-center col-span-2">PHY: {player.physical}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
