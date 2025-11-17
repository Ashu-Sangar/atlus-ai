"use client";

import { Bell, Search, Play } from 'lucide-react';

interface DashboardHeaderProps {
  userName?: string;
  onStartSession?: () => void;
}

export function DashboardHeader({ userName = 'Alex', onStartSession }: DashboardHeaderProps) {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-xl bg-slate-900/30 border-b border-slate-800/50 px-8 py-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Good morning, {userName}
          </h1>
          <p className="text-sm text-slate-400">Ready to crush your goals today? 🚀</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all flex items-center gap-2 text-sm backdrop-blur-sm">
            <Search className="w-4 h-4" />
            <span>Quick search</span>
            <kbd className="px-2 py-1 text-xs bg-slate-700/50 rounded-md">⌘K</kbd>
          </button>
          <button className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all relative backdrop-blur-sm">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
          </button>
          <button
            onClick={onStartSession}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all flex items-center gap-2 font-semibold shadow-lg shadow-purple-500/25"
          >
            <Play className="w-4 h-4" />
            Start Session
          </button>
        </div>
      </div>
    </div>
  );
}
