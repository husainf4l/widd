import React from "react";
import {
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

const MatchAnalysisSection: React.FC = () => {
  const teamsComparisonData = [
    { name: "الهجمات", الهلال: 24, النصر: 18 },
    { name: "التمريرات الناجحة", الهلال: 352, النصر: 289 },
    { name: "التسديدات", الهلال: 14, النصر: 10 },
    { name: "الأخطاء", الهلال: 9, النصر: 11 },
    { name: "ركنيات", الهلال: 7, النصر: 4 },
  ];

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

export default MatchAnalysisSection;
