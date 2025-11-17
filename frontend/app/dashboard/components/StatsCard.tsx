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
    <div className="grid grid-cols-4 gap-5 mb-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="relative group"
          onMouseEnter={() => setHoveredStat(i)}
          onMouseLeave={() => setHoveredStat(null)}
        >
          {hoveredStat === i && (
            <div
              className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity`}
            ></div>
          )}
          <div className="relative p-6 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="text-sm text-slate-400 mb-2">{stat.label}</div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-emerald-400 font-semibold">{stat.change}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
