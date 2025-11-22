"use client";

import { useState } from 'react';

interface ChartData {
  height: number;
  label: string;
}

const weekData: ChartData[] = [
  { height: 120, label: 'Mon' },
  { height: 180, label: 'Tue' },
  { height: 150, label: 'Wed' },
  { height: 220, label: 'Thu' },
  { height: 200, label: 'Fri' },
  { height: 90, label: 'Sat' },
  { height: 60, label: 'Sun' }
];

export function ProductivityChart() {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<'week' | 'month' | 'quarter'>('week');

  return (
    <div className="p-6 rounded-3xl bg-slate-800/40 dark:bg-slate-800/40 light:bg-white/40 backdrop-blur-sm border border-slate-700/50 dark:border-slate-700/50 light:border-black/5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold mb-1 text-white dark:text-white light:text-black">Weekly Productivity</h3>
          <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">Focus minutes per day</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveView('week')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeView === 'week'
                ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-300 border border-primary-500/30'
                : 'bg-slate-700/50 dark:bg-slate-700/50 light:bg-black/5 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-black/10 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-black'
              }`}
          >
            Week
          </button>
          <button
            onClick={() => setActiveView('month')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeView === 'month'
                ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-300 border border-primary-500/30'
                : 'bg-slate-700/50 dark:bg-slate-700/50 light:bg-black/5 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-black/10 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-black'
              }`}
          >
            Month
          </button>
          <button
            onClick={() => setActiveView('quarter')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeView === 'quarter'
                ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-300 border border-primary-500/30'
                : 'bg-slate-700/50 dark:bg-slate-700/50 light:bg-black/5 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-black/10 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-black'
              }`}
          >
            Quarter
          </button>
        </div>
      </div>

      <div className="h-48 flex items-end gap-4">
        {weekData.map((day, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-3 group"
            onMouseEnter={() => setHoveredDay(i)}
            onMouseLeave={() => setHoveredDay(null)}
          >
            <div
              className="relative w-full rounded-xl bg-gradient-to-t from-primary-500/40 to-secondary-500/40 hover:from-primary-500 hover:to-secondary-500 transition-all cursor-pointer shadow-lg"
              style={{ height: `${(day.height / 220) * 100}%` }}
            >
              {hoveredDay === i && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg bg-slate-800 dark:bg-slate-800 light:bg-white border border-slate-700 dark:border-slate-700 light:border-black/10 text-sm font-semibold whitespace-nowrap shadow-xl text-white dark:text-white light:text-black">
                  {Math.floor(day.height / 60)}h {day.height % 60}m
                </div>
              )}
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 font-medium">{day.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}