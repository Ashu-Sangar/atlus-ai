"use client";

import { Clock, Target, Play } from 'lucide-react';

interface NextSessionCardProps {
  title?: string;
  scheduledTime?: string;
  duration?: string;
  priority?: string;
  onStart?: () => void;
}

export function NextSessionCard({
  title = 'Deep Focus Block',
  scheduledTime = '3:00 PM today',
  duration = '60 minutes',
  priority = 'High Priority',
  onStart
}: NextSessionCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl mb-6 group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
      <div className="relative p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium border border-white/30">
            <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
            Next Session
          </div>
          <button
            onClick={onStart}
            className="px-6 py-3 rounded-xl bg-white text-purple-600 hover:bg-slate-50 transition-all font-bold text-sm flex items-center gap-2 shadow-xl hover:scale-105 transform"
          >
            <Play className="w-4 h-4" />
            Start Now
          </button>
        </div>
        <h4 className="text-3xl font-bold mb-2">{title}</h4>
        <p className="text-lg text-white/90 mb-6">Scheduled for {scheduledTime}</p>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{duration}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
            <Target className="w-4 h-4" />
            <span className="font-medium">{priority}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
