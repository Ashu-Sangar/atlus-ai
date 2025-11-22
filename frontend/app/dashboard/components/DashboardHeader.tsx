"use client";

import { Bell, Search, Play } from 'lucide-react';

interface DashboardHeaderProps {
  userName?: string;
  onStartSession?: () => void;
}

export function DashboardHeader({ userName = 'Alex', onStartSession }: DashboardHeaderProps) {
  return (
    <div className="sticky top-0 z-40 backdrop-blur-xl bg-[#09090b]/50 dark:bg-[#09090b]/50 light:bg-white/50 border-b border-white/5 dark:border-white/5 light:border-black/5 px-8 py-5">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-white dark:text-white light:text-black">
            Good morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">{userName}</span>
          </h1>
          <p className="text-sm text-slate-400">Ready to crush your goals today? 🚀</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="group px-4 py-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/5 dark:border-white/5 light:border-black/5 hover:border-white/10 dark:hover:border-white/10 light:hover:border-black/10 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 transition-all flex items-center gap-3 text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-black">
            <Search className="w-4 h-4" />
            <span>Quick search...</span>
            <kbd className="px-2 py-0.5 text-[10px] font-bold bg-black/20 dark:bg-black/20 light:bg-black/5 rounded border border-white/10 dark:border-white/10 light:border-black/10 text-slate-500 group-hover:text-slate-300 dark:group-hover:text-slate-300 light:group-hover:text-slate-700 transition-colors">⌘K</kbd>
          </button>

          <button className="relative p-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/5 dark:border-white/5 light:border-black/5 hover:border-white/10 dark:hover:border-white/10 light:hover:border-black/10 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 transition-all text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-black">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span>
          </button>

          <div className="h-8 w-px bg-white/10 mx-1"></div>

          <button
            onClick={onStartSession}
            className="group relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 transition-all flex items-center gap-2 font-semibold shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
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
