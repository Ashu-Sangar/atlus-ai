"use client";

import { Bell, Search, Play } from 'lucide-react';

interface DashboardHeaderProps {
  userName?: string;
  onStartSession?: () => void;
}

export function DashboardHeader({ userName = 'Alex', onStartSession }: DashboardHeaderProps) {
  return (
    <div className="sticky top-0 z-40 backdrop-blur-xl bg-[#030014]/50 border-b border-white/5 px-8 py-5">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-white">
            Good morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{userName}</span>
          </h1>
          <p className="text-sm text-slate-400">Ready to crush your goals today? 🚀</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="group px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all flex items-center gap-3 text-sm text-slate-400 hover:text-white">
            <Search className="w-4 h-4" />
            <span>Quick search...</span>
            <kbd className="px-2 py-0.5 text-[10px] font-bold bg-black/20 rounded border border-white/10 text-slate-500 group-hover:text-slate-300 transition-colors">⌘K</kbd>
          </button>

          <button className="relative p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all text-slate-400 hover:text-white">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span>
          </button>

          <div className="h-8 w-px bg-white/10 mx-1"></div>

          <button
            onClick={onStartSession}
            className="group relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all flex items-center gap-2 font-semibold shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          >
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Play className="w-4 h-4 fill-white" />
            <span className="text-white">Start Session</span>
          </button>
        </div>
      </div>
    </div>
  );
}
