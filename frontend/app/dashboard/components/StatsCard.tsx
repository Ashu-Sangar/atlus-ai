"use client";

import { useState } from 'react';
import { Clock, CheckCircle2, Award, Flame, LucideIcon } from 'lucide-react';

interface Stat {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  gradient: string;
  bgGradient: string;
}

const stats: Stat[] = [
  {
    icon: Clock,
    label: 'Focus Hours',
    value: '24.5h',
    change: '+12%',
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-500/10 to-purple-600/10'
  },
  {
    icon: CheckCircle2,
    label: 'Completed Sessions',
    value: '18',
    change: '+3',
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-500/10 to-blue-600/10'
  },
  {
    icon: Award,
    label: 'Productivity Score',
    value: '94',
    change: '+8',
    gradient: 'from-cyan-500 to-teal-500',
    bgGradient: 'from-cyan-500/10 to-teal-500/10'
  },
  {
    icon: Flame,
    label: 'Current Streak',
    value: '7 days',
    change: '🔥',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-500/10 to-red-500/10'
  }
];

export function StatsCards() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="relative group"
          onMouseEnter={() => setHoveredStat(i)}
          onMouseLeave={() => setHoveredStat(null)}
        >
          {hoveredStat === i && (
            <div
              className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
            ></div>
          )}
          <div className="relative p-6 rounded-2xl bg-[#0a0a12]/60 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all h-full">
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/5`}
              >
                <stat.icon className={`w-6 h-6 text-white`} />
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-emerald-400 flex items-center gap-1">
                {stat.change}
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
              <div className="text-sm font-medium text-slate-400">{stat.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
