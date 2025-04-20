import React from "react";

type TabType = "players" | "stats" | "predictions";

interface TabsNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="mb-4 border-b border-gray-800">
      <div className="flex space-x-6 rtl:space-x-reverse">
        <button
          onClick={() => setActiveTab("players")}
          className={`py-2 px-1 relative ${
            activeTab === "players"
              ? "text-blue-400"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          اللاعبين
          {activeTab === "players" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`py-2 px-1 relative ${
            activeTab === "stats"
              ? "text-blue-400"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          الإحصائيات
          {activeTab === "stats" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("predictions")}
          className={`py-2 px-1 relative ${
            activeTab === "predictions"
              ? "text-blue-400"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          التوقعات
          {activeTab === "predictions" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default TabsNavigation;
