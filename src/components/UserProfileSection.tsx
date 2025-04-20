import React from "react";
import { motion } from "framer-motion";

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
}

interface UserProfileSectionProps {
  user: User | null;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ user }) => {
  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gray-900/70 rounded-xl shadow-lg border border-gray-800"
    >
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">معلومات المستخدم</h2>
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
            <p className="text-gray-400 text-sm">البريد الإلكتروني</p>
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
  );
};

export default UserProfileSection;
