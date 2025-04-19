"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

// Viewer data over time for charts
const viewerTimeData = [
  { time: "08:00", viewers: 1240, vrUsers: 320 },
  { time: "10:00", viewers: 2150, vrUsers: 580 },
  { time: "12:00", viewers: 3840, vrUsers: 920 },
  { time: "14:00", viewers: 5620, vrUsers: 1420 },
  { time: "16:00", viewers: 6930, vrUsers: 1840 },
  { time: "18:00", viewers: 8240, vrUsers: 2640 },
  { time: "20:00", viewers: 8742, vrUsers: 3215 },
];

// Enhanced viewer stats with time series data for charts
const demoViewerStats = [
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

// Viewer stats with visualization
const ViewerStatsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-900/70 rounded-xl shadow-lg border border-gray-800 mb-6"
    >
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">إحصائيات المشاهدة</h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {demoViewerStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-4 shadow-lg border border-gray-700"
            >
              <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
              <p className="text-white text-2xl font-bold">{stat.value}</p>
              <div
                className={`text-sm mt-2 ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change}
              </div>
            </div>
          ))}
        </div>
        
        <div className="h-72">
          <h3 className="text-white text-lg font-medium mb-3">نشاط المشاهدين خلال اليوم</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={viewerTimeData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorViewers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorVrUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#ffffff80" />
              <YAxis stroke="#ffffff80" />
              <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#fff' }} 
              />
              <Area 
                type="monotone" 
                dataKey="viewers" 
                name="مشاهدات 360°"
                stroke="#3B82F6" 
                fillOpacity={1} 
                fill="url(#colorViewers)" 
              />
              <Area 
                type="monotone" 
                dataKey="vrUsers" 
                name="مستخدمي VR"
                stroke="#8B5CF6" 
                fillOpacity={1} 
                fill="url(#colorVrUsers)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewerStatsSection;