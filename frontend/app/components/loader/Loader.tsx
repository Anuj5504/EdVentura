'use client'
import { motion } from "framer-motion";
import { useTheme } from 'next-themes';

const Loader = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className={`flex items-center justify-center h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <motion.div
        className={`w-12 h-12 border-4 ${isDarkMode ? "border-white" : "border-blue-500"} border-t-transparent rounded-full animate-spin`}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};

export default Loader;
