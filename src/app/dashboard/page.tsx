"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { sendCaptionAsBot } from "@/services/live/send_caption";

// Components
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import ViewerStatsSection from "@/components/ViewerStatsSection";
import ActiveSessionsSection from "@/components/ActiveSessionsSection";
import PlayerPerformanceSection from "@/components/PlayerPerformanceSection";
import MatchAnalysisSection from "@/components/MatchAnalysisSection";
import AIAnalysisSection from "@/components/AIAnalysisSection";
import QuickActionsSection from "@/components/QuickActionsSection";
import UserProfileSection from "@/components/UserProfileSection";
import MatchesScheduleSection from "@/components/MatchesScheduleSection";
import WelcomeCard from "@/components/WelcomeCard";

// Data imports
import {
  demoMatchData,
  demoViewerStats,
  viewerTimeData,
} from "@/data/dashboardData";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Load data and setup
  useEffect(() => {
    console.log("Viewer stats data loaded:", demoViewerStats.length);
    console.log("Viewer time data available:", viewerTimeData.length);
    console.log("Match data loaded:", demoMatchData.length);
  }, []);

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

  return (
    <ProtectedRoute>
      <main className="bg-gradient-to-b from-[#0F1118] to-[#1A1D2B] min-h-screen pt-16 pb-16">
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
                <WelcomeCard />

                {/* Viewer Stats Section */}
                <ViewerStatsSection />

                {/* Matches */}
                <MatchesScheduleSection matches={demoMatchData} />

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
                <UserProfileSection user={user} />

                {/* Live Sessions */}
                <ActiveSessionsSection />

                {/* Quick Actions */}
                <QuickActionsSection />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  );
}
