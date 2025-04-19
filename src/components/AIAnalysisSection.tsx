"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AIAnalysisSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("ai-analysis-section");
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const childVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="ai-analysis-section"
      className="w-full py-20 bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden"
      dir="rtl"
    >
      <motion.div
        className="max-w-6xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* العنوان والوصف */}
        <motion.div className="text-center mb-16" variants={childVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            التحليل الذكي – لحظة بلحظة
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            في رؤيا34، الذكاء الاصطناعي ليس مجرد أداة تحليل… بل شريك مباشر في
            صناعة التجربة. من داخل الملعب، يقدّم لك بيانات الأداء في لحظتها،
            ويحوّل الأرقام إلى لحظات نابضة.
          </p>
        </motion.div>

        {/* البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base">
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-blue-500/20 hover:shadow-xl"
            variants={childVariants}
            whileHover={{ y: -5 }}
          >
            <div className="mb-4 text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">
              تتبع الأداء في الوقت الحقيقي
            </h4>
            <p className="text-gray-300">
              تحليل السرعة، التمريرات، نبض القلب، التموضع، وأكثر… مباشرة أثناء
              اللعب.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-blue-500/20 hover:shadow-xl"
            variants={childVariants}
            whileHover={{ y: -5 }}
          >
            <div className="mb-4 text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">
              إحصائيات حيّة داخل الواقع الافتراضي
            </h4>
            <p className="text-gray-300">
              المشجع يرى الأرقام فوق الصورة، في لحظتها، وبتجربة تفاعلية بالكامل.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-blue-500/20 hover:shadow-xl"
            variants={childVariants}
            whileHover={{ y: -5 }}
          >
            <div className="mb-4 text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">
              تحليل المشاعر والتفاعل الجماهيري
            </h4>
            <p className="text-gray-300">
              رصد تلقائي لانفعالات الجماهير، وربطها بالأداء على أرض الملعب.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-blue-500/20 hover:shadow-xl"
            variants={childVariants}
            whileHover={{ y: -5 }}
          >
            <div className="mb-4 text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">
              توليد تلقائي لأبرز اللقطات
            </h4>
            <p className="text-gray-300">
              الذكاء الاصطناعي يختار أهم اللحظات ويحولها إلى مقاطع جاهزة للنشر
              والتحليل.
            </p>
          </motion.div>
        </div>

        {/* Floating elements for visual effect */}
        <div className="absolute -top-10 left-10 w-20 h-20 bg-blue-500 opacity-10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-0 w-32 h-32 bg-cyan-400 opacity-10 rounded-full blur-xl animate-float-delay"></div>
      </motion.div>
    </section>
  );
};

export default AIAnalysisSection;
