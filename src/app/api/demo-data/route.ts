import { NextRequest, NextResponse } from "next/server";

// Sample demo data for sports analytics
const demoData = {
  performance: [
    { player: "Mohammed Al-Saeed", metric: "Sprint Speed", value: 34.2, unit: "km/h", change: "+2.1" },
    { player: "Ahmed Hassan", metric: "Distance Covered", value: 11.8, unit: "km", change: "+0.5" },
    { player: "Khalid Al-Dawsari", metric: "Pass Accuracy", value: 93.4, unit: "%", change: "+1.2" },
    { player: "Fahad Al-Muwallad", metric: "Shot Precision", value: 82.1, unit: "%", change: "+4.5" },
    { player: "Salem Al-Dawsari", metric: "Dribble Success", value: 77.8, unit: "%", change: "-1.3" },
  ],
  tactics: [
    { metric: "Ball Possession", team1: 58, team2: 42 },
    { metric: "Pressure Success", team1: 73, team2: 65 },
    { metric: "Counter Attack Speed", team1: 12.3, team2: 14.7, unit: "sec" },
    { metric: "Formation Consistency", team1: 88, team2: 76, unit: "%" },
    { metric: "Defensive Line Height", team1: 36.2, team2: 42.7, unit: "m" },
  ],
  emotions: [
    { timepoint: "15:32", event: "Goal celebration", intensity: 92, sentiment: "Extremely Positive" },
    { timepoint: "23:47", event: "Missed opportunity", intensity: 67, sentiment: "Frustration" },
    { timepoint: "36:15", event: "Team huddle", intensity: 78, sentiment: "Unity & Focus" },
    { timepoint: "52:08", event: "Defensive stand", intensity: 84, sentiment: "Determined" },
    { timepoint: "88:22", event: "Crowd response", intensity: 95, sentiment: "Euphoric" },
  ],
  predictions: [
    { prediction: "Victory probability", value: 64, unit: "%" },
    { prediction: "Expected goals", value: 2.7, unit: "" },
    { prediction: "Fatigue impact", value: "Medium", risk: "Low" },
    { prediction: "Key player influence", player: "Fahad Al-Muwallad", impact: "High" },
    { prediction: "Weather effect on passing", impact: "-3.2%", confidence: "High" },
  ],
  liveGame: {
    homeTeam: "Al Hilal",
    awayTeam: "Al Nassr",
    score: "2-1",
    minute: 67,
    stadium: "King Fahd International Stadium",
    league: "Saudi Pro League",
    attendance: 62500,
    weather: "28°C, Clear"
  }
};

export async function GET(request: NextRequest) {
  // Get the data type from the URL query parameter
  const searchParams = request.nextUrl.searchParams;
  const dataType = searchParams.get("type");
  
  // If a specific data type is requested, return just that data
  if (dataType && dataType in demoData) {
    return NextResponse.json({ data: demoData[dataType as keyof typeof demoData] });
  }
  
  // Otherwise, return all data
  return NextResponse.json({ data: demoData });
}