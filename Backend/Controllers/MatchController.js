const generatePrompt = (teamA, teamB) => {
  const teamAStr = teamA.map(p => `${p.name} (${p.position})`).join(", ");
  const teamBStr = teamB.map(p => `${p.name} (${p.position})`).join(", ");
   return `
Simulate a realistic football match between these two teams:

Team A: ${teamAStr}
Team B: ${teamBStr}

Rules:
1. Make the match result realistic (e.g., 0–0, 1–0, 2–1, 3–2, etc.).
2. Distribute goals logically (strikers score more, defenders less).
3. Provide detailed stats for both teams: shots, shotsOnTarget, possession (%), fouls, corners, yellowCards, redCards.
4. Give every player a realistic match rating out of 10 (use decimals, e.g., 6.8, 7.5, 8.3).

Return JSON **only** in this exact format:
{
  "score": {"teamA": number, "teamB": number},
  "goals": [{"player":"string","team":"A or B","minute":number}],
  "stats": {
    "shotsA": number, "shotsB": number,
    "shotsOnTargetA": number, "shotsOnTargetB": number,
    "possessionA": number, "possessionB": number,
    "foulsA": number, "foulsB": number,
    "cornersA": number, "cornersB": number,
    "yellowCardsA": number, "yellowCardsB": number,
    "redCardsA": number, "redCardsB": number
  },
  "ratings": [{"player":"string","team":"A or B","rating":number}]
}
`;
};
const simulate=async (req,res)=>{
    const{teamA,teamB}=req.body;

    const prompt=generatePrompt(teamA,teamB)

     try {
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const result = JSON.parse(aiResponse.choices[0].message.content);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Simulation failed" });
  }
}
module.exports=simulate