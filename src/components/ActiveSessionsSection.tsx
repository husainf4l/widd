"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import Link from "next/link";

// Demo data for active sessions
const demoActiveSessions = [
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

// Session viewer data over time
const sessionViewerData = [
  { time: "17:00", الهلالVSالنصر: 2100, الأهليVSالاتحاد: 0 },
  { time: "17:15", الهلالVSالنصر: 2450, الأهليVSالاتحاد: 0 },
  { time: "17:30", الهلالVSالنصر: 3218, الأهليVSالاتحاد: 0 },
  { time: "17:45", الهلالVSالنصر: 3550, الأهليVSالاتحاد: 0 },
  { time: "18:00", الهلالVSالنصر: 3750, الأهليVSالاتحاد: 0 },
  { time: "18:15", الهلالVSالنصر: 3900, الأهليVSالاتحاد: 0 },
  { time: "18:30", الهلالVSالنصر: 4050, الأهليVSالاتحاد: 0 },
  { time: "18:45", الهلالVSالنصر: 4200, الأهليVSالاتحاد: 1200 },
  { time: "19:00", الهلالVSالنصر: 4350, الأهليVSالاتحاد: 2845 },
  { time: "19:15", الهلالVSالنصر: 4500, الأهليVSالاتحاد: 3250 },
];

// Enhanced active sessions with real-time updates
const ActiveSessionsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-900/70 rounded-xl shadow-lg border border-gray-800 mb-6"
    >
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">جلسات البث 360° النشطة</h2>
        <span className="bg-green-500 animate-pulse h-2 w-2 rounded-full"></span>
      </div>
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-white text-lg font-medium mb-3">
            إحصائيات جلسات البث المباشر
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sessionViewerData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#ffffff80" />
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
                <Line
                  type="monotone"
                  dataKey="الهلالVSالنصر"
                  stroke="#3B82F6"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="الأهليVSالاتحاد"
                  stroke="#8B5CF6"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          {demoActiveSessions.map((session) => (
            <div
              key={session.id}
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 hover:border-blue-500/30 transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="text-white font-medium">{session.roomId}</h3>
                </div>
                <span className="bg-green-900/50 text-green-400 px-2 py-1 rounded text-xs flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-green-400 rounded-full"></span>
                  نشط
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                <div>
                  <p className="text-gray-400">إجمالي المشاهدين</p>
                  <p className="text-white">{session.viewers}</p>
                </div>
                <div>
                  <p className="text-gray-400">مستخدمي VR</p>
                  <p className="text-white">{session.activeVRUsers}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <p className="text-gray-400">كاميرات 360° نشطة</p>
                  <p className="text-white">{session.active360Cams}</p>
                </div>
                <div>
                  <p className="text-gray-400">المدة</p>
                  <p className="text-white">{session.duration}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/watch/${session.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex-1 text-center"
                >
                  مشاهدة 360°
                </Link>
                <Link
                  href={`/watch/${session.id}?vr=true`}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm flex-1 text-center"
                >
                  تجربة VR
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ActiveSessionsSection;
