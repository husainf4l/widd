import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Match data type
interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  score: string;
  date: string;
  status: string;
  has360: boolean;
  playerCams: number;
}

interface MatchesScheduleSectionProps {
  matches: Match[];
}

const MatchesScheduleSection: React.FC<MatchesScheduleSectionProps> = ({
  matches,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-gray-900/70 rounded-xl shadow-lg border border-gray-800"
    >
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">
          المباريات المجدولة مع 360°
        </h2>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-gray-800/50 rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div
                  className={`w-2 h-8 rounded-full ${
                    match.status === "جارية الآن"
                      ? "bg-green-500"
                      : match.status === "انتهت"
                      ? "bg-gray-500"
                      : "bg-blue-500"
                  }`}
                ></div>
                <div>
                  <h3 className="text-white font-medium">
                    {match.homeTeam} ضد {match.awayTeam}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {match.date}{" "}
                    {match.has360 && (
                      <span className="text-cyan-400 ml-2">
                        {match.playerCams} كاميرات 360°
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span
                  className={`px-3 py-1 rounded-lg text-sm ${
                    match.status === "جارية الآن"
                      ? "bg-green-900/50 text-green-400"
                      : match.status === "انتهت"
                      ? "bg-gray-700 text-gray-300"
                      : "bg-blue-900/50 text-blue-400"
                  }`}
                >
                  {match.status}
                </span>
                <span className="mx-3 text-white font-bold">{match.score}</span>
                {match.status === "جارية الآن" && (
                  <Link
                    href={`/watch/${match.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    مشاهدة 360°
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MatchesScheduleSection;
