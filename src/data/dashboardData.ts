// Mock data for dashboard components

// Demo data for matches
export const demoMatchData = [
  {
    id: 1,
    homeTeam: "الهلال",
    awayTeam: "النصر",
    score: "2-1",
    date: "2025-04-18",
    status: "انتهت",
    has360: true,
    playerCams: 3,
  },
  {
    id: 2,
    homeTeam: "الأهلي",
    awayTeam: "الاتحاد",
    score: "0-0",
    date: "2025-04-19",
    status: "جارية الآن",
    has360: true,
    playerCams: 4,
  },
  {
    id: 3,
    homeTeam: "الشباب",
    awayTeam: "الاتفاق",
    score: "---",
    date: "2025-04-20",
    status: "قادمة",
    has360: true,
    playerCams: 2,
  },
];

// Enhanced viewer stats with time series data for charts
export const demoViewerStats = [
  { label: "مشاهدات زاوية 360°", value: "8,742", change: "+24%", trend: "up" },
  { label: "معدل المشاهدة VR", value: "3,215", change: "+18%", trend: "up" },
  {
    label: "متوسط وقت المشاهدة",
    value: "26 دقيقة",
    change: "+5%",
    trend: "up",
  },
  { label: "تفاعلات المستخدمين", value: "4,893", change: "+22%", trend: "up" },
];

// Viewer data over time for charts
export const viewerTimeData = [
  { time: "08:00", viewers: 1240, vrUsers: 320 },
  { time: "10:00", viewers: 2150, vrUsers: 580 },
  { time: "12:00", viewers: 3840, vrUsers: 920 },
  { time: "14:00", viewers: 5620, vrUsers: 1420 },
  { time: "16:00", viewers: 6930, vrUsers: 1840 },
  { time: "18:00", viewers: 8240, vrUsers: 2640 },
  { time: "20:00", viewers: 8742, vrUsers: 3215 },
];

// Enhanced player performance data for visualization
export const playerPerformanceData = [
  {
    name: "محمد السهلاوي",
    topSpeed: 32.4,
    passAccuracy: 87,
    distanceCovered: 9.7,
    possession: 22,
  },
  {
    name: "سالم الدوسري",
    topSpeed: 30.1,
    passAccuracy: 91,
    distanceCovered: 10.2,
    possession: 18,
  },
  {
    name: "عبدالرزاق حمدالله",
    topSpeed: 29.8,
    passAccuracy: 83,
    distanceCovered: 8.5,
    possession: 15,
  },
  {
    name: "علي البليهي",
    topSpeed: 28.5,
    passAccuracy: 79,
    distanceCovered: 9.9,
    possession: 12,
  },
];

// Match stats data for visualization
export const matchStatsData = [
  {
    name: "الهلال",
    possession: 58,
    shots: 14,
    shotsOnTarget: 8,
    corners: 7,
    fouls: 9,
  },
  {
    name: "النصر",
    possession: 42,
    shots: 10,
    shotsOnTarget: 5,
    corners: 4,
    fouls: 11,
  },
];

// Teams comparison data
export const teamsComparisonData = [
  { name: "الهجمات", الهلال: 24, النصر: 18 },
  { name: "التمريرات الناجحة", الهلال: 352, النصر: 289 },
  { name: "التسديدات", الهلال: 14, النصر: 10 },
  { name: "الأخطاء", الهلال: 9, النصر: 11 },
  { name: "ركنيات", الهلال: 7, النصر: 4 },
];

export const demoActiveSessions = [
  {
    id: "S001",
    roomId: "الهلال-النصر",
    viewers: 3218,
    startTime: "17:30",
    duration: "01:15:22",
    activeVRUsers: 842,
    active360Cams: 3,
  },
  {
    id: "S002",
    roomId: "الأهلي-الاتحاد",
    viewers: 2845,
    startTime: "19:00",
    duration: "00:45:08",
    activeVRUsers: 726,
    active360Cams: 4,
  },
];

// Player performance analytics demo data
export const demoPlayerStats = [
  {
    playerId: "P001",
    name: "محمد السهلاوي",
    team: "الهلال",
    topSpeed: "32.4 كم/س",
    passAccuracy: "87%",
    distanceCovered: "9.7 كم",
  },
  {
    playerId: "P002",
    name: "سالم الدوسري",
    team: "الهلال",
    topSpeed: "30.1 كم/س",
    passAccuracy: "91%",
    distanceCovered: "10.2 كم",
  },
  {
    playerId: "P003",
    name: "عبدالرزاق حمدالله",
    team: "النصر",
    topSpeed: "29.8 كم/س",
    passAccuracy: "83%",
    distanceCovered: "8.5 كم",
  },
];

// Demo analysis results for camera feature
export const demoAnalysisResults = {
  matchDetection: {
    detected: true,
    confidence: 0.95,
    matchId: "M2025-04-19-001",
    teams: ["الأهلي", "الاتحاد"],
  },
  players: [
    {
      id: "P003",
      name: "عبدالرزاق حمدالله",
      position: { x: 32, y: 64 },
      confidence: 0.89,
      stats: {
        currentSpeed: "24.3 كم/س",
        distanceFromBall: "5.2 م",
        heatPosition: "هجوم أمامي",
      },
    },
    {
      id: "P008",
      name: "سالم الدوسري",
      position: { x: 48, y: 42 },
      confidence: 0.92,
      stats: {
        currentSpeed: "26.7 كم/س",
        distanceFromBall: "2.1 م",
        heatPosition: "وسط مهاجم",
      },
    },
  ],
  fieldAnalysis: {
    ballPosition: { x: 45, y: 40 },
    formation: "4-3-3",
    possessionTeam: "الأهلي",
    possessionPercentage: "62%",
  },
};

