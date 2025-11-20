// File: app/session/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Square,
  Plus,
  Minus,
  Volume2,
  VolumeX,
  FileText,
  X,
  Coffee,
  CheckCircle2,
  Target,
  ChevronLeft
} from "lucide-react";

export default function SessionPage() {
  const router = useRouter();

  // Session state
  const [totalTime, setTotalTime] = useState(25 * 60); // 25 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionTitle, setSessionTitle] = useState("Deep Focus Block");
  const [currentTask, setCurrentTask] = useState("Review project proposal");

  // Features state
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [breakTime, setBreakTime] = useState(5 * 60); // 5 min break
  const [isBreak, setIsBreak] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    // Play completion sound, show celebration, etc.
    if (!isBreak) {
      // Offer break
      setIsBreak(true);
      setTimeLeft(breakTime);
    }
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    router.push("/dashboard");
  };

  const addTime = () => {
    setTimeLeft((prev) => prev + 5 * 60);
    setTotalTime((prev) => prev + 5 * 60);
  };

  const removeTime = () => {
    if (timeLeft > 5 * 60) {
      setTimeLeft((prev) => prev - 5 * 60);
      setTotalTime((prev) => prev - 5 * 60);
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate progress
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const circumference = 2 * Math.PI * 160; // radius = 160
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative min-h-screen bg-[#030014] text-white overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse mix-blend-screen" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse mix-blend-screen" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center gap-6">
          <button
            onClick={handleStop}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {sessionTitle}
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
              <Target className="w-3 h-3" />
              <span>{currentTask}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-3 rounded-full border transition-all backdrop-blur-sm ${soundEnabled
                ? "bg-purple-500/20 border-purple-500/30 text-purple-300"
                : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-slate-400"
              }`}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`p-3 rounded-full border transition-all backdrop-blur-sm ${showNotes
                ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-300"
                : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-slate-400"
              }`}
          >
            <FileText className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Timer Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        {/* Progress Ring */}
        <div className="relative mb-16 group">
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <svg className="transform -rotate-90 relative z-10 drop-shadow-2xl" width="380" height="380">
            {/* Background ring */}
            <circle
              cx="190"
              cy="190"
              r="160"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-slate-800/50"
            />
            {/* Progress ring */}
            <circle
              cx="190"
              cy="190"
              r="160"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear filter drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timer Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <motion.div
              key={timeLeft}
              initial={{ scale: 1.05, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-8xl font-bold tracking-tighter bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-transparent filter drop-shadow-lg"
            >
              {formatTime(timeLeft)}
            </motion.div>

            <div className="flex items-center gap-3 mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <div className={`w-2 h-2 rounded-full ${isRunning ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-slate-500"}`}></div>
              <span className="text-sm font-medium text-slate-300 uppercase tracking-wider">
                {isBreak ? "Rest & Recharge" : isPaused ? "Session Paused" : isRunning ? "Deep Focus" : "Ready to Start"}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mb-12">
          <button
            onClick={removeTime}
            disabled={isRunning}
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm group"
          >
            <Minus className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
          </button>

          {!isRunning ? (
            <button
              onClick={handleStart}
              className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.5)]"
            >
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-3 font-bold text-xl text-white">
                <Play className="w-7 h-7 fill-current" />
                {isPaused ? "Resume Session" : "Start Focus"}
              </div>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="group px-10 py-5 rounded-2xl bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 transition-all shadow-lg backdrop-blur-md"
            >
              <div className="flex items-center gap-3 font-bold text-xl text-white">
                <Pause className="w-7 h-7 fill-current" />
                Pause Session
              </div>
            </button>
          )}

          <button
            onClick={addTime}
            disabled={isRunning}
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm group"
          >
            <Plus className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        <button
          onClick={handleStop}
          className="px-6 py-2.5 rounded-full bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 transition-all flex items-center gap-2 text-red-400/80 hover:text-red-400 font-medium text-sm"
        >
          <Square className="w-4 h-4 fill-current" />
          End Session Early
        </button>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-12 mt-16 w-full max-w-2xl">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <div className="text-2xl font-bold text-purple-300">
              {Math.floor((totalTime - timeLeft) / 60)}m
            </div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Elapsed</div>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <div className="text-2xl font-bold text-cyan-300">
              {Math.round(progress)}%
            </div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Completed</div>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <div className="text-2xl font-bold text-emerald-300">
              {isBreak ? 0 : 1}
            </div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Streak</div>
          </div>
        </div>
      </main>

      {/* Notes Sidebar */}
      <AnimatePresence>
        {showNotes && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotes(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[450px] bg-[#0a0a12] border-l border-white/10 z-50 p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white">Session Notes</h3>
                <button
                  onClick={() => setShowNotes(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-all text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Capture your thoughts, ideas, or distractions here..."
                className="w-full h-[400px] bg-white/5 border border-white/10 rounded-2xl p-6 text-base resize-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none text-white placeholder:text-slate-600 leading-relaxed"
              />

              <div className="mt-8 space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Coffee className="w-5 h-5 text-purple-400" />
                    <span className="font-semibold text-purple-200">Up Next: Break</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    You've earned a 5-minute break. We recommend stretching or hydrating to keep your energy levels high.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Completion Modal */}
      <AnimatePresence>
        {timeLeft === 0 && !isBreak && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-[#0f111a] rounded-3xl border border-white/10 p-10 max-w-md w-full overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-purple-500/20 to-transparent opacity-50"></div>

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold mb-3 text-white">Session Complete!</h2>
                <p className="text-slate-400 mb-10 leading-relaxed">
                  Excellent focus. You've successfully completed your block. Time to recharge.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setIsBreak(true);
                      setTimeLeft(breakTime);
                      setTotalTime(breakTime);
                      handleStart();
                    }}
                    className="px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all font-bold text-white shadow-lg"
                  >
                    Start Break
                  </button>
                  <button
                    onClick={handleStop}
                    className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-semibold text-slate-300 hover:text-white"
                  >
                    Finish
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}