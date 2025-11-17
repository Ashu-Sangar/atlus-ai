"use client";

import { Zap } from 'lucide-react';

interface Insight {
  icon: string;
  title: string;
  desc: string;
  gradient: string;
}

const insights: Insight[] = [
  {
    icon: '⏰',
    title: 'Peak Performance Time',
    desc: "You're most productive at 10 AM. Schedule important work then.",
    gradient: 'from-pink-500 to-purple-500'
  },
  {
    icon: '🎯',
    title: 'Try 45-Minute Sessions',
    desc: 'Based on your last 5 sessions, longer blocks work better for you.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: '📅',
    title: 'Plan Tomorrow Today',
    desc: 'Evening planning increases next-day productivity by 23%.',
    gradient: 'from-cyan-500 to-teal-500'
  }
];

export function AIInsights() {
  return (
    <div className="p-6 rounded-3xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold">AI Insights</h3>
          <p className="text-xs text-slate-400">Personalized suggestions</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="group p-4 rounded-2xl bg-slate-700/30 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 transition-all cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${insight.gradient} flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform`}
              >
                {insight.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold mb-1.5">{insight.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{insight.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}