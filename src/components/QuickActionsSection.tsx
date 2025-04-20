import React from "react";
import Link from "next/link";

const QuickActionsSection: React.FC = () => {
  return (
    <div className="bg-gray-900/70 rounded-xl shadow-lg border border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">إجراءات سريعة</h2>
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
    </div>
  );
};

export default QuickActionsSection;
