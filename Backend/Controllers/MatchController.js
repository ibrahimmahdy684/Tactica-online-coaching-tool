const simulate = async (req, res) => {
  const { teamA, teamB } = req.body;

  // Filter out goalkeepers for scoring chances
  const scorersA = teamA.filter(p => p.position.toLowerCase() !== "goalkeeper");
  const scorersB = teamB.filter(p => p.position.toLowerCase() !== "goalkeeper");

  // Random scores
  const scoreA = Math.floor(Math.random() * 5);
  const scoreB = Math.floor(Math.random() * 5);

  const result = {
    score: { teamA: scoreA, teamB: scoreB },
    goals: [
      ...(Array.from({ length: scoreA }, () => ({
        player: scorersA[Math.floor(Math.random() * scorersA.length)].name,
        team: "Team A",
        minute: Math.floor(Math.random() * 90) + 1,
      }))),
      ...(Array.from({ length: scoreB }, () => ({
        player: scorersB[Math.floor(Math.random() * scorersB.length)].name,
        team: "Team B",
        minute: Math.floor(Math.random() * 90) + 1,
      }))),
    ].sort((a, b) => a.minute - b.minute), // sort by minute like real matches
    stats: {
      shotsA: Math.floor(Math.random() * 15),
      shotsB: Math.floor(Math.random() * 15),
      shotsOnTargetA: Math.floor(Math.random() * 10),
      shotsOnTargetB: Math.floor(Math.random() * 10),
      possessionA: Math.floor(Math.random() * 60) + 20, // between 20–80%
      possessionB: 0, // will set later
      foulsA: Math.floor(Math.random() * 10),
      foulsB: Math.floor(Math.random() * 10),
      cornersA: Math.floor(Math.random() * 10),
      cornersB: Math.floor(Math.random() * 10),
      yellowCardsA: Math.floor(Math.random() * 5),
      yellowCardsB: Math.floor(Math.random() * 5),
      redCardsA: Math.floor(Math.random() * 2),
      redCardsB: Math.floor(Math.random() * 2),
    },
    ratings: [
      ...teamA.map(p => ({ player: p.name, team: "Team A", rating: (Math.random() * 4 + 6).toFixed(1) })),
      ...teamB.map(p => ({ player: p.name, team: "Team B", rating: (Math.random() * 4 + 6).toFixed(1) })),
    ],
  };

  // Fix possession to sum 100
  result.stats.possessionB = 100 - result.stats.possessionA;

  res.json(result);
};

module.exports=simulate;