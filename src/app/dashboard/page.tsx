"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import ViewerStatsSection from "@/components/ViewerStatsSection";
import ActiveSessionsSection from "@/components/ActiveSessionsSection";
import Link from "next/link";
import { sendCaptionAsBot } from "@/services/live/send_caption";
import Image from "next/image";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Demo data for the dashboard
const demoMatchData = [
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

// Enhanced player performance data for visualization
const playerPerformanceData = [
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
const matchStatsData = [
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
const teamsComparisonData = [
  { name: "الهجمات", الهلال: 24, النصر: 18 },
  { name: "التمريرات الناجحة", الهلال: 352, النصر: 289 },
  { name: "التسديدات", الهلال: 14, النصر: 10 },
  { name: "الأخطاء", الهلال: 9, النصر: 11 },
  { name: "ركنيات", الهلال: 7, النصر: 4 },
];

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

// Player performance analytics demo data
const demoPlayerStats = [
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
const demoAnalysisResults = {
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

// Player performance analytics section with visualization
const PlayerPerformanceSection = () => {
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
                data={playerPerformanceData}
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
          {demoPlayerStats.map((player) => (
            <div
              key={player.playerId}
              className="bg-gray-800/50 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium">
                  {player.name}{" "}
                  <span className="text-gray-400 text-sm">({player.team})</span>
                </h3>
                <Link
                  href={`/player/${player.playerId}`}
                  className="bg-blue-900/60 text-blue-400 hover:bg-blue-800/60 px-2 py-1 rounded text-xs transition-all"
                >
                  عرض الخريطة الحرارية
                </Link>
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
                      style={{ width: player.passAccuracy }}
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

// Match Analysis Section with enhanced charts
const MatchAnalysisSection = () => {
  return (
    <div className="bg-gray-900/70 rounded-xl shadow-lg border border-gray-800 mb-6">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">
          تحليل المباراة (الهلال ضد النصر)
        </h2>
      </div>
      <div className="p-4">
        {/* Teams comparison radar chart */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-medium mb-3">
            مقارنة إحصائيات الفريقين
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={teamsComparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" stroke="#ffffff80" />
                <YAxis dataKey="name" type="category" stroke="#ffffff80" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#222",
                    border: "1px solid #444",
                  }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend />
                <Bar dataKey="الهلال" fill="#3B82F6" />
                <Bar dataKey="النصر" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Possession Pie Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <h3 className="text-white text-lg font-medium mb-3">الاستحواذ</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "الهلال", value: 58 },
                      { name: "النصر", value: 42 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#3B82F6" />
                    <Cell fill="#8B5CF6" />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#222",
                      border: "1px solid #444",
                    }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Shots Chart */}
          <div>
            <h3 className="text-white text-lg font-medium mb-3">التسديدات</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "إجمالي التسديدات", الهلال: 14, النصر: 10 },
                    { name: "التسديدات على المرمى", الهلال: 8, النصر: 5 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                  <Bar dataKey="الهلال" fill="#3B82F6" />
                  <Bar dataKey="النصر" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Actions over time */}
        <div>
          <h3 className="text-white text-lg font-medium mb-3">
            تطور المباراة عبر الوقت
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { minute: "0", الهلال: 0, النصر: 0 },
                  { minute: "15", الهلال: 1, النصر: 0 },
                  { minute: "30", الهلال: 1, النصر: 0 },
                  { minute: "45", الهلال: 1, النصر: 0 },
                  { minute: "60", الهلال: 1, النصر: 1 },
                  { minute: "75", الهلال: 2, النصر: 1 },
                  { minute: "90", الهلال: 2, النصر: 1 },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="minute" stroke="#ffffff80" />
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
                  dataKey="الهلال"
                  stroke="#3B82F6"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="النصر"
                  stroke="#8B5CF6"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced AI Analysis Section
const AIAnalysisSection = () => {
  return (
    <div className="bg-gray-900/70 rounded-xl shadow-lg border border-gray-800 mb-6">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">
          تحليل الذكاء الاصطناعي للمباريات الحية
        </h2>
      </div>
      <div className="p-4">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-lg font-medium">
              الأهلي ضد الاتحاد (مباشر)
            </h3>
            <span className="bg-green-900/50 text-green-400 px-3 py-1 rounded-lg text-sm flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              تحليل مباشر
            </span>
          </div>

          <div className="bg-black/40 rounded-lg p-6 mb-4 border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-gray-400 mb-2">معلومات المباراة</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-800/70 p-3 rounded-lg">
                      <p className="text-gray-400">الفريقان</p>
                      <p className="text-white">الأهلي ضد الاتحاد</p>
                    </div>
                    <div className="bg-gray-800/70 p-3 rounded-lg">
                      <p className="text-gray-400">الاستحواذ</p>
                      <p className="text-white">الأهلي (62%)</p>
                    </div>
                    <div className="bg-gray-800/70 p-3 rounded-lg">
                      <p className="text-gray-400">التشكيل</p>
                      <p className="text-white">4-3-3</p>
                    </div>
                    <div className="bg-gray-800/70 p-3 rounded-lg">
                      <p className="text-gray-400">الثقة في التحليل</p>
                      <p className="text-white">95%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-lg border border-blue-800/30">
                  <h4 className="text-white mb-3">
                    تحليل متقدم بالذكاء الاصطناعي
                  </h4>
                  <div className="text-gray-300 space-y-2">
                    <p>• فريق الأهلي يعتمد استراتيجية الضغط العالي بنسبة 72%</p>
                    <p>• الاتحاد يركز على الهجمات المرتدة من الجناح الأيمن</p>
                    <p>
                      • اللاعب عبدالرزاق حمدالله يظهر نشاطاً عالياً في الثلث
                      الأخير
                    </p>
                    <p>• توقع: زيادة فرص التسجيل في الـ 15 دقيقة القادمة</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-white mb-3">مخطط تموضع اللاعبين</h4>
                <div className="bg-gradient-to-b from-green-900/20 to-green-800/20 rounded-lg aspect-video relative border border-green-900/30 flex items-center justify-center">
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-4">
                    <div className="border-b border-r border-white/20"></div>
                    <div className="border-b border-l border-r border-white/20"></div>
                    <div className="border-b border-l border-white/20"></div>
                    <div className="border-b border-r border-white/20"></div>
                    <div className="border-b border-l border-r border-white/20"></div>
                    <div className="border-b border-l border-white/20"></div>
                    <div className="border-b border-r border-white/20"></div>
                    <div className="border-b border-l border-r border-white/20"></div>
                    <div className="border-b border-l border-white/20"></div>
                    <div className="border-t border-r border-white/20"></div>
                    <div className="border-t border-l border-r border-white/20"></div>
                    <div className="border-t border-l border-white/20"></div>
                  </div>

                  {/* Player positions */}
                  <div className="absolute w-5 h-5 bg-blue-500 rounded-full top-[20%] left-[45%] flex items-center justify-center text-xs text-white">
                    9
                  </div>
                  <div className="absolute w-5 h-5 bg-blue-500 rounded-full top-[35%] left-[25%] flex items-center justify-center text-xs text-white">
                    7
                  </div>
                  <div className="absolute w-5 h-5 bg-blue-500 rounded-full top-[35%] left-[65%] flex items-center justify-center text-xs text-white">
                    11
                  </div>
                  <div className="absolute w-5 h-5 bg-blue-500 rounded-full top-[50%] left-[32%] flex items-center justify-center text-xs text-white">
                    8
                  </div>
                  <div className="absolute w-5 h-5 bg-blue-500 rounded-full top-[50%] left-[48%] flex items-center justify-center text-xs text-white">
                    6
                  </div>
                  <div className="absolute w-5 h-5 bg-blue-500 rounded-full top-[50%] left-[65%] flex items-center justify-center text-xs text-white">
                    10
                  </div>

                  {/* Ball position */}
                  <div className="absolute w-3 h-3 bg-white rounded-full top-[32%] left-[48%] animate-pulse"></div>
                </div>

                <div className="mt-4">
                  <h4 className="text-white mb-2">اللاعبون المكتشفون</h4>
                  <div className="space-y-2">
                    <div className="bg-gray-900/60 p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="text-white">عبدالرزاق حمدالله (9)</p>
                        <p className="text-gray-400 text-sm">
                          السرعة: 24.3 كم/س
                        </p>
                      </div>
                      <span className="text-cyan-400 text-sm">ثقة: 89%</span>
                    </div>
                    <div className="bg-gray-900/60 p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="text-white">سالم الدوسري (10)</p>
                        <p className="text-gray-400 text-sm">
                          السرعة: 26.7 كم/س
                        </p>
                      </div>
                      <span className="text-cyan-400 text-sm">ثقة: 92%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/40 p-4 rounded-lg">
              <h4 className="text-white mb-2">إحصائيات الركض</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { minute: "60", الأهلي: 9.2, الاتحاد: 8.7 },
                      { minute: "65", الأهلي: 9.5, الاتحاد: 8.5 },
                      { minute: "70", الأهلي: 9.7, الاتحاد: 8.8 },
                      { minute: "75", الأهلي: 9.3, الاتحاد: 9.0 },
                      { minute: "80", الأهلي: 9.1, الاتحاد: 8.6 },
                    ]}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
                    <XAxis dataKey="minute" stroke="#ffffff80" />
                    <YAxis stroke="#ffffff80" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#222",
                        border: "1px solid #444",
                      }}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="الأهلي"
                      stroke="#3B82F6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="الاتحاد"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800/40 p-4 rounded-lg">
              <h4 className="text-white mb-2">مناطق التموضع</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "دفاع", value: 25 },
                        { name: "وسط", value: 45 },
                        { name: "هجوم", value: 30 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#3B82F6" />
                      <Cell fill="#8B5CF6" />
                      <Cell fill="#06B6D4" />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#222",
                        border: "1px solid #444",
                      }}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#fff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800/40 p-4 rounded-lg">
              <h4 className="text-white mb-2">مؤشر الطاقة</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "60", الأهلي: 82, الاتحاد: 78 },
                      { name: "70", الأهلي: 76, الاتحاد: 72 },
                      { name: "80", الأهلي: 70, الاتحاد: 65 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
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
                    <Bar dataKey="الأهلي" fill="#3B82F6" />
                    <Bar dataKey="الاتحاد" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            فلترة التحليلات
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            إضافة عناصر التحليل
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCaptureMode, setIsCaptureMode] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<
    typeof demoAnalysisResults | null
  >(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleLogout = () => {
    logout();
  };

  const sendTestCaption = async () => {
    try {
      await sendCaptionAsBot("alhussein", " بداية المباراة!", 7000);
      alert("تم إرسال التعليق بنجاح!");
    } catch {
      alert("فشل في إرسال التعليق");
    }
  };

  // Camera handling functions
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }

      setIsCameraOpen(true);
      setIsCaptureMode(true);
      setCapturedImage(null);
      setAnalysisResults(null);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("فشل في الوصول إلى الكاميرا. الرجاء التحقق من الصلاحيات.");
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsCameraOpen(false);
    setIsCaptureMode(false);
    setCapturedImage(null);
    setAnalysisResults(null);
  };

  const capturePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");

      if (context) {
        // Set canvas dimensions to match video
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Draw video frame to canvas
        context.drawImage(
          videoRef.current,
          0,
          0,
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        );

        // Convert canvas to image
        const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImage(imageDataUrl);
        setIsCaptureMode(false);
      }
    }
  };

  const analyzeImage = () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);

    // Simulating API call with a timeout
    setTimeout(() => {
      // In a real implementation, here you would send the image to your backend
      // For demo, we'll use the mock data
      setAnalysisResults(demoAnalysisResults);
      setIsAnalyzing(false);
    }, 2000);
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setIsCaptureMode(true);
    setAnalysisResults(null);
  };

  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <ProtectedRoute>
      <main className="bg-gradient-to-b from-[#0F1118] to-[#1A1D2B] min-h-screen pt-16 pb-16">
        {/* Camera Modal */}
        {isCameraOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-gray-900 rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">
                  {isCaptureMode
                    ? "التقاط صورة للتحليل"
                    : analysisResults
                    ? "نتائج التحليل"
                    : "مراجعة الصورة"}
                </h2>
                <button
                  onClick={closeCamera}
                  className="text-gray-400 hover:text-white transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4">
                {isCaptureMode ? (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-64 md:h-80 object-cover rounded-lg bg-black"
                    />
                    <button
                      onClick={capturePicture}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ) : capturedImage ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={capturedImage}
                        alt="Captured"
                        className="w-full h-64 md:h-80 object-contain rounded-lg"
                      />
                    </div>

                    {analysisResults ? (
                      <div className="space-y-4">
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <h3 className="text-white font-medium mb-2">
                            معلومات المباراة
                          </h3>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-400">الفرق</p>
                              <p className="text-white">
                                {analysisResults.matchDetection.teams.join(
                                  " ضد "
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">معرف المباراة</p>
                              <p className="text-white">
                                {analysisResults.matchDetection.matchId}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">الاستحواذ</p>
                              <p className="text-white">
                                {analysisResults.fieldAnalysis.possessionTeam} (
                                {
                                  analysisResults.fieldAnalysis
                                    .possessionPercentage
                                }
                                )
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">التشكيل</p>
                              <p className="text-white">
                                {analysisResults.fieldAnalysis.formation}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <h3 className="text-white font-medium mb-2">
                            تحليل اللاعبين المكتشفين
                          </h3>
                          <div className="space-y-3">
                            {analysisResults.players.map((player) => (
                              <div
                                key={player.id}
                                className="border-b border-gray-700 pb-2 last:border-0 last:pb-0"
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <h4 className="text-white">{player.name}</h4>
                                  <span className="text-cyan-400 text-xs">
                                    ثقة: {player.confidence * 100}%
                                  </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-sm">
                                  <div>
                                    <p className="text-gray-400">
                                      السرعة الحالية
                                    </p>
                                    <p className="text-white">
                                      {player.stats.currentSpeed}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-400">
                                      المسافة من الكرة
                                    </p>
                                    <p className="text-white">
                                      {player.stats.distanceFromBall}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-400">الموقع</p>
                                    <p className="text-white">
                                      {player.stats.heatPosition}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <button
                            onClick={retakePicture}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all"
                          >
                            التقاط صورة جديدة
                          </button>
                          <button
                            onClick={closeCamera}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
                          >
                            إغلاق التحليل
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <button
                          onClick={retakePicture}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all"
                        >
                          إعادة التقاط
                        </button>
                        {isAnalyzing ? (
                          <button
                            disabled
                            className="bg-blue-600 opacity-70 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                          >
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            جاري التحليل...
                          </button>
                        ) : (
                          <button
                            onClick={analyzeImage}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
                          >
                            تحليل بالذكاء الاصطناعي
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* Hidden canvas for image capture */}
        <canvas ref={canvasRef} className="hidden"></canvas>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 bg-gradient-to-r from-gray-900 to-[#1A1D2B] rounded-xl shadow-2xl p-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-400 p-3 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    لوحة <span className="text-cyan-400">التحكم</span>
                  </h1>
                  <p className="text-gray-400">
                    مرحبًا، {user?.firstName || "مستخدم"}!{" "}
                    {new Date().toLocaleDateString("ar-SA", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={openCamera}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  تحليل مباشر بالكاميرا
                </button>

                <Link
                  href="/dashboard/analysis"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  تحليل شاشة كاملة
                </Link>

                <Link
                  href="/dashboard/livekit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  إعدادات كاميرات 360°
                </Link>
                <button
                  onClick={sendTestCaption}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  إرسال تعليق
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm7 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  تسجيل الخروج
                </button>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 mb-8">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "overview"
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  الرئيسية
                </button>
                <button
                  onClick={() => setActiveTab("broadcasts")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "broadcasts"
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  البث 360°
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "analytics"
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  تحليلات الأداء
                </button>
                <button
                  onClick={() => setActiveTab("vr")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "vr"
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  تجربة VR
                </button>
                <button
                  onClick={() => setActiveTab("account")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "account"
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  الحساب
                </button>
              </div>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Welcome Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-xl p-6 shadow-lg border border-blue-500/20"
                >
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        مرحبًا بك في رؤيا 360°
                      </h2>
                      <p className="text-gray-300">
                        تجربة كرة القدم المدعومة بالذكاء الاصطناعي مع كاميرات
                        360° على قمصان اللاعبين وتحليلات أداء مباشرة
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                          href="/room/create"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
                        >
                          إنشاء بث 360°
                        </Link>
                        <Link
                          href="/watch/live"
                          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm transition-all"
                        >
                          مشاهدة البث بنظارات VR
                        </Link>
                      </div>
                    </div>
                    <div className="hidden md:block relative w-32 h-32">
                      <Image
                        src="/images/roya360.png"
                        alt="Roya Logo"
                        width={128}
                        height={128}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Viewer Stats Section */}
                <ViewerStatsSection />

                {/* Matches */}
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
                      {demoMatchData.map((match) => (
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
                            <span className="mx-3 text-white font-bold">
                              {match.score}
                            </span>
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

                {/* Player Performance Section */}
                <PlayerPerformanceSection />

                {/* Match Analysis Section */}
                <MatchAnalysisSection />

                {/* AI Analysis Section */}
                <AIAnalysisSection />
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* User Profile */}
                {user && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-gray-900/70 rounded-xl shadow-lg border border-gray-800"
                  >
                    <div className="p-4 border-b border-gray-800">
                      <h2 className="text-xl font-bold text-white">
                        معلومات المستخدم
                      </h2>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full flex items-center justify-center text-2xl text-white font-bold">
                          {user.firstName?.charAt(0) || "U"}
                        </div>
                        <div>
                          <h3 className="text-white text-xl font-semibold">
                            {user.firstName} {user.lastName}
                          </h3>
                          <p className="text-gray-400">
                            {user.role === "ADMIN" ? "مدير" : "مستخدم"}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <p className="text-gray-400 text-sm">
                            البريد الإلكتروني
                          </p>
                          <p className="text-white">{user.email}</p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <p className="text-gray-400 text-sm">المعرف</p>
                          <p className="text-white">{user.id}</p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <p className="text-gray-400 text-sm">الحالة</p>
                          <p className="text-green-400">نشط</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Live Sessions */}
                <ActiveSessionsSection/>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gray-900/70 rounded-xl shadow-lg border border-gray-800"
                >
                  <div className="p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">
                      إجراءات سريعة
                    </h2>
                  </div>
                  <div className="p-4 grid grid-cols-1 gap-3">
                    <Link
                      href="/dashboard/livekit"
                      className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-3 transition-all flex items-center gap-3"
                    >
                      <div className="bg-blue-600 p-2 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                      </div>
                      <span>إدارة كاميرات 360°</span>
                    </Link>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-3 transition-all flex items-center gap-3">
                      <div className="bg-cyan-600 p-2 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>تكوين تحليلات الذكاء الاصطناعي</span>
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-3 transition-all flex items-center gap-3">
                      <div className="bg-purple-600 p-2 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>إعدادات خرائط الحرارة</span>
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-3 transition-all flex items-center gap-3">
                      <div className="bg-green-600 p-2 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a1 1 0 011 1v3.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V7a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>مزامنة أجهزة قياس أداء اللاعبين</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  );
}
