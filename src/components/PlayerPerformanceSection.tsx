import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PlayerStats {
  playerId: string;
  name: string;
  team: string;
  topSpeed: string;
  passAccuracy: string;
  distanceCovered: string;
}

interface PlayerPerformanceData {
  name: string;
  topSpeed: number;
  passAccuracy: number;
  distanceCovered: number;
  possession: number;
}

interface PlayerPerformanceSectionProps {
  playerStats?: PlayerStats[];
  performanceData?: PlayerPerformanceData[];
}

const PlayerPerformanceSection: React.FC<PlayerPerformanceSectionProps> = ({
  playerStats = [],
  performanceData = [],
}) => {
  // Use the props if provided, otherwise use default data
  const stats =
    playerStats.length > 0
      ? playerStats
      : [
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

  const data =
    performanceData.length > 0
      ? performanceData
      : [
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

  return (
    <div className="bg-gray-900/70 rounded-xl shadow-lg border border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">
          تحليلات أداء اللاعبين (بالذكاء الاصطناعي)
        </h2>
      </div>
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-white text-lg font-medium mb-3">
            مقارنة أداء اللاعبين
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#ffffff80" />
                <YAxis stroke="#ffffff80" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#222",
                    border: "1px solid #444",
                  }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend />
                <Bar dataKey="topSpeed" name="السرعة القصوى" fill="#3B82F6" />
                <Bar dataKey="passAccuracy" name="دقة التمرير" fill="#06B6D4" />
                <Bar dataKey="possession" name="الاستحواذ" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          {stats.map((player) => (
            <div
              key={player.playerId}
              className="bg-gray-800/50 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium">
                  {player.name}{" "}
                  <span className="text-gray-400 text-sm">({player.team})</span>
                </h3>
                <a
                  href={`/player/${player.playerId}`}
                  className="bg-blue-900/60 text-blue-400 hover:bg-blue-800/60 px-2 py-1 rounded text-xs transition-all"
                >
                  عرض الخريطة الحرارية
                </a>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">السرعة القصوى</span>
                    <span className="text-white">{player.topSpeed}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${parseInt(player.topSpeed) * 3}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">دقة التمرير</span>
                    <span className="text-white">{player.passAccuracy}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-cyan-500 rounded-full"
                      style={{ width: parseInt(player.passAccuracy) + "%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">المسافة المقطوعة</span>
                    <span className="text-white">{player.distanceCovered}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-purple-500 rounded-full"
                      style={{
                        width: `${parseFloat(player.distanceCovered) * 9}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerPerformanceSection;
