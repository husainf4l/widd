"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <ProtectedRoute>
      <main className="bg-gradient-to-b from-[#0F1118] to-[#1A1D2B] min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-gray-900 to-[#1A1D2B] rounded-xl shadow-2xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">
                  لوحة <span className="text-cyan-400">التحكم</span>
                </h1>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
                >
                  تسجيل الخروج
                </button>
              </div>

              {user && (
                <div className="mb-8">
                  <div className="bg-[#1E2235] rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">
                      معلومات المستخدم
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">الاسم</p>
                        <p className="text-white">
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">
                          البريد الإلكتروني
                        </p>
                        <p className="text-white">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">نوع الحساب</p>
                        <p className="text-white">
                          {user.role === "ADMIN" ? "مدير" : "مستخدم"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">المعرف</p>
                        <p className="text-white">{user.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  أهلاً بك في لوحة التحكم
                </h2>
                <p className="text-gray-300 mb-4">
                  يمكنك من خلال هذه اللوحة إدارة حسابك والوصول إلى جميع الخدمات
                  المتاحة.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {/* Example dashboard cards */}
                  <div className="bg-[#1E2235] rounded-lg p-5 hover:bg-[#252a45] transition-all">
                    <h3 className="text-cyan-400 font-semibold mb-2">
                      الملف الشخصي
                    </h3>
                    <p className="text-gray-300 text-sm">
                      إدارة معلومات حسابك والإعدادات الشخصية
                    </p>
                  </div>
                  <div className="bg-[#1E2235] rounded-lg p-5 hover:bg-[#252a45] transition-all">
                    <h3 className="text-cyan-400 font-semibold mb-2">
                      المشاريع
                    </h3>
                    <p className="text-gray-300 text-sm">
                      عرض وإدارة المشاريع الخاصة بك
                    </p>
                  </div>
                  <div className="bg-[#1E2235] rounded-lg p-5 hover:bg-[#252a45] transition-all">
                    <h3 className="text-cyan-400 font-semibold mb-2">
                      الإحصائيات
                    </h3>
                    <p className="text-gray-300 text-sm">
                      تحليلات وإحصائيات أداء حسابك
                    </p>
                  </div>

                  <Link
                    href="/dashboard/livekit"
                    className="bg-[#1E2235] rounded-lg p-5 hover:bg-[#252a45] transition-all block"
                  >
                    <h3 className="text-cyan-400 font-semibold mb-2">
                      LiveKit Token
                    </h3>
                    <p className="text-gray-300 text-sm">
                      صفحة توليد التوكن الخاصة بـ LiveKit
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  );
}
