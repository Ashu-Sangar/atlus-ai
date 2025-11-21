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
    <div className="relative overflow-hidden rounded-3xl group">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 mix-blend-overlay"></div>

      {/* Glow effect */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary-400/30 rounded-full blur-3xl group-hover:bg-secondary-300/40 transition-all duration-700"></div>

      <div className="relative p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold border border-white/30 shadow-sm">
            <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse shadow-[0_0_8px_rgba(110,231,183,0.8)]"></div>
            UP NEXT
          </div>
          <button
            onClick={onStart}
            className="px-6 py-3 rounded-xl bg-white text-primary-600 hover:bg-primary-50 transition-all font-bold text-sm flex items-center gap-2 shadow-xl hover:scale-105 hover:shadow-2xl transform duration-300"
          >
            <Play className="w-4 h-4 fill-current" />
            Start Now
          </button>
        </div>

        <div className="mb-8">
          <h4 className="text-3xl font-bold mb-2 text-white tracking-tight">{title}</h4>
          <p className="text-lg text-white/80 font-medium">Scheduled for {scheduledTime}</p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 bg-black/10 px-4 py-2.5 rounded-xl backdrop-blur-sm border border-white/10">
            <Clock className="w-4 h-4 text-white/80" />
            <span className="font-medium text-white">{duration}</span>
          </div>
          <div className="flex items-center gap-2 bg-black/10 px-4 py-2.5 rounded-xl backdrop-blur-sm border border-white/10">
            <Target className="w-4 h-4 text-white/80" />
            <span className="font-medium text-white">{priority}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
