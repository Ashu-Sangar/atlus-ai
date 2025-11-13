"use client";

import { motion } from "framer-motion";
import { Brain, TrendingUp, Target, Clock } from "lucide-react";

export function FloatingUI() {
  return (
    <div className="relative w-full h-[600px]">
      {/* Main Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl"
        whileHover={{ scale: 1.02 }}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Today's Focus</span>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C4B5FD] to-[#93C5FD] flex items-center justify-center">
              <Brain size={16} />
            </div>
          </div>
          <div className="text-4xl">4h 32m</div>
          <div className="text-sm text-white/50">Deep work completed</div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1.5, delay: 1 }}
              className="h-full bg-gradient-to-r from-[#C4B5FD] to-[#93C5FD]"
            />
          </div>
        </div>
      </motion.div>

      {/* Floating Stat Card 1 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute top-12 left-0 w-48 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 shadow-xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C4B5FD]/20 to-[#93C5FD]/20 flex items-center justify-center">
            <TrendingUp size={20} className="text-[#93C5FD]" />
          </div>
          <div>
            <div className="text-xs text-white/50">Productivity</div>
            <div className="text-lg">+23%</div>
          </div>
        </div>
      </motion.div>

      {/* Floating Stat Card 2 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute top-32 right-0 w-48 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 shadow-xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C4B5FD]/20 to-[#93C5FD]/20 flex items-center justify-center">
            <Target size={20} className="text-[#C4B5FD]" />
          </div>
          <div>
            <div className="text-xs text-white/50">Goals Hit</div>
            <div className="text-lg">12/15</div>
          </div>
        </div>
      </motion.div>

      {/* Floating Stat Card 3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/4 w-52 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 shadow-xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C4B5FD]/20 to-[#93C5FD]/20 flex items-center justify-center">
            <Clock size={20} className="text-[#93C5FD]" />
          </div>
          <div>
            <div className="text-xs text-white/50">Avg. Session</div>
            <div className="text-lg">52 min</div>
          </div>
        </div>
      </motion.div>

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#C4B5FD]/8 to-[#93C5FD]/8 blur-3xl rounded-full -z-10" />
    </div>
  );
}
