"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Define proper type for recharts components
type RechartsComponentType = React.ComponentType<Record<string, unknown>>;

// Dynamically import recharts components with no SSR to avoid React 19 compatibility issues
const ResponsiveContainer = dynamic(
  () =>
    import("recharts").then(
      (mod) => mod.ResponsiveContainer as unknown as RechartsComponentType
    ),
  { ssr: false }
);
const LineChart = dynamic(
  () =>
    import("recharts").then(
      (mod) => mod.LineChart as unknown as RechartsComponentType
    ),
  { ssr: false }
);
const Line = dynamic(
  () =>
    import("recharts").then(
      (mod) => mod.Line as unknown as RechartsComponentType
    ),
  { ssr: false }
);
const BarChart = dynamic(
  () =>
    import("recharts").then(
      (mod) => mod.BarChart as unknown as RechartsComponentType
    ),
  { ssr: false }
);
const Bar = dynamic(
  () =>
    import("recharts").then(
      (mod) => mod.Bar as unknown as RechartsComponentType
    ),
  { ssr: false }
);
const PieChart = dynamic(
  () =>
    import("recharts").then(
      (mod) => mod.PieChart as unknown as RechartsComponentType
    ),
  { ssr: false }
);
const Pie = dynamic(
  () =>
    import("recharts").then(
      (mod) => mod.Pie as unknown as RechartsComponentType
    ),
  { ssr: false }
);
const Cell = dynamic(
  () =>
    import("recharts").then(
      (mod) => mod.Cell as unknown as RechartsComponentType
    ),
  { ssr: false }
);
const XAxis = dynamic(
  () =>
    import("recharts").then(
      (mod) => mod.XAxis as unknown as RechartsComponentType
    ),
  { ssr: false }
);
const YAxis = dynamic(
  () =>
    import("recharts").then(
      (mod) => mod.YAxis as unknown as RechartsComponentType
    ),
  { ssr: false }
);
const CartesianGrid = dynamic(
  () =>
    import("recharts").then(
      (mod) => mod.CartesianGrid as unknown as RechartsComponentType
    ),
  { ssr: false }
);
const Tooltip = dynamic(
  () =>
    import("recharts").then(
      (mod) => mod.Tooltip as unknown as RechartsComponentType
    ),
  { ssr: false }
);

const AIAnalysisSection: React.FC = () => {
  // State to track client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Only render recharts components on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

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
                {isClient && (
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
                )}
              </div>
            </div>

            <div className="bg-gray-800/40 p-4 rounded-lg">
              <h4 className="text-white mb-2">مناطق التموضع</h4>
              <div className="h-48">
                {isClient && (
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
                )}
              </div>
            </div>

            <div className="bg-gray-800/40 p-4 rounded-lg">
              <h4 className="text-white mb-2">مؤشر الطاقة</h4>
              <div className="h-48">
                {isClient && (
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
                )}
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

export default AIAnalysisSection;
